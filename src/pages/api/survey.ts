import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { survey } from '../../survey';

export const prerender = false;

// Build allowed-values sets from the FR version (EN mirrors the same slugs)
const content = survey.fr;

type FieldSpec =
  | { type: 'radio'; column: string; required: boolean; values: Set<string> }
  | { type: 'checkbox'; column: string; required: boolean; values: Set<string> }
  | { type: 'scale'; column: string; required: boolean; min: number; max: number }
  | { type: 'textarea'; column: string; required: boolean; maxLength: number };

const fields: Record<string, FieldSpec> = {};

for (const section of content.sections) {
  for (const q of section.questions) {
    if (q.type === 'radio') {
      fields[q.key] = { type: 'radio', column: q.key, required: q.required, values: new Set(q.options.map(o => o.value)) };
    } else if (q.type === 'checkbox') {
      fields[q.key] = { type: 'checkbox', column: q.key, required: q.required, values: new Set(q.options.map(o => o.value)) };
    } else if (q.type === 'scale') {
      fields[q.key] = { type: 'scale', column: q.key, required: q.required, min: q.min, max: q.max };
    } else if (q.type === 'textarea') {
      fields[q.key] = { type: 'textarea', column: q.key, required: q.required, maxLength: 2000 };
    } else if (q.type === 'matrix') {
      const rowValues = new Set(q.columns.map(c => c.value));
      for (const row of q.rows) {
        fields[row.key] = { type: 'radio', column: row.key, required: q.required, values: rowValues };
      }
    }
  }
}

const ALL_COLUMNS = Object.keys(fields);

export const POST: APIRoute = async ({ request }) => {
  if (!env?.DB) return json({ ok: false, error: 'misconfigured' }, 500);

  let body: any;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'invalid_body' }, 400); }

  const lang = body.lang === 'en' ? 'en' : 'fr';

  const values: Record<string, string | number | null> = {};

  for (const col of ALL_COLUMNS) {
    const spec = fields[col];
    const raw = body[col];

    if (spec.type === 'radio') {
      if (raw == null || raw === '') {
        if (spec.required) return json({ ok: false, error: 'missing:' + col }, 400);
        values[col] = null;
        continue;
      }
      if (typeof raw !== 'string' || !spec.values.has(raw)) {
        return json({ ok: false, error: 'invalid:' + col }, 400);
      }
      values[col] = raw;
    }
    else if (spec.type === 'checkbox') {
      if (!Array.isArray(raw)) {
        if (spec.required) return json({ ok: false, error: 'missing:' + col }, 400);
        values[col] = '[]';
        continue;
      }
      if (spec.required && raw.length === 0) return json({ ok: false, error: 'missing:' + col }, 400);
      for (const v of raw) {
        if (typeof v !== 'string' || !spec.values.has(v)) {
          return json({ ok: false, error: 'invalid:' + col }, 400);
        }
      }
      values[col] = JSON.stringify(raw);
    }
    else if (spec.type === 'scale') {
      const n = Number(raw);
      if (!Number.isFinite(n)) {
        if (spec.required) return json({ ok: false, error: 'missing:' + col }, 400);
        values[col] = null;
        continue;
      }
      if (n < spec.min || n > spec.max || !Number.isInteger(n)) {
        return json({ ok: false, error: 'invalid:' + col }, 400);
      }
      values[col] = n;
    }
    else if (spec.type === 'textarea') {
      const s = typeof raw === 'string' ? raw.trim() : '';
      if (!s) {
        if (spec.required) return json({ ok: false, error: 'missing:' + col }, 400);
        values[col] = null;
        continue;
      }
      if (s.length > spec.maxLength) return json({ ok: false, error: 'too_long:' + col }, 400);
      values[col] = s;
    }
  }

  // Optional: capture country from Cloudflare request headers
  const ipCountry = request.headers.get('cf-ipcountry') ?? null;

  const columns = ['lang', 'ip_country', ...ALL_COLUMNS];
  const placeholders = columns.map(() => '?').join(', ');
  const args: (string | number | null)[] = [lang, ipCountry, ...ALL_COLUMNS.map(c => values[c] ?? null)];

  try {
    await env.DB
      .prepare(`INSERT INTO survey_responses (${columns.join(', ')}) VALUES (${placeholders})`)
      .bind(...args)
      .run();
  } catch (e) {
    console.error('[survey] insert failed', e);
    return json({ ok: false, error: 'db_error' }, 500);
  }

  // Optional: trigger newsletter DOI flow (best-effort, never blocks the survey success)
  if (body.newsletter_optin === true && body.newsletter_consent === true) {
    const email = typeof body.newsletter_email === 'string' ? body.newsletter_email.trim().toLowerCase() : '';
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      try { await startNewsletterDoi(email, lang, 'survey'); }
      catch (e) { console.error('[survey] newsletter trigger failed', e); }
    }
  }

  // Optional: contest entry (best-effort, kept in a separate table — no link to survey response)
  if (body.contest_optin === true && body.contest_rules === true) {
    const name = typeof body.contest_name === 'string' ? body.contest_name.trim() : '';
    const cEmail = typeof body.contest_email === 'string' ? body.contest_email.trim().toLowerCase() : '';
    if (name && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail)) {
      try {
        await env.DB
          .prepare('INSERT INTO contest_entries (lang, name, email, accepted_rules, ip_country) VALUES (?, ?, ?, 1, ?)')
          .bind(lang, name, cEmail, ipCountry)
          .run();
      } catch (e) {
        console.error('[survey] contest insert failed', e);
      }
    }
  }

  return json({ ok: true }, 200);
};

async function startNewsletterDoi(email: string, lang: 'fr' | 'en', source: 'home' | 'survey') {
  const token = crypto.randomUUID();
  const confirmUrl = `${env.SITE_URL}/api/confirm?token=${token}`;

  await env.PENDING_SIGNUPS.put(
    token,
    JSON.stringify({ email, lang, source, createdAt: Date.now() }),
    { expirationTtl: 60 * 60 * 24 }
  );

  const templateId = lang === 'fr'
    ? Number(env.BREVO_TEMPLATE_ID_FR)
    : Number(env.BREVO_TEMPLATE_ID_EN);

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      to: [{ email }],
      templateId,
      params: { CONFIRM_URL: confirmUrl },
    }),
  });

  if (!res.ok) {
    await env.PENDING_SIGNUPS.delete(token);
    const detail = await res.text().catch(() => '');
    throw new Error(`[brevo] send failed ${res.status} ${detail}`);
  }
}

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

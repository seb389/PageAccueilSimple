import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOKEN_TTL_SECONDS = 60 * 60 * 24; // 24h

export const POST: APIRoute = async ({ request }) => {
  if (!env?.BREVO_API_KEY) {
    return json({ ok: false, error: 'misconfigured' }, 500);
  }

  let body: { email?: string; consent?: boolean; lang?: string };
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_body' }, 400);
  }

  const email   = (body.email ?? '').trim().toLowerCase();
  const consent = body.consent === true;
  const lang    = body.lang === 'en' ? 'en' : 'fr';

  if (!consent)              return json({ ok: false, error: 'consent_required' }, 400);
  if (!EMAIL_RE.test(email)) return json({ ok: false, error: 'invalid_email' }, 400);

  const token = crypto.randomUUID();
  const confirmUrl = `${env.SITE_URL}/api/confirm?token=${token}`;

  await env.PENDING_SIGNUPS.put(
    token,
    JSON.stringify({ email, lang, createdAt: Date.now() }),
    { expirationTtl: TOKEN_TTL_SECONDS }
  );

  const templateId = lang === 'fr'
    ? Number(env.BREVO_TEMPLATE_ID_FR)
    : Number(env.BREVO_TEMPLATE_ID_EN);

  const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
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

  if (!brevoRes.ok) {
    let detail: unknown;
    try { detail = await brevoRes.json(); } catch { detail = null; }
    console.error('[brevo] send failed', brevoRes.status, detail);
    await env.PENDING_SIGNUPS.delete(token);
    return json({ ok: false, error: 'service_error' }, 502);
  }

  return json({ ok: true }, 200);
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

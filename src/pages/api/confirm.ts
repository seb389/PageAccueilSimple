import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const GET: APIRoute = async ({ url, redirect }) => {
  const token = url.searchParams.get('token');
  if (!token) return redirect('/?err=missing_token', 302);

  const raw = await env.PENDING_SIGNUPS.get(token);
  if (!raw) return redirect('/?err=invalid_token', 302);

  let data: { email: string; lang: 'fr' | 'en'; createdAt: number };
  try {
    data = JSON.parse(raw);
  } catch {
    await env.PENDING_SIGNUPS.delete(token);
    return redirect('/?err=invalid_data', 302);
  }

  const { email, lang } = data;
  const listId = Number(lang === 'fr' ? env.BREVO_LIST_ID_FR : env.BREVO_LIST_ID_EN);

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      attributes: { OPT_IN_LANG: lang.toUpperCase() },
      updateEnabled: true,
    }),
  });

  // 201 Created (new) or 204 No Content (updated existing) are success.
  // duplicate_parameter means the contact already exists — add them to the list.
  if (!res.ok) {
    let detail: any = null;
    try { detail = await res.json(); } catch {}
    const isDuplicate = detail?.code === 'duplicate_parameter';
    if (!isDuplicate) {
      console.error('[brevo] add contact failed', res.status, detail);
      return redirect('/?err=service_error', 302);
    }
    await fetch(
      `https://api.brevo.com/v3/contacts/lists/${listId}/contacts/add`,
      {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': env.BREVO_API_KEY,
        },
        body: JSON.stringify({ emails: [email] }),
      }
    );
  }

  await env.PENDING_SIGNUPS.delete(token);

  const thanksPath = lang === 'fr' ? '/merci' : '/en/thanks';
  return redirect(thanksPath, 302);
};

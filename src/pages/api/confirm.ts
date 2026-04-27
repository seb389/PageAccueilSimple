import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { sendMetaCapiEvent } from '../../lib/meta-capi';

export const prerender = false;

export const GET: APIRoute = async ({ url, redirect, request }) => {
  const token = url.searchParams.get('token');
  if (!token) return redirect('/?err=missing_token', 302);

  const raw = await env.PENDING_SIGNUPS.get(token);
  if (!raw) return redirect('/?err=invalid_token', 302);

  let data: { email: string; lang: 'fr' | 'en'; source?: string; trackingConsent?: string; eventId?: string; createdAt: number };
  try {
    data = JSON.parse(raw);
  } catch {
    await env.PENDING_SIGNUPS.delete(token);
    return redirect('/?err=invalid_data', 302);
  }

  const { email, lang } = data;
  const source = data.source === 'survey' ? 'survey' : 'home';
  const trackingConsent = data.trackingConsent === 'accepted' ? 'accepted' : 'declined';
  const eventId = typeof data.eventId === 'string' && data.eventId ? data.eventId : undefined;
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
      attributes: {
        OPT_IN_LANG: lang.toUpperCase(),
        SOURCE: source.toUpperCase(),
      },
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

  // Meta CAPI : fire CompleteRegistration if user accepted tracking consent.
  if (trackingConsent === 'accepted') {
    const sourceUrl = env.SITE_URL ? env.SITE_URL + (lang === 'fr' ? '/merci' : '/en/thanks') : undefined;
    await sendMetaCapiEvent({
      eventName: 'CompleteRegistration',
      eventId,
      email,
      ip: request.headers.get('cf-connecting-ip') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      eventSourceUrl: sourceUrl,
      customData: { content_category: 'newsletter', source },
    });
  }

  const thanksPath = lang === 'fr' ? '/merci' : '/en/thanks';
  return redirect(thanksPath, 302);
};

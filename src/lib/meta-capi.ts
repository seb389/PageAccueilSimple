// Server-side Meta Conversions API (CAPI) helper.
// Sends events directly from our Worker to Meta — bypasses browser ad blockers / ITP.
// PII (email, name) is SHA-256 hashed before transmission as required by Meta.
// Best-effort: errors are logged, never thrown — must not break the survey/newsletter flow.

import { env } from 'cloudflare:workers';

const GRAPH_API_VERSION = 'v19.0';

export type CapiEventInput = {
  eventName: 'Lead' | 'CompleteRegistration' | 'PageView' | 'ViewContent' | string;
  eventId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  ip?: string | null;
  userAgent?: string | null;
  fbp?: string | null;       // browser-side _fbp cookie if relayed
  fbc?: string | null;       // browser-side _fbc cookie if relayed
  eventSourceUrl?: string;
  customData?: Record<string, unknown>;
};

async function sha256Hex(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function sendMetaCapiEvent(input: CapiEventInput): Promise<void> {
  const pixelId = env?.META_PIXEL_ID;
  const token = env?.META_CAPI_TOKEN;
  if (!pixelId || !token) return; // not configured — silently skip

  const userData: Record<string, unknown> = {};
  if (input.email)     userData.em = [await sha256Hex(input.email.trim().toLowerCase())];
  if (input.firstName) userData.fn = [await sha256Hex(input.firstName.trim().toLowerCase())];
  if (input.lastName)  userData.ln = [await sha256Hex(input.lastName.trim().toLowerCase())];
  if (input.ip)        userData.client_ip_address = input.ip;
  if (input.userAgent) userData.client_user_agent = input.userAgent;
  if (input.fbp)       userData.fbp = input.fbp;
  if (input.fbc)       userData.fbc = input.fbc;

  const event = {
    event_name: input.eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: input.eventId || crypto.randomUUID(),
    action_source: 'website',
    event_source_url: input.eventSourceUrl,
    user_data: userData,
    custom_data: input.customData ?? {},
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ data: [event], access_token: token }),
      }
    );
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[meta-capi]', input.eventName, 'failed', res.status, detail.slice(0, 300));
    }
  } catch (e) {
    console.error('[meta-capi] network error', e);
  }
}

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

// POST /api/admin/clear-contest
// Body must be `{ "confirm": "DELETE" }` to prevent accidental wipes.
// Removes all rows from contest_entries.
export const POST: APIRoute = async ({ request, redirect }) => {
  if (!env?.DB) return new Response('Misconfigured', { status: 500 });

  const ct = request.headers.get('content-type') ?? '';
  let confirmValue = '';
  if (ct.includes('application/json')) {
    try {
      const body = await request.json();
      confirmValue = String((body as any)?.confirm ?? '');
    } catch {}
  } else {
    const form = await request.formData();
    confirmValue = String(form.get('confirm') ?? '');
  }

  if (confirmValue !== 'DELETE') {
    return new Response('Confirmation required (confirm=DELETE)', { status: 400 });
  }

  try {
    const result = await env.DB.prepare('DELETE FROM contest_entries').run();
    const deleted = result.meta?.changes ?? 0;
    console.log('[clear-contest] deleted', deleted, 'rows');

    if (ct.includes('application/json')) {
      return new Response(JSON.stringify({ ok: true, deleted }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }
    return redirect('/admin/contest?cleared=' + deleted, 302);
  } catch (err) {
    console.error('[clear-contest] failed', err);
    return new Response('Delete failed', { status: 500 });
  }
};

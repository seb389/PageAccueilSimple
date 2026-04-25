import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const GET: APIRoute = async () => {
  if (!env?.DB) return new Response('Misconfigured', { status: 500 });

  let rows: Record<string, unknown>[] = [];
  try {
    const result = await env.DB
      .prepare('SELECT * FROM contest_entries ORDER BY created_at DESC')
      .all();
    rows = (result.results ?? []) as Record<string, unknown>[];
  } catch (err) {
    console.error('[contest-csv] query failed', err);
    return new Response('Query failed (table missing?)', { status: 500 });
  }

  const date = new Date().toISOString().slice(0, 10);
  const filename = `lacet-contest-${date}.csv`;

  if (rows.length === 0) {
    const csv = '﻿id,created_at,lang,name,email,accepted_rules,ip_country\n';
    return csvResponse(csv, filename);
  }

  const columns = Object.keys(rows[0]);
  const header = columns.map(csvEscape).join(',');
  const body = rows
    .map(row => columns.map(col => csvEscape(row[col])).join(','))
    .join('\n');
  const csv = '﻿' + header + '\n' + body + '\n';

  return csvResponse(csv, filename);
};

function csvResponse(csv: string, filename: string) {
  return new Response(csv, {
    status: 200,
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="${filename}"`,
      'cache-control': 'no-store',
    },
  });
}

function csvEscape(value: unknown): string {
  if (value == null) return '';
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

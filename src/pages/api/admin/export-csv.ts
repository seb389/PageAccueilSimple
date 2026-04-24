import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const GET: APIRoute = async () => {
  if (!env?.DB) return new Response('Misconfigured', { status: 500 });

  const result = await env.DB
    .prepare('SELECT * FROM survey_responses ORDER BY created_at DESC')
    .all();

  const rows = (result.results ?? []) as Record<string, unknown>[];

  if (rows.length === 0) {
    return csvResponse('id,created_at\n(no data)\n');
  }

  const columns = Object.keys(rows[0]);
  const header = columns.map(csvEscape).join(',');
  const body = rows
    .map(row => columns.map(col => csvEscape(row[col])).join(','))
    .join('\n');
  const csv = '﻿' + header + '\n' + body + '\n'; // BOM pour Excel

  return csvResponse(csv);
};

function csvResponse(csv: string) {
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    status: 200,
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="lacet-survey-${date}.csv"`,
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

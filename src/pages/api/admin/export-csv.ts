import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { survey } from '../../../survey';

export const prerender = false;

// Multi-choice fields to optionally expand into boolean columns
const MULTI_FIELDS = ['contexts', 'bike_type'];

function getMultiOptions(field: string): string[] {
  for (const section of survey.fr.sections) {
    for (const q of section.questions) {
      if (q.key === field && q.type === 'checkbox') {
        return q.options.map(o => o.value);
      }
    }
  }
  return [];
}

export const GET: APIRoute = async ({ url }) => {
  if (!env?.DB) return new Response('Misconfigured', { status: 500 });

  const expanded = url.searchParams.get('format') === 'expanded';

  const result = await env.DB
    .prepare('SELECT * FROM survey_responses ORDER BY created_at DESC')
    .all();
  const rows = (result.results ?? []) as Record<string, unknown>[];

  if (rows.length === 0) {
    return csvResponse('id,created_at\n(no data)\n', expanded);
  }

  const baseColumns = Object.keys(rows[0]);

  let columns: string[];
  let buildRow: (row: Record<string, unknown>) => string[];

  if (expanded) {
    // Build expanded columns: keep all original columns except multi fields,
    // then for each multi field, insert N boolean columns in its place.
    const multiOptionsByField: Record<string, string[]> = {};
    for (const f of MULTI_FIELDS) multiOptionsByField[f] = getMultiOptions(f);

    columns = [];
    for (const c of baseColumns) {
      if (MULTI_FIELDS.includes(c)) {
        for (const opt of multiOptionsByField[c]) columns.push(`${c}_${opt}`);
      } else {
        columns.push(c);
      }
    }

    buildRow = (row) => {
      const out: string[] = [];
      for (const c of baseColumns) {
        if (MULTI_FIELDS.includes(c)) {
          let arr: string[] = [];
          try { arr = JSON.parse(String(row[c] ?? '[]')); } catch {}
          for (const opt of multiOptionsByField[c]) out.push(arr.includes(opt) ? '1' : '0');
        } else {
          out.push(csvEscape(row[c]));
        }
      }
      return out;
    };
  } else {
    columns = baseColumns;
    buildRow = (row) => baseColumns.map(c => csvEscape(row[c]));
  }

  const header = columns.map(csvEscape).join(',');
  const body = rows.map(row => buildRow(row).join(',')).join('\n');
  const csv = '﻿' + header + '\n' + body + '\n'; // BOM pour Excel

  return csvResponse(csv, expanded);
};

function csvResponse(csv: string, expanded: boolean) {
  const date = new Date().toISOString().slice(0, 10);
  const suffix = expanded ? '-expanded' : '';
  return new Response(csv, {
    status: 200,
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="lacet-survey-${date}${suffix}.csv"`,
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

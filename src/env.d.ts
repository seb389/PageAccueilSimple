/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare global {
  interface Env {
    BREVO_API_KEY: string;
    BREVO_LIST_ID_FR: string;
    BREVO_LIST_ID_EN: string;
    BREVO_TEMPLATE_ID_FR: string;
    BREVO_TEMPLATE_ID_EN: string;
    SITE_URL: string;
    PENDING_SIGNUPS: KVNamespace;
    DB: D1Database;
    TURNSTILE_SITE_KEY: string;
    TURNSTILE_SECRET_KEY: string;
    META_PIXEL_ID: string;
    META_CAPI_TOKEN: string;
  }
}

declare module 'cloudflare:workers' {
  export const env: Env;
}

export {};

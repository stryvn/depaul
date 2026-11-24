# De Paul deployment

The Cloudflare Worker uses the existing `depaul-db` D1 database and `depaul-media` R2 bucket. The bucket already serves public uploads through `https://media.depaulidukki.com`. Keep private records in D1 or separate private storage, outside this public bucket.

The initial D1 schema is in `cloudflare-migrations/0000_initial_d1.sql`. It can be applied to an empty database for testing and preserves the compatible existing stories table when applied to the school database. The older `alumni_records` table uses a different schema. Never copy or discard rows from it without a reviewed field and status mapping.

## Build and stage

1. Install locked dependencies with `npm ci`.
2. For a local D1 test, run `npx wrangler d1 migrations apply depaul-db --local`.
3. Set the build-time `NEXT_PUBLIC_TURNSTILE_SITE_KEY` for the staging and production hostnames, then run `npm run build:cloudflare`.
4. Authenticate Wrangler to the school's account. For staging, use a separate Worker name and test database/bucket where possible. Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`, and `TURNSTILE_SECRET_KEY` as Worker secrets. Use a unique admin password and a random signing secret. Leave admin unconfigured for a public read-only staging preview.
5. Run `npm run deploy:cloudflare` with the intended deployment configuration. Test public routes, authenticated admin, document transfers, alumni verification, and R2 uploads before attaching the production hostname.
6. Confirm the existing DNS targets and preserve mail and verification records during cutover. Recheck production TLS, canonical URLs, `robots.txt`, and `sitemap.xml`.
7. In Google Search Console, use an owner account for `depaulidukki.com`. Verify with Google's exact DNS TXT value if required, then submit `https://depaulidukki.com/sitemap.xml` after production deployment.

The regular `npm run build` remains a static Sites export for visual review. Its alumni registration is disabled and its pages are marked noindex.

# Page metadata and search discovery

## Approved page copy

| Page | Title | Description |
| --- | --- | --- |
| `/` | Alvin Karanja \| Portfolio | Explore Alvin Karanja’s projects, professional experience and work across software, AI and product development. |
| `/links` | Find Alvin Karanja Online | Follow Alvin’s thoughts on technology and entrepreneurship, explore his projects and connect across platforms. |
| `/chat` | Get to Know Alvin \| AI Assistant | Curious about Alvin’s work? Ask his AI assistant about the projects he has built, his background and how he approaches things. |
| `/privacy` | Privacy Policy \| Alvin Karanja | How Alvin Karanja’s portfolio handles chat data, cookies, analytics and privacy requests. |
| Not found | Page Not Found \| Alvin Karanja | This page could not be found. Return to Alvin Karanja’s portfolio to explore his work. |

These strings are used for document titles/descriptions and corresponding
Open Graph and X card text. Platforms and search engines can choose their
own presentation; the tags supply the preferred copy.

## Implementation

`server/metadata/config.ts` defines the canonical production origin,
`https://alvinkaranja.dev`, and the deployment indexing policy.
`server/metadata/pages.ts` packages page copy, canonical links, robots
metadata and social text through `createPageMetadata`.

The root layout is a Server Component so it can export Next.js metadata.
`AppProvider` and `ChatProvider` remain client providers nested inside it.
The root supplies default copy, the metadata base URL and existing favicon
and Apple icon declarations through the Metadata API.

Route metadata lives in:

- `app/(site)/page.tsx` for home;
- `app/links/layout.tsx` for links;
- `app/chat/layout.tsx` for chat, whose page remains a Client Component;
- `app/(site)/privacy/page.tsx` for privacy;
- `app/not-found.tsx` for unmatched routes.

Each public page has its own canonical path. Tracking parameters such as
`utm_source` are omitted. The 404 has no canonical URL and is always
marked `noindex`.

## Sitemap

`app/sitemap.ts` generates `/sitemap.xml` containing only:

```text
https://alvinkaranja.dev/
https://alvinkaranja.dev/links
https://alvinkaranja.dev/chat
https://alvinkaranja.dev/privacy
```

Profile redirects, query-string variants, error pages, staging URLs and
preview URLs are not listed. No artificial update timestamps or priority
scores are generated. Non-indexable builds return an empty sitemap.

## Robots and deployment policy

`app/robots.ts` generates this production `/robots.txt`:

```text
User-Agent: *
Allow: /

Sitemap: https://alvinkaranja.dev/sitemap.xml
```

Public pages are indexable only in production builds. When Vercel's
system variables are supplied, indexing additionally requires:

- `VERCEL_TARGET_ENV=production`, if present;
- `VERCEL_ENV=production`, if present;
- `VERCEL_GIT_COMMIT_REF=main`, if present.

This covers staging projects built from `developing` as well as ordinary
preview and custom staging environments. Local production builds without
those Vercel variables use the production policy. Development builds do
not allow indexing.

On non-indexable builds, pages emit `noindex, nofollow`, the sitemap is
empty and robots omits its sitemap declaration. Crawling remains allowed
so crawlers can read the noindex tags. Robots instructions are not access
control or a substitute for deployment protection.

These routes and pages are generated at build time. Supply deployment
variables before the build and rebuild if the target changes. Ensure
Vercel exposes its system environment variables; if they are absent, a
production-mode build cannot infer that it is a staging deployment.

## Preview image hand-off

The branded preview image is pending design. No placeholder image URL or
non-existent asset has been added to metadata. The X card type is already
`summary_large_image`; its image will be supplied with the asset.

Prepare a 1200 × 630 px PNG or JPG in Figma. Keep essential content away
from the edges to accommodate cropping and aim for an export below
500 KB. One shared branded image is sufficient initially.

When the image is available, add it as a public asset and configure both
Open Graph and X image metadata in the shared helper, including an
accessible description. Verify the image and tags on deployed URLs;
platform preview caches may retain earlier results.

## Verification

Production HTML was checked for the exact approved copy, canonical URLs
and 404 noindex tags. The generated sitemap and robots response were
checked against the approved entries. The indexing policy is also checked
across production, development, preview and staging configurations.

Check deployed metadata and social previews after release. This local
verification does not establish that a search engine has crawled or
indexed the site.

# Acquisition source and profile redirects

## Source attribution

`source_platform` identifies acquisition, not the clicked link.
The browser resolves it using:

1. A supplied `utm_source`, normalised to a known platform.
2. On initial document load, a recognised external referrer.
3. A source retained in this tab's session storage.
4. `direct_or_unknown` when no source can be established.

Known platforms are `instagram`, `tiktok`, `x`, `linkedin`,
`youtube` and `google`. Aliases `ig`, `tt` and `twitter` resolve
to their corresponding platforms. Unsupported UTM values and
unrecognised external referrers become `other`. Internal
referrers do not replace acquisition context.

The source survives client navigation and same-tab reloads.
A new explicit UTM source replaces it. Storage restrictions fall
back to memory for the current document. This is tab-level
attribution, not PostHog's formal session attribution; reopening
a previously closed tab or copying a tagged URL can affect it.
Do not infer verified origin or cross-platform identity from it.
Raw referrer URLs and arbitrary UTM strings are not copied into
these custom properties. PostHog's standard attribution fields
remain separate.

## Source-aware profile URLs

Use these public URLs in the corresponding social profiles:

| Platform | Profile URL | `utm_source` |
| --- | --- | --- |
| TikTok | `https://alvinkaranja.dev/tt/links` | `tiktok` |
| Instagram | `https://alvinkaranja.dev/ig/links` | `instagram` |
| X | `https://alvinkaranja.dev/x/links` | `x` |
| LinkedIn | `https://alvinkaranja.dev/in/links` | `linkedin` |

The frontend's root `next.config.mjs` defines these redirects.
Each returns a temporary HTTP 307 redirect to `/links`, adding
its canonical `utm_source`, `utm_medium=social` and
`utm_campaign=profile`. For example, `/ig/links` redirects to
`/links?utm_source=instagram&utm_medium=social&utm_campaign=profile`.

Next.js resolves the redirect before rendering the links page;
no duplicate page components or client redirect effects are
needed. Temporary redirects allow destinations to change without
instructing browsers to cache them permanently. Restart the
local server after config changes and deploy before using the
public URLs. `/links` remains available for direct visits.

Do not depend on social applications to append the desired UTM
parameters. Referrer-based attribution is a fallback and may be
unavailable in an in-app browser. The source encoded in these
URLs is a marketing label, not proof of the referring platform.

These routes supersede the older bare `/ig`, `/tt` and `/x`
proposal. `/go/*` outbound redirects are outside the current scope;
explicit link activation events cover the reporting contract.


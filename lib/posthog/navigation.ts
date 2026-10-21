/** Capture intentional navigation with source and destination. */
import { captureApplicationEvent } from '@/lib/posthog/events';
import { getNavigationContext } from '@/lib/posthog/navigation-context';
import type { NavigationLinkDetails } from '@/types/posthog/navigation';

/** Emit one link event and its optional project/contact event. */
export function captureLinkClick(
    href: string,
    details: NavigationLinkDetails,
): void {
    const context = getNavigationContext();
    const url = new URL(href, window.location.origin);
    const shared = {
        ...context,
        position: details.position,
        source_section: details.source_section,
    };
    captureApplicationEvent('link_clicked', {
        ...shared,
        destination: details.destination,
        link_category: details.link_category,
        is_external: url.origin !== window.location.origin,
    });
    if (details.project)
        captureApplicationEvent('project_viewed', {
            ...shared,
            project: details.project,
        });
    if (details.method)
        captureApplicationEvent('contact_clicked', {
            ...shared,
            method: details.method,
        });
}

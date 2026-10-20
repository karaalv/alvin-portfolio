'use client';

/** Keep link semantics while recording explicit navigation. */
import Link from 'next/link';
import { captureLinkClick } from '@/lib/posthog/navigation';
import type { TrackedLinkProps } from '@/types/components/shared/tracked-link';

/** Track activation without waiting for analytics delivery. */
export default function TrackedLink({
    analytics,
    onClick,
    onAuxClick,
    ...props
}: TrackedLinkProps) {
    function track(href: string) {
        try {
            captureLinkClick(href, analytics);
        } catch {
            // Tracking must never prevent navigation.
        }
    }
    return (
        <Link
            {...props}
            onClick={(event) => {
                onClick?.(event);
                if (
                    !event.defaultPrevented &&
                    event.button === 0
                )
                    track(event.currentTarget.href);
            }}
            onAuxClick={(event) => {
                onAuxClick?.(event);
                if (
                    !event.defaultPrevented &&
                    event.button === 1
                )
                    track(event.currentTarget.href);
            }}
        />
    );
}

/** Native Next.js link props with explicit analytics metadata. */
import type { ComponentProps } from 'react';
import type Link from 'next/link';
import type { NavigationLinkDetails } from '@/types/posthog/navigation';

export type TrackedLinkProps = ComponentProps<
    typeof Link
> & {
    analytics: NavigationLinkDetails;
};

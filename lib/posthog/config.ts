/** Configure the browser SDK and optional analytics activation. */
import posthog from 'posthog-js';
export function isPostHogConfigured(): boolean {
    return !!(
        process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
        process.env.NEXT_PUBLIC_POSTHOG_HOST
    );
}

/** Initialise browser analytics before React becomes interactive. */
export function initialisePostHog(): void {
    const projectToken =
        process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (projectToken && host) {
        posthog.init(projectToken, {
            api_host: host,
            ui_host: 'https://us.posthog.com',
            defaults: '2026-05-30',
            autocapture: true,
            capture_pageview: 'history_change',
            capture_pageleave: true,
            enable_heatmaps: true,
            disable_session_recording: false,
            capture_exceptions: false,
        });
    }
}

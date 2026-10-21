/** Video and still-image pair for a spotlight breakpoint. */
export interface SpotlightMedia {
    videoSrc: string;
    imageSrc: string;
}

/** Content and responsive media for one featured project. */
export interface SpotlightProps {
    title: string;
    description: string;
    date: string;
    href: string;
    ctaLabel: string;
    mediaAlt: string;
    desktopMedia: SpotlightMedia;
    mobileMedia: SpotlightMedia;
}

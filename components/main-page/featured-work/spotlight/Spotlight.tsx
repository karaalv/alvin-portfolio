'use client';

/** Featured project with responsive video and still-image fallback. */
import { useEffect, useRef } from 'react';
import Image, { getImageProps } from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { SpotlightProps } from '@/types/components/main-page/featured-work/spotlight';
import styles from '@styles/components/main-page/featured-work/spotlight/spotlight.module.css';

/** Play the matching artwork when visible and motion is permitted. */
export default function Spotlight({
    title,
    description,
    date,
    href,
    ctaLabel,
    mediaAlt,
    desktopMedia,
    mobileMedia,
}: SpotlightProps) {
    const mediaRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sizes =
        '(min-width: 1232px) 749px, (min-width: 769px) 65vw, 350px';
    const desktopImage = getImageProps({
        src: desktopMedia.imageSrc,
        alt: mediaAlt,
        fill: true,
        sizes,
    }).props;

    useEffect(() => {
        const video = videoRef.current;
        const container = mediaRef.current;
        if (!video || !container) return;

        const desktop = window.matchMedia(
            '(min-width: 769px)',
        );
        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        );
        let isVisible = false;

        function updatePlayback() {
            if (!video) return;
            if (!isVisible || reducedMotion.matches) {
                video.pause();
                if (reducedMotion.matches) {
                    video.dataset.ready = 'false';
                }
                return;
            }
            const src = desktop.matches
                ? desktopMedia.videoSrc
                : mobileMedia.videoSrc;
            if (video.getAttribute('src') !== src) {
                video.dataset.ready = 'false';
                video.src = src;
            }
            void video.play().catch(() => {
                video.dataset.ready = 'false';
            });
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                updatePlayback();
            },
            { threshold: 0.1 },
        );
        observer.observe(container);
        desktop.addEventListener('change', updatePlayback);
        reducedMotion.addEventListener(
            'change',
            updatePlayback,
        );
        return () => {
            observer.disconnect();
            desktop.removeEventListener(
                'change',
                updatePlayback,
            );
            reducedMotion.removeEventListener(
                'change',
                updatePlayback,
            );
            video.pause();
        };
    }, [desktopMedia.videoSrc, mobileMedia.videoSrc]);

    return (
        <article className={styles.container}>
            <div className={styles.info}>
                <div className={styles.metadata}>
                    <p className={styles.date}>{date}</p>
                    <div className={styles.bio}>
                        <h3 className={styles.title}>
                            {title}
                        </h3>
                        <p className={styles.description}>
                            {description}
                        </p>
                    </div>
                </div>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                >
                    {ctaLabel}
                    <ArrowUpRight
                        size={20}
                        aria-hidden="true"
                    />
                </a>
            </div>
            <div ref={mediaRef} className={styles.media}>
                <picture>
                    <source
                        media="(min-width: 769px)"
                        srcSet={desktopImage.srcSet}
                        sizes={sizes}
                    />
                    <Image
                        src={mobileMedia.imageSrc}
                        alt={mediaAlt}
                        fill
                        sizes={sizes}
                        className={styles.image}
                    />
                </picture>
                <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className={styles.video}
                    onPlaying={(event) => {
                        event.currentTarget.dataset.ready =
                            'true';
                    }}
                    onError={(event) => {
                        event.currentTarget.dataset.ready =
                            'false';
                    }}
                />
            </div>
        </article>
    );
}

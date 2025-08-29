/**
 * @description This component is used to
 * render a vertical text carousel for the
 * About section.
 */
import { useState, useEffect } from 'react';

// Styles.
import styles from '@styles/main-page/about/VerticalTextCarousel.module.css';

interface VerticalTextCarouselProps {
    items: string[];
    speed?: number;
}

export default function VerticalTextCarousel({
    items,
    speed = 2000,
}: VerticalTextCarouselProps) {
    // State for the current text index.
    const [currentIndex, setCurrentIndex] = useState(0);

    // Effect to change the text at the specified speed.
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(
                (prevIndex) =>
                    (prevIndex + 1) % items.length,
            );
        }, speed);

        return () => clearInterval(interval);
    }, [items.length, speed]);

    const renderText = () => {
        return items.map((item, i) => (
            <p
                key={i}
                className={`${styles.text} ${i === currentIndex ? styles.active : ''}`}
                style={{
                    transform: `translateY(${i - currentIndex * 100}%)`,
                    transition:
                        'transform 0.5s ease-in-out',
                }}
            >
                {item}
            </p>
        ));
    };

    return (
        <div className={styles.container}>
            <div className={styles.carousel}>
                {renderText()}
            </div>
        </div>
    );
}

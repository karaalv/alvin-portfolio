/**
 * @description This component renders a
 * loading icon for the chat page.
 */
import { useState, useEffect } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import styles from '@styles/chat-page/Loader.module.css';

export default function Loader() {
    const { thinkingSet } = useChatContext();
    const [currentHeader, setCurrentHeader] =
        useState<string>('');

    useEffect(() => {
        const headers = Array.from(thinkingSet ?? []);

        if (headers.length === 0) return;

        if (!currentHeader) {
            setCurrentHeader(headers[0]);
        }

        const interval = setInterval(() => {
            setCurrentHeader((prev) => {
                const currentIndex = headers.indexOf(prev);
                const nextIndex =
                    (currentIndex + 1) % headers.length;
                return headers[nextIndex];
            });
        }, 2000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [thinkingSet]);

    return (
        <div className={styles.loader_container}>
            <div className={styles.loading_icon} />
            {thinkingSet && (
                <div className={styles.loading_text}>
                    <p>Fetching...</p>
                    <p className={styles.shimmer_text}>
                        {currentHeader}
                    </p>
                </div>
            )}
        </div>
    );
}

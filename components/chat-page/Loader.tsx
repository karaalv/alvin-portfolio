/**
 * @description This component renders a
 * loading icon for the chat page.
 */
import { useState } from 'react';
import styles from '@styles/chat-page/Loader.module.css'

export default function Loader() {
    const [isThinking, setIsThinking] = useState<boolean>(false);
    return (
        <div className={styles.loader_container}>
            <div className={styles.loading_icon}/>
            {isThinking && <div className={styles.loading_text}>
                <p>Fetching...</p>
                <p className={styles.shimmer_text}>
                    Please wait while we fetch the data.
                </p>
            </div>}
        </div>
    )
}
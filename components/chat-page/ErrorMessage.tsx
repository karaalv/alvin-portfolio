/**
 * @description This component renders an 
 * error message when there is an issue
 * with the chat functionality.
 */
import { TriangleAlert } from 'lucide-react';

import styles from '@styles/chat-page/ErrorMessage.module.css'

interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage(
    { message }: ErrorMessageProps
) {
    return (
        <div className={styles.error_container}>
            <TriangleAlert 
                className={styles.error_icon} 
            />

            <p 
                className={styles.error_text}
            >
                {message}
            </p>
        </div>
    )
}
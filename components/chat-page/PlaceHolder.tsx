/**
 * @description This component renders a placeholder
 * for the chat section when no messages are present.
 */

import styles from '@styles/chat-page/PlaceHolder.module.css'

export default function PlaceHolder() {
    return (
        <div className={styles.container}>
            <p className={styles.placeholder_title}>
            Portfolio Agent.
            </p>
            <p className={styles.placeholder_text}>
                Need a custom CV? Curious about my work? 
                Ask a question or specify a role to get 
                started.
            </p>
        </div>
    )
}
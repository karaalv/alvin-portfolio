/**
 * @description This component renders the
 * agent canvas for the chat page.
 */

import ReactMarkdown from 'react-markdown'
import styles from '@styles/chat-page/Canvas.module.css'

export default function Canvas(
    { content }: { content: string }
) {
    return (
        <div className={styles.container}>
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </div>
    )
}
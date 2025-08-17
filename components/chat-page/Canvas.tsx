/**
 * @description This component renders the
 * agent canvas for the chat page.
 */

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { useAppContext } from '@/contexts/AppContext'

import { X } from 'lucide-react'
import styles from '@styles/chat-page/Canvas.module.css'

export default function Canvas() {

    const { canvasContent, setCanvasOpen } = useAppContext();

    const renderContent = () => {
        return (
            <ReactMarkdown
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >
                {canvasContent}
            </ReactMarkdown>
        )
    }

    const renderPlaceholder = () => {
        return (
            <div className={styles.placeholder_container}>
                <p className={styles.placeholder_title}>
                    Agent Canvas
                </p>
                <p className={styles.placeholder_text}>
                    This is the agent&apos;s canvas — it{' '}
                    will display custom content like{' '}
                    CVs, cover letters, and other{' '}
                    relevant information based on your{' '}
                    prompt.
                </p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <X 
                    className={styles.icon}
                    onClick={() => setCanvasOpen(false)} 
                />
            </div>
            {canvasContent ? renderContent() : renderPlaceholder()}
        </div>
    )
}
'use client'
/**
 * @description This component displays
 * information about the chat and usage.
 */

import { useEffect } from 'react'
import { X } from 'lucide-react'
import styles from '@styles/chat-page/InfoModal.module.css'
import { useChatContext } from '@contexts/ChatContext';
import { useSocketContext } from '@/contexts/SocketContext';

interface InfoModalProps {
    setInfoModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function InfoModal(
    { setInfoModal }: InfoModalProps
) {
    const { sendMessage } = useSocketContext();
    const { userUsage } = useChatContext()
    
    useEffect(() => {
        sendMessage({ type: 'check_usage', data: 'Check user usage' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userUsage]);

    return (
        <div className={styles.overlay}>
            <div className={styles.content_container}>
                <div className={styles.icon_container}>
                    <X 
                        onClick={() => setInfoModal(false)}
                        className={styles.icon}
                    />
                </div>
                {/* Main text */}
                <div className={styles.text_container}>
                    <div>
                        <p className={styles.header_text}>
                            ℹ️ About the Chat Agent
                        </p>
                        <p className={styles.body_text}>
                            Welcome! This chat agent is designed to impersonate
                            me (Alvin) and answer questions about my background,
                            projects, and experience.
                            It uses a <strong>Retrieval-Augmented Generation (RAG) </strong> 
                            approach, the model retrieves context from a curated set of my
                            information and combines it with its reasoning to provide
                            accurate, relevant answers in a conversational style.
                        </p>
                    </div>
                    <div>
                        <p className={styles.header_text}>
                            📃 Resume & Cover Letter Generation
                        </p>
                        <p className={styles.body_text}>
                            The agent can also generate tailored <strong>resumes </strong> 
                            and <strong>cover letters</strong>. 
                            You can provide either:
                        </p>
                        <ul className={styles.body_text}>
                            <li>A job description within the chat, or</li>
                            <li>A link to a job posting</li>
                        </ul>
                        <p className={styles.body_text}>
                            The agent will automatically research the role and company, 
                            then craft a document customized with my details.
                        </p>
                        <p className={styles.body_text}>
                            <strong>Note: </strong>Each user is limited to
                            <strong> 5 document generations </strong>
                            per week. You currently have <span className={styles.generations}>{userUsage} generations</span> 
                            {' '}left.
                        </p>
                    </div>
                    <div>
                        <p className={styles.header_text}>
                            🗑️ Data Retention
                        </p>
                        <p className={styles.body_text}>
                            To keep the platform lightweight, <strong>all</strong> chat history is
                            automatically deleted after <strong>7 days of inactivity</strong>.
                            Once removed, your past conversations cannot be recovered.
                        </p>
                    </div>
                    <div>
                        <p className={styles.header_text}>
                            🔒 Privacy
                        </p>
                        <p className={styles.body_text}>
                            For more details on data usage and storage,
                            please refer to the <a href="/privacy" target="_blank" className={styles.link}>Privacy Page</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
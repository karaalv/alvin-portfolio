'use client'
/**
 * @description This page is the main chat
 * interface for the website.
 */

import { useEffect, useState } from 'react'
import { PanelLeft, DraftingCompass } from 'lucide-react'
import { useAppContext } from '@/contexts/AppContext'

// Components
import ChatNav from '@/components/chat-page/ChatNav'
import ChatSection from '@/components/chat-page/ChatSection'
import DeleteConfirm from '@/components/chat-page/DeleteConfirm'
import Canvas from '@/components/chat-page/Canvas'

// Styles
import styles from '@styles/pages/ChatPage.module.css'

// Types
import { AgentMemory } from '@/types/service.types'

// Services
import { getAgentMemory } from '@/services/interface'

export default function ChatPage() {
    const { setError } = useAppContext()
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
    const [canvasOpen, setCanvasOpen] = useState<boolean>(false)
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
    const [messages, setMessages] = useState<AgentMemory[]>([])

    /**
     * @todo Main socket connection goes here
     */

    useEffect(() => {
        const loadMessages = async () => {
            setError(null)
            try {
                const data = await getAgentMemory()
                setMessages(data)
            } catch (error) {
                setError("There was an error loading messages")
            }
        }
        loadMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.chat_page}>
            {/* Navigation */}
            <div>
                <div 
                    className={`
                        ${styles.icon_container}
                        ${styles.nav_icon_container}
                    `}
                    onClick={() => setIsNavOpen(!isNavOpen)}
                >
                    <PanelLeft className={styles.icon} />
                </div>
                
                <ChatNav 
                    isOpen={isNavOpen} 
                    setDeleteConfirm={setDeleteConfirm} 
                />
            </div>

            {/* Delete Confirmation */}
            {deleteConfirm && (
                <DeleteConfirm 
                    setDeleteConfirm={setDeleteConfirm} 
                    setMessages={setMessages} 
                />
            )}

            {/* Chat Section */}
            <div 
                className={`
                    ${styles.chat_container}
                    ${canvasOpen ? styles.open : styles.closed}
                `}
            >
                <ChatSection 
                    messages={messages}
                    canvasOpen={canvasOpen}
                    setMessages={setMessages}
                />
            </div>

            {/* Canvas */}
            <div 
                className={`
                    ${styles.icon_container} 
                    ${styles.canvas_icon_container}
                `}
                onClick={() => setCanvasOpen(!canvasOpen)}
            >
                <DraftingCompass className={styles.icon} />
            </div>

            <div 
                className={`
                    ${styles.canvas_container}
                    ${canvasOpen ? styles.open : styles.closed}
                `}
            >
                <Canvas 
                    content=''
                />
            </div>
        </div>
    )
}
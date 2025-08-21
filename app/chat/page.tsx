'use client'
/**
 * @description This page is the main chat
 * interface for the website.
 */

import { useEffect, useState } from 'react'
import { PanelLeft, PanelLeftDashed } from 'lucide-react'
import { useChatContext } from '@contexts/ChatContext';

// Components
import ChatNav from '@/components/chat-page/ChatNav'
import ChatSection from '@/components/chat-page/ChatSection'
import DeleteConfirm from '@/components/chat-page/DeleteConfirm'
import Canvas from '@/components/chat-page/Canvas'
import InfoModal from '@/components/chat-page/InfoModal'

// Styles
import styles from '@styles/pages/ChatPage.module.css'

// Services
import { getAgentMemory } from '@/services/interface'

export default function ChatPage() {
    const { setError, isCanvasOpen, setMemory } = useChatContext()
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
    const [infoModal, setInfoModal] = useState<boolean>(false)

    useEffect(() => {
        const loadMessages = async () => {
            setError(null)
            try {
                const data = await getAgentMemory()
                setMemory(data)
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
            <div 
                className={`
                    ${styles.icon_container}
                    ${styles.nav_icon_container}
                `}
                onClick={() => setIsNavOpen(!isNavOpen)}
            >
                {isNavOpen ? (
                    <PanelLeftDashed className={styles.icon} />
                ) : (
                    <PanelLeft className={styles.icon} />
                )}
            </div>
            <div
                className={`
                    ${styles.nav_page}
                    ${isNavOpen ? styles.open : styles.closed}
                `}
            >                
                <ChatNav 
                    setDeleteConfirm={setDeleteConfirm}
                    setInfoModal={setInfoModal}
                />
            </div>

            {/* Delete Confirmation */}
            {deleteConfirm && (
                <DeleteConfirm 
                    setDeleteConfirm={setDeleteConfirm} 
                />
            )}

            {/* Info Modal */}
            {infoModal && (
                <InfoModal setInfoModal={setInfoModal} />
            )}

            {/* Chat Section */}
            <div 
                className={`
                    ${styles.chat_container}
                    ${isNavOpen ? styles.disappear : ''}
                    ${isCanvasOpen ? styles.hide : styles.show}
                `}
            >
                <ChatSection />
            </div>

            {/* Canvas */}
            <div 
                className={`
                    ${styles.canvas_container}
                    ${isNavOpen ? styles.disappear : ''}
                    ${isCanvasOpen ? styles.open : styles.closed}
                `}
            >
                <Canvas />
            </div>
        </div>
    )
}
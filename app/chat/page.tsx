'use client'
/**
 * @description This page is the main chat
 * interface for the website.
 */

import { useState } from 'react'
import { PanelLeft } from 'lucide-react'

// Components
import ChatNav from '@/components/chat-page/ChatNav'
import ChatSection from '@/components/chat-page/ChatSection'
import DeleteConfirm from '@/components/chat-page/DeleteConfirm'

// Styles
import styles from '@styles/pages/ChatPage.module.css'

// Types
import { AgentMemory } from '@/types/service.types'

export default function ChatPage() {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
    const [messages, setMessages] = useState<AgentMemory[]>([])

    /**
     * @todo Load messages here
     */

    return (
        <div className={styles.chat_page}>
            {/* Navigation */}
            <div>
                <div 
                    className={styles.nav_icon_container}
                    onClick={() => setIsNavOpen(!isNavOpen)}
                >
                    <PanelLeft className={styles.nav_icon} />
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

            {/* Main Chat Section */}

            {/* Chat Section */}
            <ChatSection 
                messages={messages}
                setMessages={setMessages}
            />

            {/* Canvas */}
        </div>
    )
}
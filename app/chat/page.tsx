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

// Styles
import styles from '@styles/pages/ChatPage.module.css'

export default function ChatPage() {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
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
                
                <ChatNav isOpen={isNavOpen} />
            </div>

            {/* Chat Section */}
            <ChatSection />

            {/* Canvas */}
        </div>
    )
}
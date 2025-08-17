'use client'
/**
 * @description This page is the main chat
 * interface for the website.
 */

import { useEffect, useState } from 'react'
import { PanelLeft } from 'lucide-react'
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
    const { setError, isCanvasOpen } = useAppContext()
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
    const [messages, setMessages] = useState<AgentMemory[]>([
        {
            id: "test",
            user_id: "user",
            source: 'agent',
            content: "Hello, world!",
            created_at: "2023-01-01T00:00:00Z",
            agent_canvas: {
                id: "canvas-1",
                title: "Software Engineer Application - Alvin Karanja",
                content: (`Dear Hiring Manager,
I am writing to express my keen interest in the 2025 Research and Development Software
Engineering Internship at Niantic’s London branch. With a strong background in software
development, along with a passion for solving problems and learning new skills, I am excited about
the opportunity to contribute to your innovative team.
In the final year of my undergraduate studies, I focused on the principles of Computer Graphics,
where I developed an interactive 3D game titled Getaway using the Three.js framework. This
project allowed me to apply my skills in classical web development, 3D modelling with Blender, and
game logic design.
A key challenges in developing Getaway was designing the NPC spawning algorithm, which played
a vital role in creating challenging and engaging environments. By abstracting the frame counter
variable and using trigonometric functions, I implemented a deterministic spawning algorithm that
enhanced the game's level design and improved the player experience.
I am particularly drawn to Niantic's mission to reshape mobile gaming through augmented reality. I
am eager to contribute to the Augmented Reality Teams's pioneering work, and I am confident that
my high work ethic and enthusiasm for innovation will allow me to make meaningful contributions
to your projects.
Thank you for considering my application. I look forward to the possibility of learning from your
talented team and contributing to Niantic's innovative work in Augmented Reality.
Kind regards,
Alvin KaranjaDear Hiring Manager,
I am writing to express my keen interest in the 2025 Research and Development Software
Engineering Internship at Niantic’s London branch. With a strong background in software
development, along with a passion for solving problems and learning new skills, I am excited about
the opportunity to contribute to your innovative team.
In the final year of my undergraduate studies, I focused on the principles of Computer Graphics,
where I developed an interactive 3D game titled Getaway using the Three.js framework. This
project allowed me to apply my skills in classical web development, 3D modelling with Blender, and
game logic design.
A key challenges in developing Getaway was designing the NPC spawning algorithm, which played
a vital role in creating challenging and engaging environments. By abstracting the frame counter
variable and using trigonometric functions, I implemented a deterministic spawning algorithm that
enhanced the game's level design and improved the player experience.
I am particularly drawn to Niantic's mission to reshape mobile gaming through augmented reality. I
am eager to contribute to the Augmented Reality Teams's pioneering work, and I am confident that
my high work ethic and enthusiasm for innovation will allow me to make meaningful contributions
to your projects.
Thank you for considering my application. I look forward to the possibility of learning from your
talented team and contributing to Niantic's innovative work in Augmented Reality.
Kind regards,
Alvin Karanja`)
            }
        }
    ])

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
                    ${isCanvasOpen ? styles.open : styles.closed}
                `}
            >
                <ChatSection 
                    messages={messages}
                    canvasOpen={isCanvasOpen}
                    setMessages={setMessages}
                />
            </div>

            {/* Canvas */}
            <div 
                className={`
                    ${styles.canvas_container}
                    ${isCanvasOpen ? styles.open : styles.closed}
                `}
            >
                <Canvas />
            </div>
        </div>
    )
}
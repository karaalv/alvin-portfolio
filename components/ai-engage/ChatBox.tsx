/**
 * @description This component renders the chat
 * box for AI engagement section, allowing users
 * to interact with AI features.
 */

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import styles from '@/styles/ai-engage/ChatBox.module.css'

const placeholderOptions = [
    "Tell me about Alvin's projects...",
    "Generate an ML Resume...",
    "Summarise Skills...",
    "Project Highlights...",
    "Ask about my experience..."
]

/**
 * Sending message should redirect to a chat 
 * interface.
 * @returns ChatBox Component
 */
export default function ChatBox() {
    const [currentPlaceholder, setCurrentPlaceholder] = useState<string>("")
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [isTyping, setIsTyping] = useState<boolean>(true)
    const [charIndex, setCharIndex] = useState<number>(0)

    // Typing effect for placeholder text.
    useEffect(() => {
        const currentText = placeholderOptions[currentIndex]
        
        if (isTyping) {
            if (charIndex < currentText.length) {
                const timeout = setTimeout(() => {
                    setCurrentPlaceholder(currentText.slice(0, charIndex + 1))
                    setCharIndex(charIndex + 1)
                }, 100) // Typing speed
                return () => clearTimeout(timeout)
            } else {
                // Finished typing, wait before deleting
                const timeout = setTimeout(() => {
                    setIsTyping(false)
                }, 2000) // Wait time before deleting
                return () => clearTimeout(timeout)
            }
        } else {
            if (charIndex > 0) {
                const timeout = setTimeout(() => {
                    setCurrentPlaceholder(currentText.slice(0, charIndex - 1))
                    setCharIndex(charIndex - 1)
                }, 50) // Deleting speed
                return () => clearTimeout(timeout)
            } else {
                // Finished deleting, move to next option
                setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholderOptions.length)
                setIsTyping(true)
            }
        }
    }, [charIndex, isTyping, currentIndex])
    
    return (
        <div className={styles.container}>
            <textarea 
                className={styles.input}
                placeholder={currentPlaceholder}
                rows={1}
            />

            {/* Send Button */}
            <button className={styles.send_button}>
                <ArrowUp className={styles.icon}/>
            </button>
        </div>
    )
}
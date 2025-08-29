'use client';
/**
 * @description This component renders the chat
 * box for AI engagement section, allowing users
 * to interact with AI features.
 */

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

// Context
import { useAppContext } from '@contexts/AppContext';

// Styles
import styles from '@styles/main-page/ai-engage/ChatBox.module.css';

const placeholderOptions = [
    "Tell me about Alvin's projects...",
    'Generate an ML Resume...',
    'Summarise Skills...',
    'Write a Cover Letter...',
    'Ask about my experience...',
];

/**
 * Sending message should redirect to a chat
 * interface.
 * @returns ChatBox Component
 */
export default function ChatBox() {
    const router = useRouter();
    const { message, setMessage } = useAppContext();
    const [currentPlaceholder, setCurrentPlaceholder] =
        useState<string>('');
    const [currentIndex, setCurrentIndex] =
        useState<number>(0);
    const [isTyping, setIsTyping] = useState<boolean>(true);
    const [charIndex, setCharIndex] = useState<number>(0);

    // Handle input change
    const handleInputChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setMessage(e.target.value);
    };

    // Handle send button click

    /**
     * Message is stored in app state, but
     * sent from chat input bar.
     */
    const sendMessage = () => {
        if (message.trim()) {
            router.push('/chat');
        }
    };

    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLTextAreaElement>,
    ) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    // Typing effect for placeholder text - only show when input is empty
    useEffect(() => {
        if (message) return; // Don't show typing effect when there's text

        const currentText =
            placeholderOptions[currentIndex];

        if (isTyping) {
            if (charIndex < currentText.length) {
                const timeout = setTimeout(() => {
                    setCurrentPlaceholder(
                        currentText.slice(0, charIndex + 1),
                    );
                    setCharIndex(charIndex + 1);
                }, 100); // Typing speed
                return () => clearTimeout(timeout);
            } else {
                // Finished typing, wait before deleting
                const timeout = setTimeout(() => {
                    setIsTyping(false);
                }, 2000); // Wait time before deleting
                return () => clearTimeout(timeout);
            }
        } else {
            if (charIndex > 0) {
                const timeout = setTimeout(() => {
                    setCurrentPlaceholder(
                        currentText.slice(0, charIndex - 1),
                    );
                    setCharIndex(charIndex - 1);
                }, 50); // Deleting speed
                return () => clearTimeout(timeout);
            } else {
                // Finished deleting, move to next option
                setCurrentIndex(
                    (prevIndex) =>
                        (prevIndex + 1) %
                        placeholderOptions.length,
                );
                setIsTyping(true);
            }
        }
    }, [charIndex, isTyping, currentIndex, message]);

    return (
        <div className={styles.container}>
            <textarea
                className={styles.input}
                placeholder={
                    message ? '' : currentPlaceholder
                }
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                rows={1}
            />

            {/* Send Button */}
            <button
                className={styles.send_button}
                onClick={sendMessage}
                disabled={!message.trim()}
            >
                <ArrowUp className={styles.icon} />
            </button>
        </div>
    );
}

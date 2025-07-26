/**
 * @description This component is an overlay 
 * that confirms the deletion of a chat.
 */

import styles from '@styles/chat-page/DeleteConfirm.module.css'

// Types
import { AgentMemory } from '@/types/service.types'

interface DeleteConfirmProps {
    setDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>
    setMessages: React.Dispatch<React.SetStateAction<AgentMemory[]>>
}

export default function DeleteConfirm(
    { setDeleteConfirm, setMessages }: DeleteConfirmProps
) {
    const handleDelete = () => {
        // Clear messages
        setMessages([])
        // Close the confirmation dialog
        setDeleteConfirm(false)
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.confirmation_box}>
                <p className={styles.heading_text}>
                    Are you sure you want to delete 
                    this chat?
                </p>
                <div 
                    className={`
                        ${styles.button_container}
                    `}
                >
                    <button 
                        className={`
                            ${styles.button_common}
                            ${styles.confirm_button}
                            ${styles.button_fonts}
                        `} 
                        onClick={handleDelete}
                    >
                        Yes, delete
                    </button>
                    <button 
                        className={`
                            ${styles.button_common}
                            ${styles.cancel_button}
                            ${styles.button_fonts}
                        `} 
                        onClick={() => setDeleteConfirm(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
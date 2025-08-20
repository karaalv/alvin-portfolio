/**
 * @description This component is an overlay 
 * that confirms the deletion of a chat.
 */
import { useState } from 'react'
import { deleteAgentMemory } from '@/services/interface'
import styles from '@styles/chat-page/DeleteConfirm.module.css'

// Services
import { useChatContext } from '@contexts/ChatContext';

interface DeleteConfirmProps {
    setDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteConfirm(
    { setDeleteConfirm }: DeleteConfirmProps
) {
    const { setMemory } = useChatContext()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handleDelete = async () => {
        if (loading) {
            return
        }
        setLoading(true)
        setError(null)

        try {
            const verdict = await deleteAgentMemory()
            if (!verdict) {
                setError(
                    "Failed to delete chat, " + 
                    "please try again later."
                )
            }
            // Clear UI
            setMemory([])
            setDeleteConfirm(false)
        } catch (error) {
            setError(
                "Failed to delete chat, " +
                "please try again later."
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.confirmation_box}>
                <p className={styles.heading_text}>
                    Are you sure you want to delete 
                    this chat?
                </p>
                {error && (
                    <p className={styles.error_text}>
                        {error}
                    </p>
                )}
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
                        disabled={loading}
                        style={{cursor: loading ? 'not-allowed' : 'pointer'}}
                    >
                        {loading? "Deleting..." : "Yes, delete"}
                    </button>
                    <button 
                        className={`
                            ${styles.button_common}
                            ${styles.cancel_button}
                            ${styles.button_fonts}
                        `} 
                        onClick={() => setDeleteConfirm(false)}
                        disabled={loading}
                        style={{cursor: loading ? 'not-allowed' : 'pointer'}}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
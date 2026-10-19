/** Static explanation of the portfolio assistant. */
import type { ChatModalProps } from '@/types/components/chat/modals';
import ChatModal from './ChatModal';
import styles from '@styles/components/chat/modals/chat-modal.module.css';

/** Show the assistant introduction without requesting usage data. */
export default function InfoModal(props: ChatModalProps) {
    return (
        <ChatModal {...props} titleId="chat-info-heading">
            <h2
                id="chat-info-heading"
                className={styles.title}
            >
                About this assistant
            </h2>
            <p className={styles.body}>
                I built this AI assistant to give you a more
                useful way to explore my work. It brings
                together information about my projects,
                experience and technical background so you
                can ask questions, follow your curiosity and
                go beyond what’s on my portfolio.
            </p>
        </ChatModal>
    );
}

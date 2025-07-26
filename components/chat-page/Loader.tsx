/**
 * @description This component renders a
 * loading icon for the chat page.
 */

import styles from '@styles/chat-page/Loader.module.css'

export default function Loader() {
    return (
        <div className={styles.loader_container}>
            <div className={styles.loading_icon}/>
        </div>
    )
}
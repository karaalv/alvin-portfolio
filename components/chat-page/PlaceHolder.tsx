/**
 * @description This component renders a placeholder
 * for the chat section when no messages are present.
 */

import styles from '@styles/chat-page/PlaceHolder.module.css'
import fonts from '@styles/common/Typography.module.css'

export default function PlaceHolder() {
    return (
        <div className={styles.placeholder_container}>
            <p className={fonts.sub_heading}>
                Portfolio Agent.
            </p>
            <p className={fonts.body}>
                Need a custom CV? Curious about my work? 
                Ask a question or specify a role to get 
                started.
            </p>
        </div>
    )
}
/**
 * @description This component displays a
 * cookie notice to users.
 */
import { toast } from 'react-hot-toast'
import { X } from 'lucide-react'

import styles from '@styles/main-page/utils/CookieNotice.module.css'

export default function CookieNotice() {
    return (
        <div className={styles.container}>
            <p className={styles.message}>
                This website uses cookies to manage data.
                For the best experience, avoid using private browsing.
            </p>
            <div 
                className={styles.icon_container}
                onClick={() => toast.dismiss()}
            >
                <X className={styles.icon} />
            </div>
        </div>
    )
}

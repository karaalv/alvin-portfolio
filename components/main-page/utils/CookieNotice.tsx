/**
 * @description This component displays a
 * cookie notice to users.
 */
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

import styles from '@styles/main-page/utils/CookieNotice.module.css'

export default function CookieNotice() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const hasAccepted = localStorage.getItem('cookie-accepted')
        if (!hasAccepted) {
            setShow(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookie-accepted', 'true')
        setShow(false)
    }

    return (
        <>
            {show && (
                <div className={styles.container}>
                    <p className={styles.message}>
                        This website uses cookies to manage data.
                        For the best experience, avoid using private browsing.
                    </p>
                    <div
                        className={styles.icon_container}
                        onClick={handleAccept}
                    >
                        <X className={styles.icon} />
                    </div>
                </div>
            )}
        </>
    )
}
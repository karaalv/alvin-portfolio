/*** Navbar Component ***/
'use client'

/* Imports */

// Styles.
import styles from '@/styles/Navbar.module.css'
import fonts from '@/styles/Typography.module.css'

// Types.
import { NavbarStates } from '@/Types/StyleTypes'

// React utilities.
import { useState } from 'react'

export default function Navbar(){
    const [navState, setNavState] = useState<NavbarStates>('About')

    return(
        <div className={styles.navbar_position}>
            <div className={styles.navbar_container}>
                <p className={styles.font}>About</p>
                <p className={styles.font}>Experience</p>
                <p className={styles.font}>Projects</p>
                <p className={styles.font}>Contact</p>
            </div>
        </div>
    )
}

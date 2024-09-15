/*** Navbar Component ***/
'use client'

/* Imports */

// Styles.
import styles from '@/styles/Navbar.module.css'

// Types.
import { NavbarStates } from '@/Types/StyleTypes'
import { NavBarProps } from '@/Types/ComponentProps'

// React utilities.
import { useState } from 'react'

/**
 * Site navigation bar.
 * 
 * @returns Navbar component
 */
export default function Navbar({isActive}: NavBarProps){

	// Navigation state.
    const [navState, setNavState] = useState<NavbarStates>('About')

	// Active or passive state.
	const [active, setActive] = useState<boolean>(isActive)

    // Section render function.
    const renderSections = (currentState: NavbarStates) => {
        const sections: NavbarStates[] = [
            'About', 
            'Experience', 
            'Projects', 
            'Contact'
        ]
    
        // Render each section title according to state.
        return sections.map(
            (section) => {
                if(section == currentState){
                    // Active section.
                    return(
                        <div 
							className={styles.active_section}
							key={section}
						>
                            <div className={styles.circle}/>
                            <p className={styles.font}>{section}</p>
                        </div>
                    )
                } else {
                    // Not active section.
					return(
						<p 
                        	className={`${styles.font} ${styles.nonactive}`}
                        	onClick={() => setNavState(section)}
							key={section}
                    	>
                        	{section}
                    	</p>
					)
                }
            }
        )
    }

    return(
        // Navbar position container.
        <div className={styles.navbar_position}>
            {/* Navbar arrangement container */}
            <div 
				className={styles.navbar_container}
				style={{opacity: active? 1:0.15}}
				onMouseEnter={() => setActive(true)}
				onMouseLeave={() => setActive(isActive)}
			>
				{/* Render section titles */}
				{renderSections(navState)}
            </div>
        </div>
    )
}
/*** Navbar Component ***/
'use client'

/* Imports */

// Styles.
import styles from '@/styles/Navbar.module.css'

// Types.
import { NavbarStates } from '@/types/StyleTypes'
import { NavBarProps } from '@/types/ComponentProps'

// React utilities.
import { useEffect, useState } from 'react'

/**
 * Site navigation bar.
 * 
 * @returns Navbar component
 */
export default function Navbar({isActive, currentSection}: NavBarProps){

	// Active or passive state.
	const [active, setActive] = useState<boolean>(isActive)

    // Re-render when Navbar state updates.

    // Active opacity.
    useEffect(() => {
        setActive(isActive)
    }, [isActive])

    // Scroll to section callback.
    const scrollToSection = (section: NavbarStates) => {

        // Fetch element ID and scroll.
        const element = document.getElementById(section)
        if(element){
            element.scrollIntoView()
        }
    }

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
                        	onClick={
                                () => {
                                    scrollToSection(section)
                                }
                            }
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
				style={{opacity: active? 1:0.1}}
				onMouseEnter={() => setActive(true)}
				onMouseLeave={() => setActive(isActive)}
			>
				{/* Render section titles */}
				{renderSections(currentSection)}
            </div>
        </div>
    )
}
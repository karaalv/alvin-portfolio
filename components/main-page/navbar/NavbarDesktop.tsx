/**
 * @description Desktop Navbar component.
 * This component is used to display the
 * desktop version of the navbar.
 */

import { useEffect, useState } from 'react'

// Styles.
import styles from '@styles/main-page/navbar/NavbarDesktop.module.css'

// Types.
import { NavbarStates } from '@/types/StyleTypes'
import { NavBarProps } from '@/types/components.types'

/**
 * @returns Desktop Navbar component
 */
export default function NavbarDesktop(
    {isActive}: NavBarProps
){

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
    const renderSections = () => {
        const sections: NavbarStates[] = [
            'About', 
            'Experience', 
            'Projects', 
            'Contact'
        ]
    
        // Render each section title according to state.
        return sections.map(
            (section) => {
                if(false){
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
				{renderSections()}
            </div>
        </div>
    )
}
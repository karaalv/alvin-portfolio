/**
 * @description Mobile Navbar component.
 * This component is used to display the
 * navigation bar on mobile devices.
 */
import styles from '@/styles/navbar/NavbarMobile.module.css'
import { NavBarProps } from '@/types/ComponentProps'
import { useState } from 'react'
import { NavbarStates } from '@/types/StyleTypes'

/**
 * @returns Mobile Navbar
 */
export default function NavbarMobile(
    {isActive, currentSection}: NavBarProps
){
    // Toggle state.
    const [isOpen, setIsOpen] = useState<boolean>(false)

    // Scroll to section callback.
    const scrollToSection = (section: NavbarStates) => {

        // Fetch element ID and scroll.
        const element = document.getElementById(section)
        if(element){
            element.scrollIntoView()
        }
    }

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
                                    setIsOpen(false)
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
        <>
            {/* Hamburger */}
            <div 
                className={styles.hamburger_container} 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    opacity: isActive? 1:0.1
                }}
            >
                <div className={styles.hamburger_bar}/>
                <div className={styles.hamburger_bar}/>
                <div className={styles.hamburger_bar}/>
            </div>

            {/* Side menu */}
            <div className={`${styles.side_menu} ${isOpen? styles.open:''}`}>
                {renderSections(currentSection)}
            </div>
        </>
    )
}
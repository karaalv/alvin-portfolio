/**
 * @description Navigation bar for the main 
 * page.
 */

import { PanelLeft, PanelLeftDashed } from 'lucide-react'
import styles from '@styles/common/Navbar.module.css'
import React from 'react';

interface NavbarProps {
    isMain: boolean;
    show: boolean;
    isNavOpen: boolean;
    setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar(
    { isMain, show, isNavOpen, setIsNavOpen }: NavbarProps
) {
    const sections = [
        'About',
        'Experience',
        'Projects',
        'Contact'
    ]
    
    const scrollToSection = (section: string) => {

        // Fetch element ID and scroll.
        const element = document.getElementById(section)
        if(element){
            element.scrollIntoView()
        }
    }

    return (
        <div 
            className={`
                ${styles.container}
                ${show ? styles.show : styles.hide}
            `}
        >
            <div 
                className={styles.icon_container}
                onClick={() => setIsNavOpen(!isNavOpen)}
            >
                {isNavOpen ? (
                    <PanelLeftDashed className={styles.nav_icon} />
                ) : (
                    <PanelLeft className={styles.nav_icon} />
                )}
            </div>
            {isMain && <div className={styles.section_container}>
                {sections.map(section => (
                    <p 
                        key={section} 
                        onClick={() => scrollToSection(section)}
                        className={styles.section_title}
                    >
                        {section}
                    </p>
                ))}
            </div>}
        </div>
    )
}
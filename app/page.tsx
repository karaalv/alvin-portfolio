/*** Main Webpage Handler ***/
'use client'

/* Imports */

// Styles
import styles from '@/Styles/MainPage.module.css'

// Navbar.
import Navbar from '@/components/Navbar'

// Sections.
import About from "@/components/about/About"
import Experience from '@/components/experience/Experience'
import Projects from '@/components/projects/Projects'

// React utilities.
import { useEffect, useState } from 'react'

// Main hander for section components.
export default function MainPage(){

    // Handle user scroll.
    const [hasScrolled, setScrolled] = useState<boolean>(false)
    
    // Scroll event listener.
    useEffect(() => {

        const handleScroll = () => {
            // Ensure scroll state is set.
            setScrolled(previous => {
                if(!previous){
                    return true
                }
                return previous
            })

            // Remove listener.
            if(hasScrolled){
                window.removeEventListener('scroll', handleScroll)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [hasScrolled])

    return(
        <div className={styles.mainPage}>
            <Navbar isActive={!hasScrolled}/>
            {/* <About/>
            <Experience/> */}
            <Projects/>
        </div>
    )
}
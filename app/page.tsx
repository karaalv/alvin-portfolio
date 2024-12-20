/*** Main Webpage Handler ***/
'use client'

/* Imports */

// Styles.
import styles from '@/styles/MainPage.module.css'

// Types.
import { NavbarStates } from '@/types/StyleTypes'

// Navbar.
import Navbar from '@/components/navbar/Navbar'

// Sections.
import About from "@/components/about/About"
import Experience from '@/components/experience/Experience'
import Projects from '@/components/projects/Projects'
import Contact from '@/components/contact/contact'

// Responsive provider.
import ResponsiveProvider from '@/components/ResponsiveContext'

// React utilities.
import { useEffect, useState } from 'react'

// Main hander for section components.
export default function MainPage(){

    // Check if in client.
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    // User scroll state.
    const [hasScrolled, setScrolled] = useState<boolean>(false)
    
    // User navigation section.
    const [currentSection, setCurrentSection] = useState<NavbarStates>('About')

    // Navbar scroll event listener.
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


    // Section scroll listener.
    const handleSectionScroll = () => {
        const sections = document.querySelectorAll('section')
        let current = ''

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect()

            if((rect.top >= 0 && rect.top < window.innerHeight)){
                current = section.id
                setCurrentSection(current as NavbarStates)
            }
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleSectionScroll)
        return () => {
            window.removeEventListener('scroll', handleSectionScroll)
        }
    }, [])

    // DO NOT RENDER IN SERVER.
    if(!isClient){
        return null
    }

    return(
            <ResponsiveProvider>
                <div className={styles.mainPage}>
                    <Navbar isActive={hasScrolled} currentSection={currentSection}/>
                    <About/>
                    <Experience/>
                    <Projects/>
                    <Contact/>
                </div>
            </ResponsiveProvider>
    )
}
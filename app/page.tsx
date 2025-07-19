'use client'
/**
 * @description Main page for the website. 
 * This page contains the main sections of
 * my portfolio.
 */

// Styles.
import styles from '@styles/pages/MainPage.module.css'

// Types.
import { NavbarStates } from '@/types/StyleTypes'

// Util Components.
import Navbar from '@/components/navbar/Navbar'
import Spacing from '@/components/common/Spacing'

// Sections.
import About from "@components/about/About"
import AIEngage from '@/components/ai-engage/AIEngage'
import Experience from '@components/experience/Experience'
// import Projects from '@components/projects/Projects'
import Contact from '@components/contact/Contact'

// Contexts.
import AppProvider from '@/contexts/AppContext'
import ResponsiveProvider from '@contexts/ResponsiveContext'

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
            <AppProvider>
                <div className={styles.mainPage}>
                    <Navbar isActive={hasScrolled} currentSection={currentSection}/>
                    <About/>
                    <Spacing size='large'/>
                    <AIEngage/>
                    <Spacing size='medium'/>
                    <Experience/>
                    {/* <Projects/> */}
                    <Contact/>
                </div>
            </AppProvider>
        </ResponsiveProvider>
    )
}
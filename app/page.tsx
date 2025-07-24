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
import Navbar from '@components/main-page/navbar/Navbar'
import Spacing from '@components/common/Spacing'

// Sections.
import About from "@components/main-page/about/About"
import AIEngage from '@components/main-page/ai-engage/AIEngage'
import Experience from '@components/main-page/experience/Experience'
import Projects from '@components/main-page/projects/Projects'
import Contact from '@components/main-page/contact/Contact'

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

    // Navbar timer - hide after 5 seconds.
    useEffect(() => {
        const timer = setTimeout(() => {
            setScrolled(true)
        }, 5000) // 5 seconds

        return () => {
            clearTimeout(timer)
        }
    }, [])


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
                    <Spacing size='small'/>
                    <Projects/>
                    <Spacing size='small'/>
                    <Contact/>
                </div>
            </AppProvider>
        </ResponsiveProvider>
    )
}
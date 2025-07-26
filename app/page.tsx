'use client'
/**
 * @description Main page for the website. 
 * This page contains the main sections of
 * my portfolio.
 */

// Styles.
import styles from '@styles/pages/MainPage.module.css'

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
import { useState, useEffect } from 'react'

// Main hander for section components.
export default function MainPage(){
    
    /**
     * @todo Update currentSection state
     */
    // const [currentSection, setCurrentSection] = useState<NavbarStates>('About')

    // // Navbar scroll event listener.
    // useEffect(() => {

    //     const handleScroll = () => {
    //         // Ensure scroll state is set.
    //         setScrolled(previous => {
    //             if(!previous){
    //                 return true
    //             }
    //             return previous
    //         })

    //         // Remove listener.
    //         if(hasScrolled){
    //             window.removeEventListener('scroll', handleScroll)
    //         }
    //     }

    //     window.addEventListener('scroll', handleScroll)

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll)
    //     }
    // }, [hasScrolled])


    // // Section scroll listener.
    // const handleSectionScroll = () => {
    //     const sections = document.querySelectorAll('section')
    //     console.log(`Current sections: ${sections}`)
    //     let current = ''

    //     sections.forEach((section) => {
    //         const rect = section.getBoundingClientRect()

    //         if((rect.top >= 0 && rect.top < window.innerHeight)){
    //             current = section.id
    //             setCurrentSection(current as NavbarStates)
    //         }
    //     })
    // }

    const [isClient, setIsClient] = useState(false)
    const [navbarActive, setNavbarActive] = useState<boolean>(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setNavbarActive(true)
        }, 3000)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    useEffect(() => {
        setIsClient(true)
    }, [])

    // DO NOT RENDER IF NOT CLIENT!!!
    if(!isClient){
        return null
    }

    return(
        <ResponsiveProvider>
            <AppProvider>
                <div className={styles.mainPage}>
                    <Navbar isActive={navbarActive}/>
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
'use client'
/**
 * @description Main page for the website. 
 * This page contains the main sections of
 * my portfolio.
 */

// Styles.
import styles from '@styles/pages/MainPage.module.css'

// Util Components.
import Navbar from '@components/common/Navbar'
import Spacing from '@components/common/Spacing'
import PageNav from '@/components/main-page/navbar/PageNav'

// Sections.
import About from "@components/main-page/about/About"
import AIEngage from '@components/main-page/ai-engage/AIEngage'
import Experience from '@components/main-page/experience/Experience'
import Projects from '@components/main-page/projects/Projects'
import Contact from '@components/main-page/contact/Contact'

// Utilities.
import { useState, useEffect, useRef } from 'react'
import { useAppContext } from '@/contexts/AppContext'

// Main hander for section components.
export default function MainPage(){

    const { isMobile } = useAppContext()
    const [isClient, setIsClient] = useState(false)
    const [isNavOpen, setIsNavOpen] = useState<boolean>(!isMobile)

    const [show, setShow] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const mainPageRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        const current = mainPageRef.current?.scrollTop || 0

        if (current > lastScrollY && current > 50) {
            setShow(false) // scrolling down
        } else {
            setShow(true) // scrolling up
        }
        setLastScrollY(current)
    }
    
    useEffect(() => {
        setIsClient(true)
    }, [])

    // DO NOT RENDER IF NOT CLIENT!!!
    if(!isClient){
        return null
    }

    return(
        <div
            className={styles.container}
        >
            {/* Navigation */}
            <Navbar
                isMain={true}
                show={show || isNavOpen}
                isNavOpen={isNavOpen}
                setIsNavOpen={setIsNavOpen}
            />
            <div
                className={`
                    ${styles.nav_page}
                    ${isNavOpen ? styles.open : styles.closed}
                `}
            >
                <PageNav />
            </div>
            <div 
                ref={mainPageRef}
                className={`
                    ${styles.main_page}
                    ${isNavOpen ? styles.hide : styles.show}
                `}
                onScroll={handleScroll}
            >
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
        </div>
    )
}
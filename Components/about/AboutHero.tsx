/*** About Hero Section ***/

/* Imports */

// About section styles.
import styles from '@/styles/about/AboutHero.module.css'

// Font styles.
import fonts from '@/styles/Typography.module.css'

import { useResponsiveContext } from '../ResponsiveContext'
import { useEffect, useState } from 'react'

/**
 * @returns About hero section
 */
export default function AboutHero(){
    
    const [isMobile, setMobile] = useState<boolean | null>(null)
    const res = useResponsiveContext().isMobile

    useEffect(() => {
        setMobile(res)
    }, [])

    const renderTitles = () => {
        return(
            <div style={{
                paddingLeft: isMobile? '0':'5rem',
                marginTop: isMobile? '1rem':'5rem',
            }}>
                <p
                    className={styles.swe_text}
                >
                    Full-Stack Software Engineer
                </p>
                <p
                    className={styles.imperial_text}
                >
                    Imperial College London
                </p>
                <p
                    className={styles.imperial_text}
                >
                    MSc, Business Analytics
                </p>
            </div>
        )
    }

    return(
        <div className={styles.section_container}>
            {/* Hero section */}
            <div className={styles.hero_container}>
                {/* Bio */}
                <div className={styles.bio_container}>
                    {/* Profile */}
                    <div style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                    }}>
                        <img 
                            src='/assets/Portrait.png' 
                            alt='Photo of me ;)'
                            className={styles.portrait}
                        />
                    </div>
                    {/* Titles - Web*/}
                    {!isMobile? renderTitles(): <></>}
                </div>
                {/* Info */}
                <div className={styles.info_container}>
                    <p 
                        className={fonts.heading}
                        style={{
                            margin: '0%'
                        }}
                    >
                        About
                    </p>
                    <p 
                        className={fonts.sub_heading}
                        style={{
                            marginTop: '4rem',
                            marginBottom: '2rem',
                            width: '100%'
                        }}
                    >
                        Hey, I'm Alvin.
                    </p>
                    <p
                        className={styles.info_text}
                    >
                        I am passionate about leveraging
                        <span style={{fontWeight: 'bold'}}> Technology </span>to
                        build creative products
                    </p>
                    {/* Titles - Mobile */}
                    {isMobile? renderTitles(): <></>}
                </div>
            </div>
        </div>
    )
}
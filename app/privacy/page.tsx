'use client'
/**
 * @description Privacy policy page
 * for the website. 
 */
import { useState } from 'react'
import { PanelLeft } from 'lucide-react'

// Components
import PrivacyNav from '@/components/privacy-page/PrivacyNav'

// Styles
import styles from '@styles/pages/PrivacyPage.module.css'
import fonts from '@styles/common/Typography.module.css'

export default function PrivacyPage() {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)

    return (
        <div className={styles.privacy_page}>
            {/* Navigation */}
            <div>
                <div 
                    className={styles.nav_icon_container}
                    onClick={() => setIsNavOpen(!isNavOpen)}
                >
                    <PanelLeft className={styles.nav_icon} />
                </div>

                <PrivacyNav isOpen={isNavOpen} />
            </div>

            {/* Header */}
            <div className={styles.privacy_header}>
                <p className={fonts.sub_heading}>
                    Privacy Policy.
                </p>
                <p className={styles.updated_text}>
                    Updated August 1, 2025
                </p>
            </div>

            {/* Content */}
            <div className={styles.content}>
                <p className={styles.body}>
                    This Privacy Policy explains how this 
                    website handles your data and protects 
                    your privacy during your visit.
                </p>

                <div className={styles.spacing}/>

                {/* Commercial Use */}
                <p className={styles.heading}>
                    Commercial Use
                </p>
                <p className={styles.body}>
                    This portfolio is a personal, non-commercial 
                    project created to showcase my work. If you 
                    wish to use any part of this site or its 
                    content for commercial purposes, please 
                    contact me directly for permission.
                </p>

                <div className={styles.spacing}/>
                
                {/* Information Collection */}
                <p className={styles.heading}>
                    Information Collection
                </p>
                <p className={styles.body}>
                    No personally identifiable information (PII) 
                    is collected from visitors to this website.
                </p>
                <br/>
                <p className={styles.body}>
                    Some basic, non-personal data (e.g. browser type, 
                    pages visited, time spent) may be collected via 
                    <span style={{ fontWeight: 'bold' }}> Google Analytics</span> to understand usage patterns 
                    and improve the site experience. Under the 
                    <span style={{ fontWeight: 'bold' }}> General Data Protection Regulation (GDPR)</span>, this 
                    data is processed on the basis of legitimate interest
                    and is not used to identify individual users.
                </p>

                <div className={styles.spacing}/>

                {/* Chat Agent Data */}
                <p className={styles.heading}>
                    Chat Agent Data
                </p>
                <p className={styles.body}>
                    Messages sent to the chat agent may be stored 
                    temporarily for the purpose of improving its 
                    performance and context-awareness. This data is:
                </p>
                <br/>
                <ul className={styles.body}>
                    <li>Not shared with any third parties</li>
                    <li>Not used for advertising or profiling</li>
                    <li>Used only to enhance the chat experience</li>
                </ul>
                <br/>
                <p className={styles.body}>
                    I may manually review anonymised message data to 
                    debug or improve the chatbots functionality. However, 
                    <span style={{ fontWeight: 'bold' }}> 
                    {' '} do not share any sensitive or confidential information
                    </span>
                    , {' '} while best efforts are made to protect data, complete 
                    security cannot be guaranteed.
                </p>

                <div className={styles.spacing}/>

                {/* User Privacy */}
                <p className={styles.heading}>
                    User Privacy
                </p>
                <p className={styles.body}>
                    All chat agent interactions are anonymous by default. 
                    You are not required to submit any personal data to 
                    use the chatbot or browse the site.
                </p>
                <br/>
                <p className={styles.body}>
                    If you voluntarily provide personal information, 
                    it will be treated confidentially and in accordance 
                    with this policy.
                </p>
                <br/>
                <p className={styles.body}>
                    This policy may be updated periodically. The latest 
                    version will always be available on this page.
                </p>

                <div className={styles.spacing}/>

                {/* Cookies */}
                <p className={styles.heading}>
                    Cookies
                </p>
                <p className={styles.body}>
                    This website may use basic cookies to support 
                    functionality (e.g. navigation or session management). 
                    These cookies do not collect personal information and 
                    are not used for tracking or advertising.
                </p>

                <div className={styles.spacing}/>

                {/* Session Data */}
                <p className={styles.heading}>
                    Session Data
                </p>
                <p className={styles.body}>
                    Temporary session data may be used to manage your 
                    ongoing interaction with the chat agent. This data 
                    is automatically deleted after <span style={{ fontWeight: 'bold' }}>5 days</span> and is not 
                    retained beyond that period.
                </p>

                <div className={styles.spacing}/>

                {/* Contact Information */}
                <p className={styles.heading}>
                    Contact Information
                </p>
                <p className={styles.body}>
                    If you have any questions or concerns about this policy, 
                    feel free to contact me at:
                </p>
                <p className={styles.body}>
                    <a href="mailto:alviinkaranjja@gmail.com">
                        alviinkaranjja@gmail.com
                    </a>
                </p>
            </div>
        </div>
    )
}
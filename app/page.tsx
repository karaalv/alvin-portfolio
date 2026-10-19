'use client';
/**
 * @description Main page for the website.
 * This page contains the main sections of
 * my portfolio.
 */

// Styles.
import styles from '@styles/pages/MainPage.module.css';

// Util Components.
import Navbar from '@components/shared/Navbar';
import Spacing from '@components/common/Spacing';

// Sections.
import About from '@components/main-page/about/About';
import AIEngage from '@components/main-page/ai-engage/AIEngage';
import Experience from '@components/main-page/experience/Experience';
import Projects from '@components/main-page/projects/Projects';
import Contact from '@components/main-page/contact/Contact';

// Utilities.
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import CookieNotice from '@/components/main-page/utils/CookieNotice';

// Main hander for section components.
export default function MainPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Set toast message
        toast.custom(() => <CookieNotice />, {
            duration: 7_000,
        });
    }, []);

    // DO NOT RENDER IF NOT CLIENT!!!
    if (!isClient) {
        return null;
    }

    return (
        <div className={styles.container}>
            <Toaster position="bottom-center" />
            {/* Navigation */}
            <Navbar />
            <div className={styles.main_page}>
                <About />
                <Spacing size="large" />
                <AIEngage />
                <Spacing size="small" />
                <Experience />
                <Projects />
                <Spacing size="small" />
                <Contact />
            </div>
        </div>
    );
}

/**
 * @description This component renders the hero
 * section of the About page, this is the first
 * section that users will see when they visit
 * the site.
 */
import { useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';

// Components.
import VerticalTextCarousel from '@components/main-page/about/VerticalTextCarousel';

// Styles
import styles from '@styles/main-page/about/AboutHero.module.css';
import fonts from '@styles/common/Typography.module.css';

/**
 * @returns About hero section
 */
export default function AboutHero() {
    const { isMobile } = useAppContext();
    const carouselItems = [
        'Software Engineer',
        'Machine Learning Engineer',
        'Data Scientist',
    ];
    const speed = 3000;

    useEffect(() => {
        // Rerender when mobile state changes
    }, [isMobile]);

    const renderIntro = () => {
        return (
            <>
                <p
                    className={fonts.heading}
                    style={{
                        margin: '0%',
                    }}
                >
                    About
                </p>
                <p
                    className={fonts.sub_heading}
                    style={{
                        marginTop: isMobile
                            ? '5rem'
                            : '10rem',
                        marginBottom: isMobile
                            ? '3rem'
                            : '7.5rem',
                        width: '100%',
                    }}
                >
                    Hey, I&apos;m Alvin 👋🏾.
                </p>
            </>
        );
    };

    const renderBio = () => {
        return (
            <p className={styles.bio_text}>
                I like building creative things with
                <span style={{ fontWeight: 'bold' }}>
                    {' '}
                    technology
                </span>
            </p>
        );
    };

    const renderInstitutions = () => {
        return (
            <div className={styles.institution_container}>
                <p className={styles.institution_text}>
                    MSc, Imperial College London
                </p>
                <p className={styles.institution_text}>
                    BEng, University of Warwick
                </p>
            </div>
        );
    };

    return (
        <div className={styles.section_container}>
            {/* Hero section */}
            <div className={styles.hero_container}>
                {/* Intro */}
                <div className={styles.intro_container}>
                    {renderIntro()}
                    <VerticalTextCarousel
                        items={carouselItems}
                        speed={speed}
                    />
                </div>
                {/* Bio */}
                <div className={styles.bio_container}>
                    {renderBio()}
                    {renderInstitutions()}
                </div>
            </div>
        </div>
    );
}

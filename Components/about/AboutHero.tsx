/*** About Hero Section ***/

/* Imports */

// About section styles.
import styles from '@/styles/about/AboutHero.module.css'

// Font styles.
import fonts from '@/styles/Typography.module.css'

/**
 * @returns About hero section
 */
export default function AboutHero(){
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
                            alt='Photo of me :)'
                            style={{
                                maxWidth: '65%',
                                height: 'auto',
                            }}
                        />
                    </div>
                    {/* Titles */}
                    <div style={{
                        paddingLeft: '10%',
                        marginTop: '5rem'
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
                        I am someone passionate about leveraging <span style={{fontWeight: 'bold'}}>Technology</span> to
                        build creative products
                    </p>
                </div>
            </div>
        </div>
    )
}
/**
 * @description Contact section of the
 * portfolio. This section contains
 * contact information and links to
 * social media.
 */

import Image from 'next/image'
import styles from '@styles/main-page/contact/Contact.module.css'

/**
 * @returns Contact section
 */
export default function Contact(){

    return(
        <section
            id='Contact'
            className={styles.section_container}
        >
            {/* Content */}
            <div className={styles.content_container}>
                {/* Title */}
                <p className={styles.contact_title}>
                    Contact.
                </p>
                {/* Icons */}
                <div className={styles.icon_container}>
                    <a
                        href='https://www.linkedin.com/in/alvin-n-karanja/'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <Image 
                            src='/assets/linkedin.png'
                            alt='LinkedIn Icon'
                            className={styles.icon}
                            width={40}
                            height={40}
                        />
                    </a>
                    <a
                        href='https://github.com/karaalv'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <Image 
                            src='/assets/github.png'
                            alt='GitHub Icon'
                            width={40}
                            height={40}
                            className={styles.icon}
                        />
                    </a>
                    <a
                        href='mailto:alviinkaranjja@gmail.com'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <Image 
                            src='/assets/mail.png' 
                            alt='Email Icon'
                            width={40}
                            height={40}
                            className={styles.icon}
                        />
                    </a>

                </div>
            </div>
            <div className={styles.footer_container}>
                <p className={styles.copyright}>
                    Made with ❤️ Alvin Karanja © 2025
                </p>
                <p className={styles.privacy}>
                    <a href='/privacy'>
                        Privacy Policy
                    </a>
                </p>
            </div>
        </section>
    )
}
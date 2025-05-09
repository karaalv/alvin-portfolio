/*** Contact Section ***/

/* Imports */
import fonts from '@/styles/Typography.module.css'
import styles from '@/styles/contact/Contact.module.css'

/**
 * @returns Contact section
 */
export default function Contact(){

    return(
        <section
            id='Contact'
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '3rem'
            }}
        >
            {/* Divider */}
            <div className={styles.divider}/>
            {/* Content */}
            <div
                className={styles.content_container}
            >
                {/* Title */}
                <p 
                    className={fonts.sub_heading} 
                    style={{marginTop: '0px'}}
                >
                    Contact.
                </p>
                {/* Icons */}
                <div className={styles.icon_container}>
                    <a
                        href='https://www.linkedin.com/in/alvin-n-karanja/'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img 
                            src='/assets/linkedin.png' 
                            className={styles.icon}
                            style={{
                                maxWidth: '5rem',
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                    </a>
                    <a
                        href='https://github.com/karaalv'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img 
                            src='/assets/github.png' 
                            className={styles.icon}
                            style={{
                                maxWidth: '5rem',
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                    </a>
                    <a
                        href='mailto:alvin.karanja24@imperial.ac.uk'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img 
                            src='/assets/mail.png' 
                            className={styles.icon}
                            style={{
                                maxWidth: '5rem',
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                    </a>

                </div>
            </div>
            <p className={styles.copyright}>
                Made with ❤️ Alvin Karanja © 2024
            </p>
        </section>
    )
}
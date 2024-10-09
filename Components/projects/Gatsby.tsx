/*** Gatsby Carousel Card ***/

/* Imports */

import fonts from '@/styles/Typography.module.css'
import common from '@/styles/projects/Common.module.css'
import styles from '@/styles/projects/Gatsby.module.css'

/**
 * @returns Gatsby Carousel Card
 */
export default function Gatsby(){
    return(
        <div className={common.project_container}>
            {/* Content */}
            <div className={styles.content_container}>
                {/* Title */}
                <div className={common.title_container}>
                    <img 
                        src='/assets/link.png' 
                        alt='Photo of app'
                        style={{
                            width: '3rem',
                            height: 'auto',
                            marginRight: '1%',
                            objectFit: 'contain'
                        }}
                    />
                    <a 
                        className={fonts.sub_heading}
                        href='https://github.com/karaalv/Gatsby-Public'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Gatsby.
                    </a>
                </div>

                {/* Tech stack */}
                <p className={common.tech_stack}>
                    React Native, Typescript, Express.js, Expo, Solidity,
                    web3.js
                </p>
                {/* Bio */}
                <ul>
                    <li className={`${fonts.body} ${common.info}`}>
                        Founded a ticket distribution mobile platform 
                        leveraging blockchain technology to facilitate 
                        a unique ticket authentication algorithm for 
                        enhanced security
                    </li>
                </ul>
            </div>

            {/* Media */}
            <div className={styles.image_container}>
                <img 
                    src='/assets/gatsby.png' 
                    alt='Photo of app'
                    className={styles.app_image}
                />
            </div>
        </div>
    )
}
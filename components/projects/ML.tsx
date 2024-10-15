/*** ML Carousel Card ***/

/* Imports */

import fonts from '@/styles/Typography.module.css'
import common from '@/styles/projects/Common.module.css'
import styles from '@/styles/projects/ML.module.css'

/**
 * @returns Gatsby Carousel Card
 */
export default function ML(){
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
                        style={{
                            whiteSpace: 'nowrap'
                        }}
                        href='https://github.com/karaalv/ES3H3-Assesment'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Machine Learning.
                    </a>
                </div>
                {/* Tech stack */}
                <p className={common.tech_stack}>
                    MATLAB, Data Analysis, Linear Algebra, Multivariable Calculus
                </p>
                {/* Bio */}
                <ul>
                    <li className={`${fonts.body} ${common.info}`}>
                        Assessed various cost functions and applied advanced 
                        optimisation algorithms including, Linear Regression, 
                        Logistic Regression and Newtonian Descent
                    </li>
                </ul>
            </div>

            {/* Media */}
            <div className={styles.image_container}>
                <video 
                    src="/assets/MLvideo.mov"
                    loop
                    muted
                    autoPlay
                    playsInline
                    className={styles.app_image}
                />
            </div>
        </div>
    )
}
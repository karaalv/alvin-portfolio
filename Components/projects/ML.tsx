/*** ML Carousel Card ***/

/* Imports */

import fonts from '@/styles/Typography.module.css'
import common from '@/styles/projects/Common.module.css'

/**
 * @returns Gatsby Carousel Card
 */
export default function ML(){
    return(
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%'
        }}>
            {/* Content */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                // backgroundColor: 'red',
                padding: '3rem',
            }}>
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
                <ul
                    className={fonts.body}
                    style={{
                        lineHeight: '7rem',
                    }}
                >
                    <li>
                        Assessed various cost functions and applied advanced 
                        optimisation algorithms including, Linear Regression, 
                        Logistic Regression and Newtonian Descent
                    </li>
                </ul>
            </div>

            {/* Media */}
            <div style={{
                display: 'flex',
                width: '45%', 
                // backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <video 
                    src="/assets/MLvideo.mov"
                    loop
                    muted
                    autoPlay
                    style={{
                        maxWidth: '80%',
                        maxHeight: '80%',
                        objectFit: 'contain',
                    }}
                />
            </div>
        </div>
    )
}
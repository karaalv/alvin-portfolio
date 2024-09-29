/*** Gatsby Carousel Card ***/

/* Imports */

import fonts from '@/styles/Typography.module.css'
import common from '@/styles/projects/Common.module.css'

/**
 * @returns Gatsby Carousel Card
 */
export default function Gatsby(){
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
                width: '60%',
                // backgroundColor: 'red',
                padding: '3rem',
            }}>
                {/* Title */}
                <p className={fonts.sub_heading}>
                    Gatsby.
                </p>
                {/* Tech stack */}
                <p className={common.tech_stack}>
                    React Native, Typescript, Express.js, Expo, Solidity,
                    web3.js
                </p>
                {/* Bio */}
                <ul>
                    <li
                        className={fonts.body}
                        style={{
                            lineHeight: '7rem',
                        }}
                    >
                        Founded a ticket distribution mobile platform 
                        leveraging blockchain technology to facilitate 
                        a unique ticket authentication algorithm for 
                        enhanced security.
                    </li>
                </ul>
            </div>

            {/* Media */}
            <div style={{
                display: 'flex',
                width: '35%', 
                // backgroundColor: 'blue',
                alignContent: 'center',
                justifyContent: 'center',
            }}>
                <img 
                    src='/assets/gatsby.png' 
                    alt='Photo of app'
                    style={{
                        maxWidth: '70%',
                        height: 'auto',
                        objectFit: 'contain'
                    }}
                />
            </div>
        </div>
    )
}
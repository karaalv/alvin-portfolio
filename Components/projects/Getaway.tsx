/*** Getaway Carousel Card ***/

/* Imports */

import fonts from '@/styles/Typography.module.css'
import common from '@/styles/projects/Common.module.css'

/**
 * @returns Gatsby Carousel Card
 */
export default function Getaway(){
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
                <p className={fonts.sub_heading}>
                    Getaway.
                </p>
                {/* Tech stack */}
                <p className={common.tech_stack}>
                    Three.js, JavaScript, HTML, CSS, Blender, Vite
                </p>
                {/* Bio */}
                <ul
                    className={fonts.body}
                    style={{
                        lineHeight: '7rem',
                    }}
                >
                    <li>
                        Created an interactive 3D web-based game using the 
                        WebGL based framework Three.js
                    </li>
                    <li>
                        Constructed state management optimisation resources 
                        in JavaScript enabling densely populated levels
                    </li>
                </ul>
            </div>

            {/* Media */}
            <div style={{
                display: 'flex',
                width: '45%', 
                // backgroundColor: 'blue',
                alignContent: 'center',
                justifyContent: 'center',
            }}>
                <img 
                    src='/assets/getaway.png' 
                    alt='Photo of app'
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        objectFit: 'contain'
                    }}
                />
            </div>
        </div>
    )
}
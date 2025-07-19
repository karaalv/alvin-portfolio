/**
 * @description Projects component that contains
 * a carousel of projects for the portfolio.
 */

import Gatsby from '@components/projects/Gatsby'
import Spacing from '@components/common/Spacing'
// import styles from '@/styles/projects/Projects.module.css'
import fonts from '@/styles/common/Typography.module.css'


export default function Projects(){
    return(
        <section
            id='Projects'
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}
        >   
            <p className={fonts.heading}>Projects</p>
            <Spacing size='small'/>
            
            <Gatsby/>
        </section>
    )
}
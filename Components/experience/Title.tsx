/*** Experience Section Title ***/

/* Imports */
import fonts from '@/styles/Typography.module.css'

/**
 * @returns Experience title
 */
export default function ExperienceTitle(){
    return(
        <div style={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <p className={fonts.heading}>Experience</p>
        </div>
    )
}
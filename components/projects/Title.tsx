/*** Projects Section Title ***/

/* Imports */
import fonts from '@/styles/Typography.module.css'

/**
 * @returns Experience title
 */
export default function ProjectsTitle(){
    return(
        <div style={{
            display: 'flex',
        }}>
            <p className={fonts.heading}>Projects</p>
        </div>
    )
}
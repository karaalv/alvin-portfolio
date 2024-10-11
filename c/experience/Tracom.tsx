/*** Experience Tracom Section ***/

/* Imports */

import fonts from '@/styles/Typography.module.css'
import styles from '@/styles/experience/Tracom.module.css'

/**
 * @returns Tracom section
 */
export default function Tracom(){
    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {/* Title */}
            <p className={fonts.sub_heading}>
                Tracom Services Ltd.
            </p>

            {/* Info */}
            <p className={fonts.body}>
                August 2023 - September 2023
            </p>
            <p 
                className={fonts.body}
                style={{
                    marginTop: '0%'
                }}
            >
                Nairobi, Kenya
            </p>

            {/* Role */}
            <p 
                className={fonts.body}
                style={{
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    marginTop: '3rem'
                }}
            >
                Software Developer, Artificial Intelligence
            </p>

            {/* Terminal */}
            <div className={styles.terminal}>
                <ul className={styles.terminal_list}>
                    <li>
                        Spearheaded the development of internal AI tooling, 
                        building several applications using LangChain for 
                        LLM orchestration, JavaScript for client-side logic 
                        and MySQL for storage
                    </li>
                    <li style={{marginTop: '2rem'}}>
                        Optimised documentation workflow by deploying Natural 
                        Language Processing summarisation models condensing 
                        80-100 page technical reports into 1-2 page actionable 
                        insights for business and sales teams
                    </li>
                </ul>
            </div>

        </div>
    )
}
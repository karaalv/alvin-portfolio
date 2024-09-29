/*** Experience Warwick Racing Section ***/

/* Imports */
import styles from '@/styles/experience/Racing.module.css'
import fonts from '@/styles/Typography.module.css'
import PCB from './PCB'

/**
 * @returns Racing section
 */
export default function Racing(){
    return(
        <div style={{
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'red'
        }}>
            {/* Bio */}
            <div style={{width: '40%'}}>
                <div style={{display:'flex', flexDirection: 'column'}}>
                    {/* Title */}
                    <p className={fonts.sub_heading}>
                        Warwick Racing.
                    </p>

                    {/* Info */}
                    <p className={fonts.body}>
                        September 2023 - July 2023
                    </p>
                    <p 
                        className={fonts.body}
                        style={{
                            marginTop: '0%'
                        }}
                    >
                        Coventry, United Kingdom
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
                        Co-Chief Electrical Systems Engineer
                    </p>

                    {/* Role */}
                    <div> 
                        <ul>
                            <li 
                                className={fonts.body}
                                style={{
                                    lineHeight: '7rem'
                                }}
                            >
                                Oversaw the research and development of electronics 
                                onto a third-generation electrical race vehicle, 
                                competing at Silverstone racecourse and placing 9th 
                                overall in the Electrical Vehicle class in Formula 
                                Student UK 2024
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* PCB */}
            <div 
                style={{
                    width: '55%', 
                    // backgroundColor: 'blue'
                }}
                className={styles.pcb}
            >
                <PCB/>
            </div>
        </div>
    )
}
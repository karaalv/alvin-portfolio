/*** Experience Fintech Section ***/

/* Imports */
import fonts from '@/styles/Typography.module.css'
import styles from '@/styles/experience/Fintech.module.css'

/**
 * @returns Fintech section
 */
export default function Fintech(){
    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {/* Title */}
            <p className={fonts.sub_heading}>
                Fintech Transformative Technology.
            </p>

            {/* Info */}
            <p className={fonts.body}>
                July 2022 - August 2022
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
                Software Developer, Back-End Engineer
            </p>

            {/* Terminal */}
            <div style={{
                display: 'flex', 
                flexDirection: 'row', 
                // backgroundColor: 'red', 
                width: '100%',
                height: 'auto',
                marginTop: '5rem'
            }}>
                {/* Query */}
                <div 
                    style={{width: '40%'}}
                    className={styles.terminal_query}
                >
                    {/* Query title */}
                    <div className={styles.title_container}>
                        <p>Query.sql</p>
                        <div className={styles.title_divider}/>
                    </div>

                    {/* Query text */}
                    <p className={styles.query_text}>
                        <span style={{color: '#C06B70'}}>SELECT</span> contribution <br/>
                        <span style={{color: '#C06B70'}}>FROM</span> fintech
                    </p>
                </div>

                {/* Divider */}
                <div 
                    style={{width: '0.1%'}}
                    className={styles.terminal_divider}
                />

                {/* Result */}
                <div 
                    style={{width: '59.9%'}}
                    className={styles.terminal_result}
                >
                    {/* Result title */}
                    <div className={styles.title_container}>
                        <p>result</p>
                        <div className={styles.title_divider}/>
                    </div>

                    {/* Result text */}
                    <p className={styles.result_text}>
                        Aided in the implementation of SQL query pipelines 
                        across various tables to extract key insights for 
                        the operation of multi-regional commercial banking 
                        applications
                    </p>
                </div>
            </div>
        </div>
    )
}
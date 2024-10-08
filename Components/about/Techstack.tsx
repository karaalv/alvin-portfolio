/*** About Tech Stack Section ***/

/* Imports */

// Section Styles.
import styles from '@/styles/about/Tech.module.css'

// Font styles
import fonts from '@/styles/Typography.module.css'

/**
 * @returns About tech stack section
 */
export default function AboutTech(){
    return(
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <p className={styles.tech_title}>Tech Stack.</p>

            <div className={styles.tech_container}>

                {/* Programming Languages */}
                <div className={styles.tech_list}>
                    {/* Heading */}
                    <p 
                        className={styles.tech_heading}
                        style={{
                            marginBottom: '0%'
                        }}
                    >
                        Languages
                    </p>
                    {/* List */}
                    <ul>
                        <li>TypeScript</li>
                        <li>JavaScript</li>
                        <li>Python</li>
                        <li>C/C++</li>
                        <li>Java</li>
                        <li>MATLAB</li>
                        <li>R</li>
                    </ul>
                </div>

                {/* Frameworks */}
                <div className={styles.tech_list}>
                    {/* Heading */}
                    <p 
                        className={styles.tech_heading}
                        style={{
                            marginBottom: '0%'
                        }}
                    >
                        Frameworks
                    </p>
                    {/* List */}
                    <ul>
                        <li>Node.js</li>
                        <li>React</li>
                        <li>React Native</li>
                        <li>Express.js</li>
                        <li>Next.js</li>
                        <li>Numpy</li>
                        <li>Jest.js</li>
                    </ul>
                </div>

                {/* Development Tools */}
                <div className={styles.tech_list}>
                    {/* Heading */}
                    <p 
                        className={styles.tech_heading}
                        style={{
                            marginBottom: '0%'
                        }}
                    >
                        Development Tools
                    </p>
                    {/* List */}
                    <ul>
                        <li>MongoDB</li>
                        <li>Postman</li>
                        <li>Figma</li>
                        <li>MySQL</li>
                        <li>Docker</li>
                        <li>Blender</li>
                        <li>AWS</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}
/**
 * @description Gatsby project component
 */
import Image from 'next/image'
import { Link } from 'lucide-react'
import { useResponsiveContext } from '@/contexts/ResponsiveContext'

// Styles
import common from '@styles/projects/Common.module.css'
import styles from '@styles/projects/Gatsby.module.css'

/**
 * @returns Gatsby Carousel Card
 */
export default function Gatsby(){
    const { isMobile } = useResponsiveContext()
    
    const appSize = isMobile ? '300' : '500'
    const iconSize = isMobile ? '125' : '250'

    const renderTitle = () => {
        return (
            <div className={styles.glass_container}>
                <div className={common.title_container}>
                    <Link
                        className={common.link_icon}
                    />
                    <a 
                        className={common.text}
                        href='https://github.com/karaalv/Gatsby-Public'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Gatsby.
                    </a>
                </div>
            </div>
        )
    }

    const renderIcon = () => {
        return (
            <div className={styles.glass_container}>
                <Image 
                    src='/assets/gatsby_icon.png' 
                    alt='Photo of app'
                    className={styles.icon_image}
                    width={iconSize}
                    height={iconSize}
                />
            </div>
        )
    }

    const renderImage = () => {
        return (
            <div className={styles.glass_container}>
                <Image 
                    src='/assets/gatsby.png' 
                    alt='Photo of app'
                    className={styles.app_image}
                    width={appSize}
                    height={appSize}
                />
            </div>
        )
    }

    return(
        <div className={common.project_container}>

            {/* Col 1 */}
            <div className={styles.col_1}>
                {renderImage()}
            </div>

            {/* Col 2 */}
            <div className={styles.col_2}>
                {renderTitle()}
                {renderIcon()}
            </div>

            {/* Col 3 */}
            <div className={styles.col_3}>
                <div className={styles.glass_container}>
                    <p className={common.text}>
                        Blockchain Ticket System
                    </p>
                </div>
                <div className={styles.glass_container}>
                    <p className={common.text}>
                        Typescript Solidity
                    </p>
                </div>
            </div>
        </div>
    )
}
/**
 * @description This component renders a project
 * item with an image and description.
 */

import Image from "next/image"
import { useResponsiveContext } from "@contexts/ResponsiveContext";

import styles from "@styles/main-page/projects/ProjectItem.module.css"

export interface ProjectItemProps {
    imageSrc: string;
    header: string;
    techStack: string;
    description: string;
    link: string;
}

export default function ProjectItem({
    imageSrc,
    header,
    techStack,
    description,
    link
}: ProjectItemProps) {
    const { isMobile } = useResponsiveContext();
    const imageSize = isMobile ? '250' : '300';

    return (
        <a 
            className={styles.container}
            href={link}
            target='_blank'
            rel='noopener noreferrer'
        >
            <Image
                src={imageSrc}
                alt={`${header} screenshot`}
                className={styles.project_image}
                width={imageSize}
                height={imageSize}
            />

            <div className={styles.text_container}>
                <div className={styles.header_container}>
                    <p className={styles.header_text}>{header}</p>
                    <p className={styles.tech_text}>{techStack}</p>
                </div>
                <p className={styles.description_text}>{description}</p>
            </div>
        </a>
    )
}
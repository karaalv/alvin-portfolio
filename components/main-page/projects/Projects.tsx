/**
 * @description Projects component that contains
 * a carousel of projects for the portfolio.
 */

import ProjectItem, { ProjectItemProps } from '@components/main-page/projects/ProjectItem'
import Spacing from '@components/common/Spacing'

import styles from '@styles/projects/Projects.module.css'
import fonts from '@/styles/common/Typography.module.css'


export default function Projects(){

    const agentProject: ProjectItemProps = {
        imageSrc: '/assets/agent.png',
        header: 'RAG based portfolio agent',
        techStack: 'Python, AWS',
        description: (
            'RAG-based chat agent that uses personal data to ' +
            'answer questions and generate tailored CVs using a ' +
            'retrieval-augmented pipeline'
        ),
        link: 'https://github.com/username/Portfolio-Agent'
    }

    const gatsbyProject: ProjectItemProps = {
        imageSrc: '/assets/gatsby.png',
        header: 'Blockchain ticketing platform',
        techStack: 'Typescript, React Native, Solidity',
        description: (
            'Ticket distribution mobile platform ' +
            'leveraging blockchain technology to ' +
            'facilitate a unique ticket authentication ' +
            'algorithm for enhanced security'
        ),
        link: 'https://github.com/karaalv/Gatsby-Public'
    }

    const racingProject: ProjectItemProps = {
        imageSrc: '/assets/racing.png',
        header: 'Co-Chief Electrical Systems Engineer',
        techStack: 'PCB Design, Electrical Engineering',
        description: (
            'Research and development of electronics onto a ' +
            'third-generation electrical race vehicle, 9th overall in ' +
            'Electrical Vehicle class at Formula Student UK 2024'
        ),
        link: 'https://www.linkedin.com/feed/update/urn:li:activity:7227297553308897282/'
    }

    return(
        <section
            id='Projects'
            className={styles.section}
        >   
            <p className={fonts.heading}>Projects</p>
            <Spacing size='small'/>
            <div className={styles.container}>
                <ProjectItem {...agentProject} />
                <ProjectItem {...gatsbyProject} />
                <ProjectItem {...racingProject} />
            </div>
        </section>
    )
}
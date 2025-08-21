/**
 * @description This component wraps together
 * the experience section of the portfolio.
 */
import ExperienceItem from '@components/main-page/experience/ExperienceItem'
import Spacing from '@components/common/Spacing'

// Styles.
import fonts from '@styles/common/Typography.module.css'

/**
 * Wraps together:
 * - Tracom
 * - Warwick Racing
 * Fintech
 * 
 * @returns Experience section
 */
export default function Experience(){
    const Tracom = {
        company: 'Tracom Services Ltd.',
        date: 'Aug 2023 - Sept 2023',
        role: 'Machine Learning Research and Development Intern',
        description: [
            (
                "Built internal AI tools with LangChain, GPT-3, and " +
                "Pinecone to summarise reports, meetings, and technical " +
                "documents, saving 5+ hours weekly and accelerating " +
                "research by 10x"
            ),
            (
                "Deployed NLP summarisation models using JavaScript and " +
                "AWS S3 to turn 20-50 page documents into 1-2 page " +
                "insights for business and sales use"
            )
        ]
    }

    const Fintech = {
        company: 'Fintech Transformative Technology',
        date: 'Jul 2022 - Aug 2022',
        role: 'Back-end Development Intern',
        description: [
            (
                "Designed and implemented PostgreSQL query " +
                "pipelines to extract insights from multi-" +
                "regional banking systems while maintaining " +
                "backend services and evaluating REST vs SOAP " +
                "APIs; used Postman for testing and validation " +
                "of API endpoints"
            ),
            
            (
                "Built a custom Complex Number class in Java " +
                "using Euler forms to support advanced " +
                "mathematical tooling and analytical " +
                "extensions"
            )
        ]
    }

    return(
        <section
            id='Experience'
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                paddingTop: '6rem',
            }}
        >
            <p 
                className={fonts.heading}
            >
                Experience
            </p>
            <Spacing size='medium'/>
            <ExperienceItem
                company={Tracom.company}
                date={Tracom.date}
                role={Tracom.role}
                description={Tracom.description}
            />
            <ExperienceItem
                company={Fintech.company}
                date={Fintech.date}
                role={Fintech.role}
                description={Fintech.description}
            />
        </section>
    )
}
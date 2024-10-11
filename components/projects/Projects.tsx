/*** Projects Section ***/

/* Imports */
import ProjectsTitle from "./Title";
import Gatsby from "./Gatsby";
import ML from "./ML";
import Getaway from "./Getaway";

/**
 * Contains carousel for:
 * - Gatsby
 * - ML project
 * - Getaway
 * 
 * @returns Projects Carousel
 */
export default function Projects(){
    return(
        <section
            id='Projects'
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}
        >   
            <ProjectsTitle/>
            <Gatsby/>
            <div style={{marginTop: '1%'}}/>
            <ML/>
            <div style={{marginTop: '1%'}}/>
            <Getaway/>
        </section>
    )
}
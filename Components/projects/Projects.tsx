/*** Projects Section ***/

/* Imports */
import Spacing from "../Spacing";

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
        <div
            id='Projects'
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}
        >   
            <ProjectsTitle/>
            <Spacing size='Small'/>
            <ML/>
            <Getaway/>
            <Gatsby/>
        </div>
    )
}
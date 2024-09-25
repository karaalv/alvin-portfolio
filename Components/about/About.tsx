/*** About section ***/

/* Imports */
import AboutHero from "./AboutHero";
import AboutTech from "./Techstack";

import Spacing from "../Spacing";

/**
 * Wraps together:
 * - About Hero Component
 * - About Tech Component
 * 
 * @returns About section
 */
export default function About(){
    return(
        <div 
            id='About'
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}
        >
            <AboutHero/>
            <Spacing size='Small'/>
            <AboutTech/>
        </div>
    )
}
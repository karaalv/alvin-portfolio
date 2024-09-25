/*** Experience Section ***/

/* Imports */

import ExperienceTitle from "./Title"
import Tracom from "./Tracom"
import Racing from "./Racing"

import Spacing from "../Spacing"

/**
 * Wraps together:
 * - Tracom
 * - Warwick Racing
 * Fintech
 * 
 * @returns Experience section
 */
export default function Experience(){
    return(
        <div
            id='Experience'
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}
        >
            <ExperienceTitle/>
            <Tracom/>
            <Spacing size='Large'/>
            <Racing/>
        </div>
    )
}
/*** Experience Section ***/

/* Imports */

import ExperienceTitle from "./Title"
import Tracom from "./Tracom"
import Racing from "./Racing"

import Spacing from "../Spacing"
import Fintech from "./Fintech"
import { useEffect, useRef, useState } from "react"

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
        <section
            id='Experience'
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}
        >
            <ExperienceTitle/>
            <Tracom/>
            <Spacing size='Small'/>
            <div style={{margin: '1rem'}}/>
            <Racing/>
            <Spacing size='Small'/>
            <Fintech/>
            <Spacing size='Small'/>
        </section>
    )
}
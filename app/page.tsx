/*** Main Webpage Handler ***/

/* Imports */

// Styles
import styles from '@/styles/Typography.module.css'

// Navbar.
import Navbar from '@/Components/Navbar'

// Sections.
import About from "@/Components/About"

// Main hander for section components.
export default function MainPage(){
    return(
        <div>
            <Navbar/>
        </div>
    )
}
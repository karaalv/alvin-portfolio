/**
 * @description This component is a wrapper
 * for the About section of the portfolio.
 * It includes the About Hero component.
 */
import AboutHero from "./AboutHero";

/**
 * @returns About section
 */
export default function About(){
    return(
        <section 
            id='About'
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <AboutHero/>
        </section>
    )
}
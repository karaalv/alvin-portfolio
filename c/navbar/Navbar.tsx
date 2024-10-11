/*** NAVBAR WRAPPER ***/

/* Imports */
import { useResponsiveContext } from "../ResponsiveContext"
import { NavBarProps } from "@/t/ComponentProps"
import NavbarDesktop from "./NavbarDesktop"
import NavbarMobile from "./NavbarMobile"

/**
 * Wraps together:
 * - Mobile navbar
 * - Desktop navbar
 * 
 * Uses responsive context to switch.
 * 
 * @returns Navbar
 */
export default function Navbar({isActive, currentSection}: NavBarProps){
    const {isMobile} = useResponsiveContext()

    return(
        <div>
            {
                isMobile?
                    <NavbarMobile isActive={!isActive} currentSection={currentSection}/>
                :
                    <NavbarDesktop isActive={!isActive} currentSection={currentSection}/>
            }
        </div>
    )
}
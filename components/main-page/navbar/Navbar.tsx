/**
 * @description Wraps together:
 * - Mobile navbar
 * - Desktop navbar
 * Uses responsive context to switch.
 */

/* Imports */
import { useResponsiveContext } from "@contexts/ResponsiveContext"
import { NavBarProps } from "@/types/ComponentProps"
import NavbarDesktop from "@components/main-page/navbar/NavbarDesktop"
import NavbarMobile from "@components/main-page/navbar/NavbarMobile"

/**
 * @returns Navbar
 */
export default function Navbar(
    {isActive, currentSection}: NavBarProps
){
    const {isMobile} = useResponsiveContext()

    return(
        <>
            {
                isMobile?
                    <NavbarMobile 
                        isActive={!isActive} 
                        currentSection={currentSection}
                    />
                :
                    <NavbarDesktop 
                        isActive={!isActive} 
                        currentSection={currentSection}
                    />
            }
        </>
    )
}
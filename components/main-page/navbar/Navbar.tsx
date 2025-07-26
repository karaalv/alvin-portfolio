/**
 * @description Wraps together:
 * - Mobile navbar
 * - Desktop navbar
 * Uses responsive context to switch.
 */

import { useResponsiveContext } from "@contexts/ResponsiveContext"
import { NavBarProps } from "@/types/components.types"
import NavbarDesktop from "@components/main-page/navbar/NavbarDesktop"
import NavbarMobile from "@components/main-page/navbar/NavbarMobile"

/**
 * @returns Navbar
 */
export default function Navbar(
    {isActive}: NavBarProps
){
    const {isMobile} = useResponsiveContext()

    return(
        <>
            {
                isMobile?
                    <NavbarMobile 
                        isActive={!isActive} 
                    />
                :
                    <NavbarDesktop 
                        isActive={!isActive} 
                    />
            }
        </>
    )
}
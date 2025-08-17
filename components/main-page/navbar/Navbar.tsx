/**
 * @description Wraps together:
 * - Mobile navbar
 * - Desktop navbar
 * Uses responsive context to switch.
 */
import { useAppContext } from "@/contexts/AppContext"
import { NavBarProps } from "@/types/components.types"
import NavbarDesktop from "@components/main-page/navbar/NavbarDesktop"
import NavbarMobile from "@components/main-page/navbar/NavbarMobile"

/**
 * @returns Navbar
 */
export default function Navbar(
    {isActive}: NavBarProps
){
    const {isMobile} = useAppContext()

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
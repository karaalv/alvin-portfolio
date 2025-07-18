/**
 * @description Component props for various
 * components in the application.
 */

import { NavbarStates } from "@/types/StyleTypes"

// Navbar.
export interface NavBarProps {
    isActive: boolean
    currentSection: NavbarStates
}
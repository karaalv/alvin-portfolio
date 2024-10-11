/*** Component Prop Types ***/

import { NavbarStates } from "./StyleTypes"

// Navbar.
export interface NavBarProps {
    isActive: boolean
    currentSection: NavbarStates
}

// Section spacing.
export interface SpacingProps {
    size: 'Small' | 'Large'
}
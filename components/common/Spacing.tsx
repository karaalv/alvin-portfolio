/**
 * @description Component to add spacing
 * between sections.
 */

import { useResponsiveContext } from "@/contexts/ResponsiveContext"

interface SpacingProps {
    size: 'small' | 'medium' | 'large'
}

/**
 * @returns Component to space sections.
 */
export default function Spacing({size}: SpacingProps){
    const { isMobile } = useResponsiveContext()
    let margin = ''
    if(size === 'large'){
        margin = isMobile ? '5rem' : '12.5rem'
    }else if(size === 'medium'){
        margin = isMobile ? '3.5rem' : '7.5rem'
    }else{
        margin = isMobile ? '2rem' : '5rem'
    }
    return(
        <div style={{
            marginTop: margin,
            marginBottom: margin,
        }}/>
    )
}
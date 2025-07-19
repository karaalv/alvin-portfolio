/**
 * @description Component to add spacing
 * between sections.
 */

interface SpacingProps {
    size: 'small' | 'medium' | 'large'
}

/**
 * @returns Component to space sections.
 */
export default function Spacing({size}: SpacingProps){
    let margin = ''
    if(size === 'large'){
        margin = '10%'
    }else if(size === 'medium'){
        margin = '5%'
    }else{
        margin = '2.5%'
    }
    return(
        <div style={{
            marginTop: margin,
            marginBottom: margin,
        }}/>
    )
}
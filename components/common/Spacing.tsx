/**
 * @description Component to add spacing
 * between sections.
 */

interface SpacingProps {
    size: 'small' | 'large'
}

/**
 * @returns Component to space sections.
 */
export default function Spacing({size}: SpacingProps){
    return(
        <div style={{
            marginTop: size == 'large'? '10%':'5%',
            marginBottom: size == 'large'? '10%':'5%',
        }}/>
    )
}
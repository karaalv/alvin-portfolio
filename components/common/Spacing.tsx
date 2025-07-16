/**
 * @description Component to add spacing
 * between sections.
 */

// Types.
import { SpacingProps } from "@/types/ComponentProps"

/**
 * @returns Component to space sections.
 */
export default function Spacing({size}: SpacingProps){
    return(
        <div style={{
            marginTop: size == 'Large'? '10%':'5%',
            // marginBottom: size == 'Large'? '10%':'2.5%',
        }}></div>
    )
}
/*** Section Spacing Component ***/

/* Imports */

// Types.
import { SpacingProps } from "@/t/ComponentProps"

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
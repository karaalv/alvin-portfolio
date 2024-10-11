/*** Responsive Context Wrapper ***/

/* Imports */
import { useContext, createContext, useState, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";


const ResponsiveContext = createContext<ResponsiveContextProps | undefined>(undefined)

interface ResponsiveContextProps {
    isMobile: boolean
}

/**
 * @returns Responsive Provider
 */
export default function ResponsiveProvider({children} : {children: ReactNode}){
    // Define mobile state.
    const [isMobile] = useState(useMediaQuery({query: '(max-width: 786px)'}))

    return(
        <ResponsiveContext.Provider value={{isMobile: isMobile}}>
            {children}
        </ResponsiveContext.Provider>
    )
}

export const useResponsiveContext = () => {
    const context = useContext(ResponsiveContext)
    if(!context){
        throw new Error('Requested responsive context outside of context provider')
    }
    return context
}


import React from "react";


export function Header({children, classN}) {
    return (

        <header className={classN}>
            
                {children}    
            
        </header>
    )



}
import React from "react";


export function Header({children, classN,flexDirection ,alignItems}) {
    return (

        <header className={classN} style={{flexDirection:flexDirection,alignItems: alignItems}}>
            
                {children}    
            
        </header>
    )



}
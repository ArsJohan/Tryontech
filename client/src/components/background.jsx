import React from "react";
import './background.css';

export function Background({elipseTop, elipseBottom,children}) {
    return (
        <div className="bk-container">
            <div className={elipseTop}></div>
            {children}
            <div className={elipseBottom}></div>


        </div>


    )


}


export default Background;
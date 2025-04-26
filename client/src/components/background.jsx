import React from "react";
import './background.css';

export function Background({elipseTop, elipseBottom,children, width, height}) {
    return (
        <div className="bk-container" style={{width: width, height: height}}>
            <div className={elipseTop}></div>
            {children}
            <div className={elipseBottom}></div>


        </div>


    )


}


export default Background;
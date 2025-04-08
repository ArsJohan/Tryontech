import React from "react";
import './background.css';

export function Background({elipseTop, elipseBottom,image}) {
    return (
        <div className="bk-container">
            <div className={elipseTop}></div>
            <img src={image} alt="Background" className="bk-image"/>
            <div className={elipseBottom}></div>


        </div>


    )


}


export default Background;
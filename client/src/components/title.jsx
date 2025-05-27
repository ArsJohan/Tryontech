import React from "react";
import "./title.css";

export function Title({content, subtitle,paddingLeft, paddingRight}) {
    return (
        <div className="sg-form-title-container" style={{paddingLeft: paddingLeft, paddingRight: paddingRight}}>
            <h1 className="sg-form-title">{content}</h1>
            <h2 className="sg-form-subtitle">{subtitle}</h2>
        </div>
    )
}

export default Title;
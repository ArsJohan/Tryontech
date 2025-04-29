import React from "react";
import "./title.css";

export function Title({content, subtitle}){
    return (
        <div className="sg-form-title-container">
            <h1 className="sg-form-title">{content}</h1>
            <h2 className="sg-form-subtitle">{subtitle}</h2>
        </div>
    )
}

export default Title;
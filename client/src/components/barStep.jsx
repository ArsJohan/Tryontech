import React from "react";
import './barstep.css';


export function Barstep({ step, children }) {
    return (    
        <div className="bs-container">
            <div className="bs-bar-step-container">
                <div className={`bs-bar-step ${step >= 1 ? "active" : ""}`}>
                    <div className="bs-circle-bar-step"></div>
                    <div className="bs-bar-step-label">Personal Information</div>
                </div>
                <div className={`bs-bar-line ${step==2 ? "active" : ""}`}></div>
                <div className={`bs-bar-step ${step == 2 ? "active" : ""}`}>
                    <div className="bs-circle-bar-step"></div>
                    <div className="bs-bar-step-label">Provide your body sizes</div>
                </div>

            </div>
            {children}
        </div>    
    )


}

export default Barstep;
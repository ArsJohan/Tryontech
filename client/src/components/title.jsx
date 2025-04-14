import React from "react";

export function Title({spaceLeft ,spaceRight, spaceTop, spaceBottom}) {
    return (
        <div className="title-container" style={{paddingLeft:spaceLeft, paddingRight:spaceRight, paddingTop:spaceTop , paddingBottom:spaceBottom}}>
            <div className="divider"></div>
            <h1 className="title">TryOnTech</h1>
            <div className="divider"></div>
        </div>
    )
}

export default Title;
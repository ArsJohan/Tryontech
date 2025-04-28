import React from "react";

export function Banner({spaceLeft ,spaceRight, spaceTop, spaceBottom}) {
    return (
        <div className="title-container" style={{paddingLeft:spaceLeft, paddingRight:spaceRight, paddingTop:spaceTop , paddingBottom:spaceBottom}}>
            <div className="divider-h"></div>
            <h1 className="title">TryOnTech</h1>
            <div className="divider-h"></div>
        </div>
    )
}

export default Banner;
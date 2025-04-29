import React from "react";
import './button.css';

export function Button({ className,text,width, position, zindex, right, onClick, disabled }) {
    return (
        <button className={className} onClick={onClick}  disabled= {disabled} style={{ width: width, position: position, zIndex:zindex, right:right }}>
            {text}
        </button>
    );
}

export default Button;
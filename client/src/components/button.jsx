import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import './button.css';

export function Button({ className,text, to, width, position, zindex, right }) {
    const navigate = useNavigate(); // Hook para navegar

    const handleClick = () => {
        navigate(to); // Navega a la ruta especificada
    };

    return (
        <button className={className} onClick={handleClick} style={{ width: width, position: position, zIndex:zindex, right:right }}>
            {text}
        </button>
    );
}

export default Button;
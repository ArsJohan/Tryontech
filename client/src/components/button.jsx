import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import './button.css';

export function Button({ className,text, to, width }) {
    const navigate = useNavigate(); // Hook para navegar

    const handleClick = () => {
        navigate(to); // Navega a la ruta especificada
    };

    return (
        <button className={className} onClick={handleClick} style={{ width: width, right: "None !important", position: "None"  }}>
            {text}
        </button>
    );
}

export default Button;
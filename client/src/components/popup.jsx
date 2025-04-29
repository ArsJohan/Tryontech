import React from 'react';
import './Popup.css'; // Archivo CSS para estilos
import errorIcon from '../assets/images/cancel.png'; // Asegúrate de tener un ícono en esta ruta

const Popup = ({ isVisible, message, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="popup-close" onClick={onClose}>X</button>
                <img src={errorIcon} alt="Error Icon" className="popup-icon" />
                <h2 className="popup-title">Oops!</h2>
                <p className="popup-message">{message}</p>
            </div>
        </div>
    );
};

export default Popup;
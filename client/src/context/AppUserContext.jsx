import React, { createContext, useState } from "react";

// Crea el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
    const [selectedSex, setSelectedSex] = useState(""); // Sexo seleccionado
    const [IdCliente, setIdCliente] = useState(null); // ID del cliente
    const [imageUrl, setImageUrl] = useState(""); // URL de la imagen
    const [bodyType, setBodyType] = useState(""); // Tipo de cuerpo
    const [sexo, setSexo] = useState(""); // Sexo del usuario

    return (
        <AppContext.Provider
            value={{
                selectedSex,
                setSelectedSex,
                IdCliente,
                setIdCliente,
                imageUrl,
                setImageUrl,
                bodyType,
                setBodyType,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
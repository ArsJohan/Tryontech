import React, { createContext, useState } from "react";

// Crea el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
    const [selectedSex, setSelectedSex] = useState(""); // Sexo seleccionado
    const [IdCliente, setIdCliente] = useState(null); // ID del cliente
    const [imageUrl, setImageUrl] = useState(""); // URL de la imagen
    const [code, setCode] = useState(""); // Código de verificación
    const [userId, setUserId] = useState(null); // ID del usuario
    const [token, setToken] = useState(""); // Token de autenticación

    return (
        <AppContext.Provider
            value={{
                selectedSex,
                setSelectedSex,
                IdCliente,
                setIdCliente,
                imageUrl,
                setImageUrl,
                code,
                setCode,
                userId,
                setUserId,
                token,
                setToken
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
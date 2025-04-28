import React, { createContext, useState } from "react";

// Crea el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
    const [selectedSex, setSelectedSex] = useState(""); // Sexo seleccionado
    const [IdCliente, setIdCliente] = useState(null); // Asegúrate de inicializarlo como `null`

    return (
        <AppContext.Provider
            value={{
                selectedSex,
                setSelectedSex,
                IdCliente,
                setIdCliente,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
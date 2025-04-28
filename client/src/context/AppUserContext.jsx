import React, { createContext, useState } from "react";

// Crea el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
    const [selectedSex, setSelectedSex] = useState(""); // Sexo seleccionado
    return (
        <AppContext.Provider
            value={{
                selectedSex,
                setSelectedSex,
              
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
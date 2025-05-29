import axios from "axios";

const API_BASE_URL = "http://localhost:5177/api"; // Cambia la URL base si es necesario

export async function iniciarSesion(data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/login/Ingresar`, data);
        return { success: true, ...response.data} ;
    } catch (error) {
        if (error.response && error.response.data) {
            return { success: false, ...error.response.data };
        }
        // Si no hay respuesta del servidor, retorna un mensaje genérico
        return {
            success: false,
            message: "Error al conectar con el servidor. Por favor, inténtalo de nuevo."
        };
    }
}
export async function verificarCodigo(data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/login/verifyCode`, data);
        return { success: true, ...response.data };
    } catch (error) {
        if (error.response && error.response.data) {
            return { success: false, ...error.response.data };
        }
        // Si no hay respuesta del servidor, retorna un mensaje genérico
        return {
            success: false,
            message: "Error al conectar con el servidor. Por favor, inténtalo de nuevo."
        };
    }
}

export async function cambiarContrasena(data, token) {
    try {
        const response = await axios.post(`${API_BASE_URL}/login/changePassword`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
        return { success: true, ...response.data };
    } catch (error) {
        if (error.response && error.response.data) {
            return { success: false, ...error.response.data };
        }
        // Si no hay respuesta del servidor, retorna un mensaje genérico
        return {
            success: false,
            message: "Error al conectar con el servidor. Por favor, inténtalo de nuevo."
        };
    }
}

export default iniciarSesion;
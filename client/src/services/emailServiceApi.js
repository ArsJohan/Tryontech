import axios from "axios";

const API_BASE_URL = "http://localhost:5177/api"; 

export async function enviarEmail(data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/account/requestCode`, data);
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

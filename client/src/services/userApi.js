import axios from 'axios';

const API_BASE_URL = 'http://localhost:5177/api'; //API base URL here

export async function crearCuenta(data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/profile/create`, data);
        return { success: true, ...response.data };
    } catch (error) {
        if (error.response && error.response.data) {
            return { success: false, ...error.response.data };
        }
        // Si no hay respuesta del servidor, retorna un mensaje genérico
        return {
            sucess: false,
            message: 'Error al conectar con el servidor. Por favor, inténtalo de nuevo.'
        };
    }
}

export async function obtenerIdCliente(correo) {
    try {
        const response = await axios.get(`${API_BASE_URL}/profile/getIdCliente?correo=${correo}`);
        // Si el backend retorna solo el número (ej: 5 o 0)
        const idCliente = response.data;
        if (idCliente && idCliente !== 0) {
            return { success: true, idCliente };
        } else {
            return { success: false, message: "No se encontró un ID de cliente válido." };
        }
    } catch (error) {
        if (error.response && error.response.data) {
            return { success: false, ...error.response.data };
        }
        return {
            sucess: false,
            message: 'Error al conectar con el servidor. Por favor, inténtalo de nuevo.'
        };
    }
}


export async function verificarEmail(data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/verifyEmail`, data);
        return { success: true, ...response.data };
    } catch (error) {
        if (error.response && error.response.data) {
            return { success: false, ...error.response.data };
        }
        // Si no hay respuesta del servidor, retorna un mensaje genérico
        return {
            exists: false,
            message: 'Error al conectar con el servidor. Por favor, inténtalo de nuevo.'
        };
    }
    
}

export async function verificarTelefono(data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/verifyPhone`,  data );
        return { exists: true, ...response.data };
    } catch (error) {
        console.log(error.response.data);
        if (error.response && error.response.data) {
            
            return { exists: false, ...error.response.data };
        }
        // Si no hay respuesta del servidor, retorna un mensaje genérico
        return {
            exists: false,
            message: 'Error al conectar con el servidor. Por favor, inténtalo de nuevo.'
        };
    }
}



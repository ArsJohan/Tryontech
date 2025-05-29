import axios from 'axios';

const API_BASE_URL = 'http://localhost:5177/api'; //API base URL here

export async function crearTallaje(data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/TallajeCliente/Insertar`, data);
        return { success:true, ...response.data };
    } catch (error) {
        if (error.response && error.response.data) {
            return {sucess: false, ...error.response.data };
        }
        // Si no hay respuesta del servidor, retorna un mensaje genérico
        return {
            sucess: false,
            message: 'Error al conectar con el servidor. Por favor, inténtalo de nuevo.'
        };
    }
}

export async function calcularTipoCuerpo(data, IdCliente){
    try{
        const response = await axios.post(`${API_BASE_URL}/TallajeCliente/CalcularTipoCuerpo?IdCliente=${IdCliente}`, data);
        // Si el backend retorna solo un string, lo ponemos como tipoCuerpo
        return { success: true, tipoCuerpo: response.data };
    } catch (error) {
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data };
        }
        return {
            success: false,
            message: 'Error al conectar con el servidor. Por favor, inténtalo de nuevo.'
        };
    }
}

export default crearTallaje;
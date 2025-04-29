import axios from 'axios';

const API_BASE_URL = 'http://localhost:5177/api'; //API base URL here

export async function crearTallaje(data) {
  try {
      const response = await axios.post(`${API_BASE_URL}/TallajeCliente/Insertar`, data);
      return response.data; // Retorna los datos de la respuesta si es exitosa
  } catch (error) {

      if (error.response) {
          throw error.response.data; // Lanza el mensaje de error del backend
      }

      // Si no hay respuesta del servidor, lanza un mensaje genérico
      throw new Error('Error al conectar con el servidor. Por favor, inténtalo de nuevo.');
  }
}


export default crearTallaje;
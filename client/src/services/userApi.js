import axios from 'axios';

const API_BASE_URL = 'http://localhost:5177/api'; //API base URL here

export async function crearCuenta( data) {
  console.log('Data:', data); // Log the data to see what is being sent
  try {
    const response = await axios.post(`${API_BASE_URL}/profile/create`,data);

    console.log(response.data);
  } catch (error) {
    console.error('Error creando cuenta', error);
  }
}

export default crearCuenta;
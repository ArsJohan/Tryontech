using TryontechWebAPI.Models; 

namespace TryontechWebAPI.Clases
{
    public class clsCliente
    {
        private TryontechContext DBTryOnTech = new TryontechContext();
        public Cliente cliente { get; set; }

        //Modificado para testear
        public string InsertarCliente(DateOnly fechaNacimiento, string sexo, Usuario usuario)
        {
            try
            {
                // Validar la edad del cliente
                if (!ValidarEdad(fechaNacimiento))
                {
                    // Si la edad no es válida, eliminar el usuario creado previamente
                    if (usuario != null)
                    {
                        DBTryOnTech.Usuarios.Remove(usuario);
                        DBTryOnTech.SaveChanges();
                    }

                    return "La edad no es válida. Debe ser mayor de 18 años y menor de 100 años.";
                }

                // Crear el cliente asociado al usuario
                cliente = new Cliente
                {
                    FechaNacimiento = fechaNacimiento,
                    Sexo = sexo,
                    IdUsuario = usuario.Id,
                    IdModelo = 1 // Se asigna un modelo por defecto
                };

                DBTryOnTech.Clientes.Add(cliente);
                DBTryOnTech.SaveChanges();

                return "Cliente ingresado correctamente";
            }
            catch (Exception ex)
            {
                // Si ocurre un error, eliminar el usuario creado previamente
                if (usuario != null)
                {
                    DBTryOnTech.Usuarios.Remove(usuario);
                    DBTryOnTech.SaveChanges();
                }

                return "Error al insertar el cliente: " + ex.Message;
            }
        }


        public static bool ValidarEdad(DateOnly fechaNacimiento)
        {
            DateOnly hoy = DateOnly.FromDateTime(DateTime.Today);
            int edad = hoy.Year - fechaNacimiento.Year;

            // Ajustar si aún no ha cumplido años este año
            if (fechaNacimiento > hoy.AddYears(-edad))
            {
                edad--;
            }

            return edad >= 18 && edad <= 100;
        }
        public Cliente ConsultarCliente(int Id)
        {
            try
            {
                var cliente = DBTryOnTech.Clientes.FirstOrDefault(p => p.Id == Id); // Se verifica que existe en la base de datos
                return cliente;
            }
            catch 
            {
                return null; // Si no existe, se retorna null
            }

        }

        // metodo para asignar un modelo a un cliente
        public string AsignarModelo(int idCliente, int idModelo)
        {
            try
            {
                cliente = DBTryOnTech.Clientes.FirstOrDefault(p => p.Id == idCliente);
                if (cliente != null)
                {
                    cliente.IdModelo = idModelo;
                    DBTryOnTech.SaveChanges();
                    return "Modelo asignado correctamente";
                }
                else
                {
                    return "Cliente no encontrado";
                }
            }
            catch (Exception ex)
            {
                return "Error al asignar el modelo: " + ex.Message;
            }
        }

        // Método para consultar el cliente por correo
        public Cliente ConsultarClienteXCorreo(string correo)
        {
            try
            {
                var usuario = DBTryOnTech.Usuarios.FirstOrDefault(u => u.Correo == correo); // Se busca el usuario por correo
                if (usuario != null)
                {
                    cliente = DBTryOnTech.Clientes.FirstOrDefault(c => c.IdUsuario == usuario.Id); // Se busca el cliente por el IdUsuario
                    return cliente;
                }
                else
                {
                    return null; // Usuario no encontrado
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al consultar el cliente por correo: " + ex.Message);
            }
        }

        // Método para consultar el IdCliente por correo
        public int ConsultarIdClienteXCorreo(string correo)
        {
            try
            {
                var usuario = DBTryOnTech.Usuarios.FirstOrDefault(u => u.Correo == correo); // Se busca el usuario por correo
                if (usuario != null)
                {
                    cliente = DBTryOnTech.Clientes.FirstOrDefault(c => c.IdUsuario == usuario.Id); // Se busca el cliente por el IdUsuario
                    return cliente.Id; // Se retorna el IdCliente
                }
                else
                {
                    return 0; // Usuario no encontrado
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al consultar el cliente por correo: " + ex.Message);
            }
        }
    }
}

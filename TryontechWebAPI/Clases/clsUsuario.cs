using Microsoft.Identity.Client;
using TryontechWebAPI.Models;

namespace TryontechWebAPI.Clases
{
    public class clsUsuario
    {
        private TryontechContext DBTryOnTech = new TryontechContext(); // instancia de la base de datos
        public Usuario usuario { get; set; }
        public Usuario CrearUsuario(string username, string password, string telefono, string correo)
        {
            if (ValidarUsername(username)) // validar que el usuario no exista
            {
                throw new Exception("El usuario ya está registrado");
            }
            if (ValidarTelefono(telefono)) // validar que el telefono no exista
            {
                throw new Exception("El teléfono ya está registrado");
            }
            if (ValidarCorreo(correo)) // validar que el correo no exista
            {
                throw new Exception("El correo ya está registrado");
            }
            try
            {
                clsCypher cypher = new clsCypher(); // instancia de la clase clsCypher
                cypher.Password = password;
                if (cypher.CifrarClave()) // cifrar la contraseña
                {
                    usuario = new Usuario
                    {
                        Username = username,
                        Password = cypher.PasswordCifrado, // contraseña cifrada
                        Telefono = telefono,
                        Correo = correo,
                        Rol = "Cliente",
                        Estado = true,
                        Salt = cypher.Salt // salt utilizado para cifrar la contraseña
                    };

                    DBTryOnTech.Usuarios.Add(usuario);
                    DBTryOnTech.SaveChanges();
                    return usuario;
                }
                else
                {
                    throw new Exception("Error al cifrar la contraseña");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al crear el usuario: " + ex.Message);
            }

        }

        // Validar que el usuario no exista
        public bool ValidarUsername(string username)
        {
            try
            {
                var usuarioExistente = DBTryOnTech.Usuarios.FirstOrDefault(u => u.Username == username);
                return usuarioExistente != null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al validar el usuario: " + ex.Message);
            }
        }

        // Validar que el telefono no exista
        public bool ValidarTelefono(string telefono)
        {
            try
            {
                var telefonoExistente = DBTryOnTech.Usuarios.FirstOrDefault(u => u.Telefono == telefono);
                return telefonoExistente != null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al validar el teléfono: " + ex.Message);
            }
        }

        // Validar que el correo no exista
        public bool ValidarCorreo(string correo)
        {
            try
            {
                var correoExistente = DBTryOnTech.Usuarios.FirstOrDefault(u => u.Correo == correo);
                return correoExistente != null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al validar el correo: " + ex.Message);
            }
        }

        // método para eliminar usuario
        public string EliminarUsuario(int idUsuario)
        {
            try
            {
                usuario = DBTryOnTech.Usuarios.FirstOrDefault(u => u.Id == idUsuario);
                if (usuario != null) // si el usuario existe
                {
                    DBTryOnTech.Usuarios.Remove(usuario);
                    DBTryOnTech.SaveChanges();
                    return "Usuario eliminado correctamente";
                }
                else
                {
                    return "Usuario no encontrado";
                }
            }
            catch (Exception ex)
            {
                return "Error al eliminar el usuario: " + ex.Message;
            }
        }
    }
}

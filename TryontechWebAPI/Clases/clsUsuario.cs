using Microsoft.EntityFrameworkCore;
using TryontechWebAPI.Models;

namespace TryontechWebAPI.Clases
{
    public class clsUsuario
    {
        // Modificado por Santi para cumplir con la inyección de dependencias
        private readonly TryontechContext DBTryOnTech; // contexto de la base de datos 
        public clsUsuario(TryontechContext dbContext)
        {
            DBTryOnTech = dbContext;
        }

        // Agregado por santi para la verificación del código de usuario
        public Usuario? GetUserByCode(string code)
        {
            return DBTryOnTech.Usuarios.FirstOrDefault(u => u.Code == code);
        }
        // Agregado por Santi para actualizar un usuario (para contraseña)
        public void ActualizarUsuario(Usuario usuario)
        {
            DBTryOnTech.Usuarios.Update(usuario);
            DBTryOnTech.SaveChanges();
        }
        // fin de la modificación
        public Usuario usuario { get; set; }
        public Usuario CrearUsuario(string username, string password, string telefono, string correo)
        {
            if (ValidarUsername(username)) // validar que el usuario no exista
            {
                throw new Exception("Username is already in use");
            }
            if (ValidarTelefono(telefono)) // validar que el telefono no exista
            {
                throw new Exception("Phone Number is already registered");
            }
            if (ValidarCorreo(correo)) // validar que el correo no exista
            {
                throw new Exception("Email is already registered");
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
                    throw new Exception("Error encrypting the password");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Couldn’t save user details:: " + ex.Message);
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
                throw new Exception("Error validating the user: " + ex.Message);
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
                throw new Exception("Error validating phone number " + ex.Message);
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
                throw new Exception("Error validating email: " + ex.Message);
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
                    return "User deleted successfully";
                }
                else
                {
                    return "User not found";
                }
            }
            catch (Exception ex)
            {
                return "Error deleting user: " + ex.Message;
            }
        }

        // Añadido por Santi

        // Método para validar las credenciales de un usuario
        public bool ValidarCredenciales(string correo, string password, out Usuario usuario)
        {
            usuario = DBTryOnTech.Usuarios.FirstOrDefault(u => u.Correo == correo);
            if (usuario == null)
            {
                return false; // Usuario no encontrado
            }

            var passwordHasher = new clsCypher();
            return passwordHasher.VerifyPassword(password, usuario.Password, usuario.Salt);
        }


        // Método para obtener un usuario por su ID
        public Usuario? ObtenerUsuarioPorId(int id)
        {
            return DBTryOnTech.Usuarios.FirstOrDefault(u => u.Id == id);
        }

        // fin de la parte añadida

      

    }
}


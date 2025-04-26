using System;
using System.Linq;
using TryontechWebAPI.Models;

namespace TryontechWebAPI.Clases
{
    public class clsUsuario
    {
        private readonly TryontechContext _dbContext;

        public clsUsuario(TryontechContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Método para validar las credenciales de un usuario
        public bool ValidarCredenciales(string username, string password, out Usuario usuario)
        {
            usuario = _dbContext.Usuarios.FirstOrDefault(u => u.Username == username);
            if (usuario == null)
            {
                return false; // Usuario no encontrado
            }

            var passwordHasher = new PasswordHasher();
            return passwordHasher.VerifyPassword(password, usuario.Password, usuario.Salt);
        }

        // Método para obtener un usuario por su ID
        public Usuario? ObtenerUsuarioPorId(int id)
        {
            return _dbContext.Usuarios.FirstOrDefault(u => u.Id == id);
        }
    }
}



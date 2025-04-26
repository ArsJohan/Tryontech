using System;
using System.Security.Cryptography;
using System.Text;

namespace TryontechWebAPI.Clases
{
    public class PasswordHasher
    {
        public string Password { get; set; } = string.Empty;
        public string PasswordHashed { get; private set; } = string.Empty;
        public string Salt { get; private set; } = string.Empty;

        // Generar un hash de la contraseña con un salt
        public bool HashPassword()
        {
            try
            {
                // Generar un salt aleatorio
                byte[] saltBytes = new byte[16];
                using (var rng = RandomNumberGenerator.Create())
                {
                    rng.GetBytes(saltBytes);
                }
                Salt = Convert.ToBase64String(saltBytes);

                // Combinar la contraseña con el salt y generar el hash
                using (var sha256 = SHA256.Create())
                {
                    byte[] passwordBytes = Encoding.UTF8.GetBytes(Password + Salt);
                    byte[] hashBytes = sha256.ComputeHash(passwordBytes);
                    PasswordHashed = Convert.ToBase64String(hashBytes);
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        // Validar una contraseña ingresada contra un hash almacenado
        public bool VerifyPassword(string passwordToVerify, string storedHash, string storedSalt)
        {
            try
            {
                using (var sha256 = SHA256.Create())
                {
                    byte[] passwordBytes = Encoding.UTF8.GetBytes(passwordToVerify + storedSalt);
                    byte[] hashBytes = sha256.ComputeHash(passwordBytes);
                    string computedHash = Convert.ToBase64String(hashBytes);

                    return computedHash == storedHash;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}


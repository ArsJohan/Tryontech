using System;
using System.Security.Cryptography;
using System.Text;

namespace TryontechWebAPI.Clases
{
    public class clsCypher
    {
        public string Password { get; set; }
        public string PasswordCifrado { get; set; }
        public string Salt { get; set; }

        // Configuración de seguridad
        private const int SaltSize = 16; // 128 bits
        private const int HashSize = 32; // 256 bits
        private const int Iterations = 600000;

        // Método para cifrar la contraseña 
        public bool CifrarClave()
        {
            byte[] saltBytes = GenerateSalt();
            PasswordCifrado = HashPassword(Password, saltBytes);
            Salt = Convert.ToBase64String(saltBytes);
            return true;
        }

        // Hashing de contraseña seguro con un salt
        private string HashPassword(string password, byte[] salt)
        {
            using var pbkdf2 = new Rfc2898DeriveBytes(
                password: password,
                salt: salt,
                iterations: Iterations,
                hashAlgorithm: HashAlgorithmName.SHA256);

            byte[] hash = pbkdf2.GetBytes(HashSize);
            return Convert.ToBase64String(hash);
        }

        // Generación de salt aleatorio
        private static byte[] GenerateSalt()
        {
            return RandomNumberGenerator.GetBytes(SaltSize);// asigna numeros aleatorios a la variable salt
        }

        // Santi: Método para verificar una contraseña ingresada contra un hash almacenado
        public bool VerifyPassword(string passwordToVerify, string storedHash, string storedSalt)
        {
            try
            {
                byte[] saltBytes = Convert.FromBase64String(storedSalt);
                string computedHash = HashPassword(passwordToVerify, saltBytes);

                return computedHash == storedHash;
            }
            catch
            {
                return false;
            }
        }
    }
}

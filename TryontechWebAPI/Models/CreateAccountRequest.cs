namespace TryontechWebAPI.Models
{
    public class CreateAccountRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public DateOnly FechaNacimiento { get; set; }
        public string Sexo { get; set; }
    }
}


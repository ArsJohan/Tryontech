namespace TryontechWebAPI.Models
{
    public class EnviarCodigoRequestDTO
    {
        public int UsuarioId { get; set; }
        public string Telefono { get; set; } = null!;
    }
}

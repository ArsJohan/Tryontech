namespace TryontechWebAPI.Models
{
    public class AsignarModeloRequest
    {
        public int ClienteId { get; set; }
        public string TipoCuerpo { get; set; }
        public string Sexo { get; set; }
    }

    public class AsignarModeloResponse
    {
        public string ImagenUrl { get; set; }
        public string TipoCuerpo { get; set; }

        public string Sexo { get; set; }
    }
}

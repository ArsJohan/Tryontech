using TryontechWebAPI.Models;

namespace TryontechWebAPI.Factories
{
    public class ModeloFactoryFemenino : IModeloFactory
    {
        private readonly TryontechContext _context;
        private readonly string _baseUrl = "http://localhost:5177/uploads/modelos/";

        public ModeloFactoryFemenino(TryontechContext context)
        {
            _context = context;
        }

        public Modelo ObtenerModelo(string tipoCuerpo)
        {
            var modelo = _context.Modelos.FirstOrDefault(m =>
                m.Sexo == "Female" && m.TipoCuerpo == tipoCuerpo);

            if (modelo != null)
                modelo.Imagen = _baseUrl + modelo.Imagen;

            return modelo;
        }
    }
}

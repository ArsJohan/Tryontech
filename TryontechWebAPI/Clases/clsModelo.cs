using TryontechWebAPI.Factories;
using TryontechWebAPI.Models;

namespace TryontechWebAPI.Clases
{
    public class clsModelo
    {
        private readonly TryontechContext _context;

        public clsModelo(TryontechContext context)
        {
            _context = context;
        }

        public AsignarModeloResponse AsignarModelo(int clienteId, string tipoCuerpo, string sexo)
        {
            IModeloFactory factory = sexo == "Female"
                ? new ModeloFactoryFemenino(_context)
                : new ModeloFactoryMasculino(_context);

            var modelo = factory.ObtenerModelo(tipoCuerpo);
            if (modelo == null)
                throw new Exception("Modelo no encontrado.");

            var clienteService = new clsCliente();
            clienteService.AsignarModelo(clienteId, modelo.Id); // Ahora no retorna string

            return new AsignarModeloResponse
            {
                ImagenUrl = modelo.Imagen,
                TipoCuerpo = modelo.TipoCuerpo,
                Sexo = modelo.Sexo
            };
        }
    }
}

using TryontechWebAPI.Models;

namespace TryontechWebAPI.Factories
{
    public interface IModeloFactory
    {
        Modelo ObtenerModelo(string tipoCuerpo);
    }
}

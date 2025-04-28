using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TryontechWebAPI.Clases;
using TryontechWebAPI.Models;

namespace TryontechWebAPI.Controllers
{
    [ApiController]
    [Route("api/TallajeCliente")]
    //[Authorize]
    public class TallajeClienteController : Controller
    {
        [HttpGet]
        [Route("ConsultarTodos")]
        public List<TallajeCliente> ConsultarTodos()
        {
            clsTallajeCliente Tallajecliente = new clsTallajeCliente();
            return Tallajecliente.ConsultarTodos();
        }
        [HttpPost]
        [Route("Insertar")]
        public string Insertar([FromBody] TallajeCliente tallajecliente)
        {
            clsTallajeCliente Tallajecliente = new clsTallajeCliente();
            Tallajecliente.tallajeCliente = tallajecliente;
            return Tallajecliente.Insertar();
        }
        [HttpPut]
        [Route("Actualizar")]
        public string Actualizar([FromBody] TallajeCliente tallajecliente)
        {
            clsTallajeCliente Tallajecliente = new clsTallajeCliente();
            Tallajecliente.tallajeCliente = tallajecliente;
            return Tallajecliente.Actualizar();
        }
        [HttpDelete]
        [Route("Eliminar")]
        public string EliminarCodigo(int Id)
        {
            clsTallajeCliente Producto = new clsTallajeCliente();
            return Producto.Eliminar(Id);
        }
        [HttpGet]
        [Route("CalcularTipoCuerpo")]
        public string CalcularTipoCuerpo([FromBody] TallajeCliente tallajecliente)
        {
            clsTallajeCliente Tallajecliente = new clsTallajeCliente();
            Tallajecliente.tallajeCliente = tallajecliente;
            return Tallajecliente.CalcularTipoCuerpo();
        }
    }
    
}

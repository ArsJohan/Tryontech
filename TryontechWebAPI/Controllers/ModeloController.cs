using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TryontechWebAPI.Clases;
using TryontechWebAPI.Models;

namespace TryontechWebAPI.Controllers
{
    [ApiController]
    [Route("api/Modelo")]
    public class ModeloController : ControllerBase
    {
        private readonly TryontechContext _context;

        public ModeloController(TryontechContext context)
        {
            _context = context;
        }

        [HttpPost("AsignarModelo")]
        public IActionResult AsignarModelo([FromBody] AsignarModeloRequest request)
        {
            try
            {
                var modeloService = new clsModelo(_context);
                var resultado = modeloService.AsignarModelo(request.ClienteId, request.TipoCuerpo, request.Sexo);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocurrió un error al asignar el modelo. Por favor, verifica los datos enviados e inténtalo nuevamente. Detalle: " + ex.Message });
            }
        }
    }
}

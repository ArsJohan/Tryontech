using Microsoft.AspNetCore.Mvc;
using TryontechWebAPI.Clases;
using TryontechWebAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TryontechWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhoneController : ControllerBase
    {
        private readonly clsPhoneService _phoneServices;

        public PhoneController(clsPhoneService phoneService)
        {
            _phoneServices = phoneService;
        }

        // POST: api/Phone/enviarCodigo
        [HttpPost("enviarCodigo")]
        public async Task<IActionResult> EnviarCodigo([FromBody] EnviarCodigoRequestDTO request)
        {
            if (request == null || string.IsNullOrEmpty(request.Telefono) || request.UsuarioId <= 0)
                return BadRequest("Datos inválidos.");

            bool resultado = await _phoneServices.EnviarCodigoPorTelefonoAsync(request.UsuarioId, request.Telefono);

            if (resultado)
                return Ok(new { message = "Código enviado correctamente." });
            else
                return StatusCode(500, "Error al enviar el código.");
        }
    }
}

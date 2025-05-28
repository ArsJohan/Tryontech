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

        // POST: api/Phone/
        [HttpPost("requestCode")]
        public async Task<IActionResult> EnviarCodigo([FromBody] EnviarCodigoRequestDTO request)
        {
            if (request == null || string.IsNullOrEmpty(request.Telefono))
                return BadRequest(new { sucess = false, message = "Datos inválidos." });

            int? usuarioId = await _phoneServices.EnviarCodigoPorTelefonoAsync(request.Telefono);

            if (usuarioId != null)
                return Ok(new { sucess=true,message = "Código enviado correctamente.", userId = usuarioId });
            else
                return BadRequest(new { sucess=false,message = "Error al enviar el código." });
        }
    }
}

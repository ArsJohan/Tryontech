using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TryontechWebAPI.Clases;
using TryontechWebAPI.Models;

namespace TryontechWebAPI.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly clsEmailService _emailService;

        public EmailController(TryontechContext dbContext)
        {
            _emailService = new clsEmailService(dbContext);
        }


        [HttpPost("requestCode")]
        public async Task<IActionResult> RequestCode([FromBody] EmailRequestModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Correo))
            {
                return BadRequest(new { success = false, message = "El campo 'Correo' es obligatorio." });
            }

            int? usuarioId = await _emailService.SendEmail(model.Correo);
            if (usuarioId != null)
                return Ok(new { sucess = true, message = "Código enviado con éxito", userId=usuarioId});
            else
                return BadRequest(new { success = false, message = "Error al enviar código, verifica el email" });
        }

        public class EmailRequestModel
        {
            public string Correo { get; set; } // 🔹 Coincide con la base de datos
        }
    }
}
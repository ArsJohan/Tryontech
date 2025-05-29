using global::TryontechWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using TryontechWebAPI.Clases;
using TryontechWebAPI.Models;

namespace TryontechWebAPI.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TryontechContext _dbContext;

        public UserController(TryontechContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost("verifyEmail")]
        public IActionResult VerifyEmail([FromBody]EmailRequestModel emailRequest)
        {
            if (string.IsNullOrEmpty(emailRequest.Correo))
            {
                return BadRequest(new { message = "El correo es obligatorio." });
            }

            var usuarioExiste = _dbContext.Usuarios.Any(u => u.Correo == emailRequest.Correo);

            return usuarioExiste
                ? Ok(new { exists = true, message = "Usuario encontrado." })
                : NotFound(new { exists = false, message = "El correo no ha sido registrado." });
        }

        [HttpPost("verifyPhone")]
        public IActionResult VerifyPhone([FromBody]EnviarCodigoRequestDTO requestDTO)
        {
            if (string.IsNullOrEmpty(requestDTO.Telefono))
            {
                return BadRequest(new { message = "El número de teléfono es obligatorio." });
            }

            var usuarioExiste = _dbContext.Usuarios.Any(u => u.Telefono == requestDTO.Telefono);

            return usuarioExiste
                ? Ok(new { exists = true, message = "Número de teléfono registrado." })
                : NotFound(new { exists = false, message = "El número de teléfono no está registrado." });
        }


      

    }
}
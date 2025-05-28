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
        [HttpGet("verifyEmail")]
        public IActionResult VerifyEmail([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest(new { message = "El correo es obligatorio." });
            }

            var usuarioExiste = _dbContext.Usuarios.Any(u => u.Correo == email);

            return usuarioExiste
                ? Ok(new { exists = true, message = "Usuario encontrado." })
                : NotFound(new { exists = false, message = "El correo no ha sido registrado." });
        }

        [HttpGet("verifyPhone")]
        public IActionResult VerifyPhone([FromQuery] string phone)
        {
            if (string.IsNullOrEmpty(phone))
            {
                return BadRequest(new { message = "El número de teléfono es obligatorio." });
            }

            var usuarioExiste = _dbContext.Usuarios.Any(u => u.Telefono == phone);

            return usuarioExiste
                ? Ok(new { exists = true, message = "Número de teléfono registrado." })
                : NotFound(new { exists = false, message = "El número de teléfono no está registrado." });
        }


      

    }
}
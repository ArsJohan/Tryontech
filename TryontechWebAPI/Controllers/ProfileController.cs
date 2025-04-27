using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Schema;
using TryontechWebAPI.Clases;
using TryontechWebAPI.Models;

namespace TryontechWebAPI.Controllers
{
    [ApiController]
    [Route("api/profile")]
    public class ProfileController : Controller
    {
        private readonly clsUsuario _clsUsuario;

        // Modificado por Santi para cumplir con la inyección de dependencias
        public ProfileController(TryontechContext dbContext)
        {
            _clsUsuario = new clsUsuario(dbContext);
        }
        // fin de la modificación

        [HttpPost]
        [Route("create")]
        public IActionResult CrearCuenta([FromBody] CreateAccountRequest request)
        {
            try
            {
                Usuario nuevoUsuario = _clsUsuario.CrearUsuario(request.Username, request.Password, request.Telefono, request.Correo);

                // Crear el cliente y asociarlo al usuario
                clsCliente cliente = new clsCliente();

                // se modifico para que recibiera los parametros adecuados
                cliente.InsertarCliente(request.FechaNacimiento, request.Sexo, nuevoUsuario);

                return Ok(new { Message = "Usuario y cliente creados exitosamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

    }
}


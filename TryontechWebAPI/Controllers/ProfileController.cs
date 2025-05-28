using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
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

        [HttpGet]
        [Route("getIdCliente")]
        public int ConsultarIdClienteXCorreo(string correo)
        {
            clsCliente cliente = new clsCliente();
            return cliente.ConsultarIdClienteXCorreo(correo);

        }



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
                string resultado = cliente.InsertarCliente(request.FechaNacimiento, request.Sexo, nuevoUsuario);

                return Ok(new { sucess = true, message =resultado });
            }
            catch (Exception ex)
            {
                return BadRequest(new { sucess = false,message = "Ocurrió un error al crear el usuario. Por favor, verifica los datos enviados e inténtalo nuevamente. Detalle: " + ex.Message });
            }
        }
        [HttpPost]
        [Route("ConsultarCliente")]
        public Cliente ConsultarCliente(int idCliente)
        {
            try
            {
                clsCliente cliente = new clsCliente();
                return cliente.ConsultarCliente(idCliente);
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching client data: " + ex.Message);
            }
        }
    }
}



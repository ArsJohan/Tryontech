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
        [HttpPost("create")]
        public string CrearCuenta([FromBody] CrearCuentaDto datos)
        {
            clsUsuario clsusuario = new clsUsuario();
            Usuario nuevoUsuario = clsusuario.CrearUsuario(datos.Username, datos.Password, datos.Telefono, datos.Correo);

            clsCliente cliente = new clsCliente();
            string resultado = cliente.InsertarCliente(datos.FechaNacimiento, datos.Sexo, nuevoUsuario);

            return resultado;
        }
    }
}

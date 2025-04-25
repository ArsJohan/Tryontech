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
        [HttpPost]
        [Route("create")]
        public string CrearCuenta(string username, string password, string telefono, string correo, DateOnly fechaNacimiento, string sexo)
        {
            // primero instanciar la clase usuario
            clsUsuario usuario = new clsUsuario();
            // crear el usuario
            Usuario nuevoUsuario = usuario.CrearUsuario(username, password, telefono, correo);
            // luego instanciar la clase cliente
            clsCliente cliente = new clsCliente();
            // crear el cliente
            string resultado = cliente.InsertarCliente(fechaNacimiento, sexo, nuevoUsuario);
            return resultado;

        }
    }
}

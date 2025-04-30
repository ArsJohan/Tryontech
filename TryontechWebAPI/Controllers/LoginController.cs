using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TryontechWebAPI.Models;
using TryontechWebAPI.Clases;

namespace TryontechWebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/login")]
    public class LoginController : ControllerBase
    {
        private readonly string _jwtSecret = "EstaEsUnaClaveSuperSeguraYMuyLarga1234567890"; // Cambia esto por una clave segura
        private readonly clsUsuario _clsUsuario;

        public LoginController(TryontechContext dbContext)
        {
            _clsUsuario = new clsUsuario(dbContext);
        }

        [AllowAnonymous]
        [HttpPost("Ingresar")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Validar que los campos no estén vacíos
            if (string.IsNullOrEmpty(request.Correo) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { Message = "Email and password are required." });
            }

            // Validar las credenciales del usuario
            if (_clsUsuario.ValidarCredenciales(request.Correo, request.Password, out var usuario))
            {
                // Generar un token JWT
                var token = GenerateJwtToken(usuario.Username, usuario.Rol);
                return Ok(new { Message = "Login successful!", Token = token });
            }

            return Unauthorized(new { Message = "Invalid Credentials" });
        }

        [HttpGet("protected")]
        public IActionResult ProtectedEndpoint()
        {
            return Ok(new { Message = "This is a protected endpoint", User = User.Identity.Name });
        }

        // Método para generar un token JWT
        private string GenerateJwtToken(string username, string role)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "TryontechWebAPI",
                audience: "TryontechWebAPIUsers",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    // Clase para recibir las credenciales de inicio de sesión
    public class LoginRequest
    {
        public string Correo { get; set; }
        public string Password { get; set; }
    }
}


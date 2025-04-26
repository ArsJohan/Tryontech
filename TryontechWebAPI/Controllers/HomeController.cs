using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TryontechWebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly string _jwtSecret = "TuClaveSecretaSuperSegura"; // Cambia esto por una clave segura

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Validar que los campos no estén vacíos
            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { Message = "El nombre de usuario y la contraseña son obligatorios." });
            }

            // Validar credenciales de prueba se puede eliminar
            if (request.Username == "admin" && request.Password == "12345")
            {
                // Generar un token JWT
                var token = GenerateJwtToken(request.Username);
                return Ok(new { Message = "Login exitoso", Token = token });
            }

            return Unauthorized(new { Message = "Credenciales inválidas" });
        }
         // Probando la autenticación JWT 
        [HttpGet("protected")]
        public IActionResult ProtectedEndpoint()
        {
            return Ok(new { Message = "Este es un endpoint protegido", User = User.Identity.Name });
        }
        // Método para generar un token JWT
        private string GenerateJwtToken(string username)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, "Admin") 
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("EstaEsUnaClaveSuperSeguraYMuyLarga1234567890")); // Cambia esto por una clave segura jajajaj
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

    // Clase para recibir las credenciales
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}

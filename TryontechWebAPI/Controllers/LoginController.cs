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
                return BadRequest(new { sucess = false,message = "Email and password are required." });
            }

            // Validar las credenciales del usuario
            if (_clsUsuario.ValidarCredenciales(request.Correo, request.Password, out var usuario))
            {
                // Generar un token JWT
                var token = GenerateJwtToken(usuario.Username, usuario.Rol);
                return Ok(new { sucess = true,message = "Login successful!", Token = token });
            }

            return Unauthorized(new { sucess = false, message = "Error al iniciar sesión. Por favor, inténtalo de nuevo." });
        }

        // Verificación del código de usuario
        [AllowAnonymous]
        [HttpPost("verifyCode")]
        public IActionResult VerifyCode([FromBody] VerifyCodeRequest request)
        {
            if (string.IsNullOrEmpty(request.Code))
            {
                return BadRequest(new { sucess = false, message = "El código es obligatorio." });
            }

            var usuario = _clsUsuario.ObtenerUsuarioPorId(request.UserId); // Usamos el `UserId` recibido del frontend

            if (usuario == null)
            {
                return NotFound(new { sucess = false, message = "Usuario no encontrado." });
            }

            if (usuario.Code != request.Code)
            {
                return Unauthorized(new { sucess = false, message = "El código ingresado es incorrecto." });
            }

            // Código correcto: se invalida el código en la base de datos
            usuario.Code = null;
            _clsUsuario.ActualizarUsuario(usuario);

            // Generar un token temporal solo para cambio de contraseña
            var token = GeneratePasswordResetToken(usuario.Id);

            return Ok(new { sucess = true,message = "Código verificado exitosamente.", Token = token });
        }

        //Cambio de la contraseña y cifrado
        [Authorize]
        [HttpPost("changePassword")]
        public IActionResult ChangePassword([FromBody] ChangePasswordRequest request)
        {
            if (string.IsNullOrEmpty(request.NewPassword))
            {
                return BadRequest(new { sucess = false, message = "La nueva contraseña es obligatoria." });
            }

            var usuario = _clsUsuario.ObtenerUsuarioPorId(request.UserId); // Usamos el `UserId` recibido del frontend

            if (usuario == null)
            {
                return NotFound(new { sucess = false, message = "Usuario no encontrado." });
            }

            var cypher = new clsCypher();
            cypher.Password = request.NewPassword;

            if (!cypher.CifrarClave())
            {
                return StatusCode(500, new { sucess = false, message = "Error al cifrar la nueva contraseña." });
            }

            usuario.Password = cypher.PasswordCifrado;
            usuario.Salt = cypher.Salt;

            _clsUsuario.ActualizarUsuario(usuario);

            return Ok(new { sucess = true, message = "Contraseña actualizada exitosamente." });
        }

        [HttpGet("protected")]
        public IActionResult ProtectedEndpoint()
        {
            return Ok(new { sucess = true, message = "This is a protected endpoint", User = User.Identity.Name });
        }

        // Genera un token solo para cambio de contraseña
        private string GeneratePasswordResetToken(int userId)
        {
            var claims = new[]
            {
                new Claim("UserId", userId.ToString()),
                new Claim("PasswordReset", "true")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "TryontechWebAPI",
                audience: "TryontechWebAPIUsers",
                claims: claims,
                expires: DateTime.Now.AddMinutes(15), // Token temporal
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

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

    //clases para las solicitudes de login, verificación de código y cambio de contraseña
    public class LoginRequest
    {
        public string Correo { get; set; }
        public string Password { get; set; }
    }

    public class VerifyCodeRequest
    {
        public int UserId { get; set; } //Se maneja internamente no se recibe desde el cliente
        public string Code { get; set; }
    }
    public class ChangePasswordRequest
    {
        public int UserId { get; set; } //Se maneja internamente no se recibe desde el cliente
        public string NewPassword { get; set; }
    } 
}

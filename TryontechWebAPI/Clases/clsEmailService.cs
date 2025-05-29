using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using TryontechWebAPI.Models;

namespace TryontechWebAPI.Clases
{
    public class clsEmailService
    {
        private readonly string smtpServer = "smtp.gmail.com"; //sandbox.smtp.mailtrap.io       smtp.gmail.com
        private readonly int smtpPort = 587; // 587
        private readonly string smtpUser = "tryontech0@gmail.com"; // 80166ab57a40f4           tryontech0@gmail.com
        private readonly string smtpPass = "wmcf lrby vpxr xabp"; // 177960afd3e875            wmcf lrby vpxr xabp
        private readonly string fromEmail = "tryontech0@gmail.com"; //tryontech0@gmail.com

        private readonly TryontechContext _dbContext;

        public clsEmailService(TryontechContext dbContext) // 🔹 Pasamos TryontechContext al constructor
        {
            _dbContext = dbContext;
        }

        public string GenerateVerificationCode()
        {
            Random random = new Random();
            return random.Next(1000, 9999).ToString();
        }

        public async Task<int?> SendEmail(string toEmail)
        {
            string code = GenerateVerificationCode();

            // 🔹 Ahora usamos `_dbContext` correctamente sin crear una instancia manual
            var usuario = _dbContext.Usuarios.FirstOrDefault(u => u.Correo == toEmail);
            if (usuario != null)
            {
                usuario.Code = code;
                await _dbContext.SaveChangesAsync();
            }

            using var client = new SmtpClient(smtpServer)
            {
                Port = smtpPort,
                Credentials = new NetworkCredential(smtpUser, smtpPass),
                EnableSsl = true
            };

            try
            {
                var mailMessage = new MailMessage
                {
                    From = new MailAddress(fromEmail),
                    Subject = "Código de recuperación",
                    Body = $@"
                            <div style='font-family: Arial, sans-serif; padding: 20px; border-radius: 5px; background-color: #EADBFE;'>
                                <h2 style='color: #CCA8FD;'>TryOnTech - Recuperación de Cuenta</h2>
                                <p style='color: #262626;'>Hola,</p>
                                <p style='color: #262626;'>Tu código de verificación es:</p>
                                <h1 style='color: #C18BF0;'>{code}</h1>
                                <p style='color: #262626;'>Ingresa este código en la aplicación para restablecer tu contraseña.</p>
                                <hr style='border-color: #CCA8FD;'>
                                <p style='font-size: 12px; color: #262626;'>Si no solicitaste este código, puedes ignorar este mensaje.</p>
                            </div>",
                    IsBodyHtml = true
                };

                mailMessage.To.Add(toEmail);

                await client.SendMailAsync(mailMessage);
                return usuario.Id;
            }
            catch (Exception ex)
            {
                // Manejo de errores: podrías registrar el error o lanzar una excepción personalizada

                return null; // Retorna null si hubo un error al enviar el correo
            }

        }
    }
}
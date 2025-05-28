using System;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Microsoft.EntityFrameworkCore;
using TryontechWebAPI.Models;
namespace TryontechWebAPI.Clases
{
    public class clsPhoneService
    {
        private readonly TryontechContext _dbContext;
        private readonly string _twilioAccountSid;
        private readonly string _twilioAuthToken;
        private readonly string _twilioFromPhoneNumber;

        public clsPhoneService(
            TryontechContext dbContext, 
            string twilioAccountSid, 
            string twilioAuthToken, 
            string twilioFromPhoneNumber)
        {
            _dbContext = dbContext;
            _twilioAccountSid = twilioAccountSid;
            _twilioAuthToken = twilioAuthToken;
            _twilioFromPhoneNumber = twilioFromPhoneNumber;

            TwilioClient.Init(_twilioAccountSid, _twilioAuthToken);
        }


        public async Task<bool> EnviarCodigoPorTelefonoAsync(int usuarioId, string telefonoDestino)
        {
            // 1. Generar código aleatorio de 4 dígitos
            var codigo = new Random().Next(1000, 9999).ToString();

            // 2. Guardar código en base de datos para el usuario
            var usuario = await _dbContext.Usuarios.FindAsync(usuarioId);
            if (usuario == null) return false;

            usuario.Code = codigo;
            await _dbContext.SaveChangesAsync();

            // 3. Enviar SMS con Twilio
            try
            {
                var message = MessageResource.Create(
                    body: $"Tu código de recuperación es: {codigo}",
                    from: new Twilio.Types.PhoneNumber(_twilioFromPhoneNumber),
                    to: new Twilio.Types.PhoneNumber(telefonoDestino)
                );

                return message.ErrorCode == null; // true si no hubo error
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}


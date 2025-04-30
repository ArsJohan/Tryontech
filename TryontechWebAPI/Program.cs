using Microsoft.EntityFrameworkCore;
using TryontechWebAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configurar JWT Sgp
var key = Encoding.UTF8.GetBytes("EstaEsUnaClaveSuperSeguraYMuyLarga1234567890"); // clave v�lida

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "TryontechWebAPI",
            ValidAudience = "TryontechWebAPIUsers",
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // SIN SLASH al final
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Registrar el contexto de base de datos con SQL Server
builder.Services.AddDbContext<TryontechContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Agregar controladores
builder.Services.AddControllers();


var app = builder.Build();
app.UseStaticFiles(); // Esto hace que wwwroot funcione
app.UseAuthentication(); // Habilitar autenticaci�n Sgp
// Configure the HTTP request pipeline.
app.UseCors("FrontendPolicy"); // Use CORS policy
app.UseRouting();


app.UseAuthorization();

// Mapear controladores
app.MapControllers();

app.UseDeveloperExceptionPage();
app.Run();


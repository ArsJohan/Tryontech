using Microsoft.EntityFrameworkCore;
using TryontechWebAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configurar JWT Sgp
var key = Encoding.UTF8.GetBytes("EstaEsUnaClaveSuperSeguraYMuyLarga1234567890"); // clave válida
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

// Add services to the container.

builder.Services.AddControllers();

// Add DBContext
//builder.Services.AddDbContext<TryontechContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseAuthentication(); // Habilitar autenticación Sgp
// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();

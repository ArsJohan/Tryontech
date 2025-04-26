using Microsoft.EntityFrameworkCore;
using TryontechWebAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configurar JWT
var key = Encoding.UTF8.GetBytes("tryontechlamejoridea"); // clave válida
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

// Registrar el contexto de base de datos con SQL Server
builder.Services.AddDbContext<TryontechContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Agregar controladores
builder.Services.AddControllers();

var app = builder.Build();

app.UseRouting();
// Habilitar autenticación y autorización
app.UseAuthentication();
app.UseAuthorization();

// Mapear controladores
app.MapControllers();

app.UseDeveloperExceptionPage();
app.Run();


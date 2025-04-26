var builder = WebApplication.CreateBuilder(args);

//Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173") //My domain fronted
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container.

builder.Services.AddControllers();


var app = builder.Build();
// Configure the HTTP request pipeline.
app.UseCors("FrontendPolicy"); // Use CORS policy
app.UseRouting();


app.UseAuthorization();

app.MapControllers();

app.Run();

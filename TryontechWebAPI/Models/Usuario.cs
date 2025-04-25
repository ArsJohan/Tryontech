using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TryontechWebAPI.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public string Rol { get; set; } = null!;

    public bool Estado { get; set; }

    public string Salt { get; set; } = null!;

    [JsonIgnore]

    public virtual ICollection<Cliente> Clientes { get; set; } = new List<Cliente>();
}

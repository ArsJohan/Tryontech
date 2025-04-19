using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? Telefono { get; set; }

    public string? Rol { get; set; }

    public string? Estado { get; set; }

    public string? Salt { get; set; }
}

using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class Modelo
{
    public int Id { get; set; }

    public string? Imagen { get; set; }

    public string? Archivo { get; set; }

    public string? TipoCuerpo { get; set; }

    public string? Sexo { get; set; }

    public virtual ICollection<Cliente> Clientes { get; set; } = new List<Cliente>();
}

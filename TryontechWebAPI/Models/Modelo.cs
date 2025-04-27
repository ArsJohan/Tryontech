using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class Modelo
{
    public int Id { get; set; }

    public string Imagen { get; set; } = null!;

    public string Archivo { get; set; } = null!;

    public string TipoCuerpo { get; set; } = null!;

    public string Sexo { get; set; } = null!;

    public virtual ICollection<Cliente> Clientes { get; set; } = new List<Cliente>();
}

using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class TipoPrendum
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public bool? Activo { get; set; }

    public virtual ICollection<Prendum> Prenda { get; set; } = new List<Prendum>();
}

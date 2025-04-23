using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class Talla
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Recomendacion> Recomendacions { get; set; } = new List<Recomendacion>();

    public virtual ICollection<Tallaje> Tallajes { get; set; } = new List<Tallaje>();
}

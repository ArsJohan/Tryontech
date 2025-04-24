using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class Tallaje
{
    public int Id { get; set; }

    public float? HombrosMax { get; set; }

    public float? HombrosMin { get; set; }

    public float? PechoMax { get; set; }

    public float? PechoMin { get; set; }

    public float? CinturaMax { get; set; }

    public float? CinturaMin { get; set; }

    public float? CaderaMax { get; set; }

    public float? CaderaMin { get; set; }

    public float? LargoPiernaMax { get; set; }

    public float? LargoPiernaMin { get; set; }

    public float? LargoBrazoMax { get; set; }

    public float? LargoBrazoMin { get; set; }

    public float? Cuello { get; set; }

    public int IdTalla { get; set; }

    public virtual Talla IdTallaNavigation { get; set; } = null!;

    public virtual ICollection<TallajePrendum> TallajePrenda { get; set; } = new List<TallajePrendum>();
}

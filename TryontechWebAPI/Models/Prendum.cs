using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class Prendum
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Imagen { get; set; }

    public string? Referencia { get; set; }

    public bool? Activo { get; set; }

    public int? IdTipo { get; set; }

    public int? IdColor { get; set; }

    public virtual ICollection<BolsaPrendum> BolsaPrenda { get; set; } = new List<BolsaPrendum>();

    public virtual ColorPrendum? IdColorNavigation { get; set; }

    public virtual TipoPrendum? IdTipoNavigation { get; set; }

    public virtual ICollection<TallajePrendum> TallajePrenda { get; set; } = new List<TallajePrendum>();
}

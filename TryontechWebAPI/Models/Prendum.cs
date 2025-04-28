using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class Prendum
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Imagen { get; set; } = null!;

    public string Referencia { get; set; } = null!;

    public bool Activo { get; set; }

    public int IdTipo { get; set; }

    public int IdColor { get; set; }

    public virtual ICollection<BolsaPrendum> BolsaPrenda { get; set; } = new List<BolsaPrendum>();

    public virtual ColorPrendum IdColorNavigation { get; set; } = null!;

    public virtual TipoPrendum IdTipoNavigation { get; set; } = null!;

    public virtual ICollection<TallajePrendum> TallajePrenda { get; set; } = new List<TallajePrendum>();
}

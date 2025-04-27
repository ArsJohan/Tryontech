using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class BolsaPrendum
{
    public int Id { get; set; }

    public int? NumeroPrendas { get; set; }

    public int IdPrenda { get; set; }

    public int IdCliente { get; set; }

    public virtual Cliente IdClienteNavigation { get; set; } = null!;

    public virtual Prendum IdPrendaNavigation { get; set; } = null!;
}

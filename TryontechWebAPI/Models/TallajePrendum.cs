using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class TallajePrendum
{
    public int Id { get; set; }

    public string? Sexo { get; set; }

    public int? IdPrenda { get; set; }

    public int? IdTallaje { get; set; }

    public virtual Prendum? IdPrendaNavigation { get; set; }

    public virtual Tallaje? IdTallajeNavigation { get; set; }
}

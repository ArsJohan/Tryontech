using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class Recomendacion
{
    public int Id { get; set; }

    public string? Descripcion { get; set; }

    public DateOnly? Fecha { get; set; }

    public int? IdTalla { get; set; }

    public int? IdCliente { get; set; }

    public virtual Cliente? IdClienteNavigation { get; set; }

    public virtual Talla? IdTallaNavigation { get; set; }
}

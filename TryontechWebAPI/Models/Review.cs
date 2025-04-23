using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class Review
{
    public int Id { get; set; }

    public DateOnly FechaVenta { get; set; }

    public DateOnly FechaEnvio { get; set; }

    public bool EncuestaEnviada { get; set; }

    public int IdCliente { get; set; }

    public virtual Cliente IdClienteNavigation { get; set; } = null!;
}

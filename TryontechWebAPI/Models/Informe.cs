using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class Informe
{
    public int Id { get; set; }

    public DateOnly? FechaReporte { get; set; }

    public int? ClientesMes { get; set; }

    public int? TotalClientes { get; set; }

    public string? PorcentajeTalla { get; set; }

    public int? TotalVentas { get; set; }

    public int? NumeroDevoluciones { get; set; }

    public float? CalificacionProm { get; set; }
}

using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class ProbadorPrenda
{
    public int Id { get; set; }

    public float? AjustePecho { get; set; }

    public float? AjusteCintura { get; set; }

    public float? AjusteCadera { get; set; }

    public float? AjusteLargoPierna { get; set; }

    public float? AjusteCuello { get; set; }

    public float? AjusteLargoBrazo { get; set; }

    public float? Compatibilidad { get; set; }

    public float? PorcentajeAjuste { get; set; }
}

using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TryontechWebAPI.Models;

public partial class TallajeCliente
{
    public int Id { get; set; }

    public float? Hombros { get; set; }

    public float? Pecho { get; set; }

    public float? Cintura { get; set; }

    public float? Cadera { get; set; }

    public float? LargoPierna { get; set; }

    public float? Cuello { get; set; }

    public float? LargoBrazo { get; set; }

    public float? Peso { get; set; }

    public float? Altura { get; set; }

    public int IdCliente { get; set; }

    [JsonIgnore]
    public virtual Cliente IdClienteNavigation { get; set; } = null!;
}

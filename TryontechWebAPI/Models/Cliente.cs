using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TryontechWebAPI.Models;

public partial class Cliente
{
    public int Id { get; set; }

    public DateOnly FechaNacimiento { get; set; }

    public string Sexo { get; set; } = null!;

    public int? IdModelo { get; set; }

    public int IdUsuario { get; set; }

    [JsonIgnore]
    public virtual ICollection<BolsaPrendum> BolsaPrenda { get; set; } = new List<BolsaPrendum>();
    [JsonIgnore]

    public virtual Modelo? IdModeloNavigation { get; set; }
    [JsonIgnore]

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Recomendacion> Recomendacions { get; set; } = new List<Recomendacion>();
    [JsonIgnore]

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
    [JsonIgnore]

    public virtual ICollection<TallajeCliente> TallajeClientes { get; set; } = new List<TallajeCliente>();
}

using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class Cliente
{
    public int Id { get; set; }

    public DateOnly? FechaNacimiento { get; set; }

    public string? Sexo { get; set; }

    public int? IdModelo { get; set; }

    public virtual ICollection<BolsaPrendum> BolsaPrenda { get; set; } = new List<BolsaPrendum>();

    public virtual Modelo? IdModeloNavigation { get; set; }

    public virtual ICollection<Recomendacion> Recomendacions { get; set; } = new List<Recomendacion>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<TallajeCliente> TallajeClientes { get; set; } = new List<TallajeCliente>();
}

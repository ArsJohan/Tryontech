using System;
using System.Collections.Generic;

namespace TryontechWebAPI.Models;

public partial class Cliente
{
    public int Id { get; set; }

    public DateOnly FechaNacimiento { get; set; }

    public string Sexo { get; set; } = null!;

    public int IdModelo { get; set; }

    public int IdUsuario { get; set; }

    public int IdUsuario { get; set; }

    public virtual ICollection<BolsaPrendum> BolsaPrenda { get; set; } = new List<BolsaPrendum>();

    public virtual Modelo IdModeloNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;

    public virtual ICollection<Recomendacion> Recomendacions { get; set; } = new List<Recomendacion>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<TallajeCliente> TallajeClientes { get; set; } = new List<TallajeCliente>();
}

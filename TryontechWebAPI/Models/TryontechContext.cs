using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TryontechWebAPI.Models;

public partial class TryontechContext : DbContext
{
    public TryontechContext() { }

    public TryontechContext(DbContextOptions<TryontechContext> options)
        : base(options) { }

    public virtual DbSet<BolsaPrendum> BolsaPrenda { get; set; } = null!;
    public virtual DbSet<Cliente> Clientes { get; set; } = null!;
    public virtual DbSet<ColorPrendum> ColorPrenda { get; set; } = null!;
    public virtual DbSet<Informe> Informes { get; set; } = null!;
    public virtual DbSet<Modelo> Modelos { get; set; } = null!;
    public virtual DbSet<Prendum> Prenda { get; set; } = null!;
    public virtual DbSet<ProbadorPrenda> ProbadorPrendas { get; set; } = null!;
    public virtual DbSet<Recomendacion> Recomendacions { get; set; } = null!;
    public virtual DbSet<Review> Reviews { get; set; } = null!;
    public virtual DbSet<Talla> Tallas { get; set; } = null!;
    public virtual DbSet<Tallaje> Tallajes { get; set; } = null!;
    public virtual DbSet<TallajeCliente> TallajeClientes { get; set; } = null!;
    public virtual DbSet<TallajePrendum> TallajePrenda { get; set; } = null!;
    public virtual DbSet<TipoPrendum> TipoPrenda { get; set; } = null!;
    public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true)
                .AddEnvironmentVariables()
                .Build();
            optionsBuilder.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BolsaPrendum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Bolsa_Pr_3213E83F");
            entity.ToTable("Bolsa_Prenda");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdCliente).HasColumnName("id_cliente");
            entity.Property(e => e.IdPrenda).HasColumnName("id_prenda");
            entity.Property(e => e.NumeroPrendas).HasColumnName("numero_prendas");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.BolsaPrenda)
                .HasForeignKey(d => d.IdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.IdPrendaNavigation).WithMany(p => p.BolsaPrenda)
                .HasForeignKey(d => d.IdPrenda)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Cliente_3213E83F");
            entity.ToTable("Cliente");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FechaNacimiento).HasColumnName("fecha_nacimiento");
            entity.Property(e => e.IdModelo).HasColumnName("id_modelo");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Sexo).HasMaxLength(10).IsUnicode(false).HasColumnName("sexo");

            entity.HasOne(d => d.IdModeloNavigation).WithMany(p => p.Clientes)
                .HasForeignKey(d => d.IdModelo);

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Clientes)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<ColorPrendum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ColorPre_3213E83F");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Activo).HasColumnName("activo");
            entity.Property(e => e.Nombre).HasMaxLength(100).IsUnicode(false).HasColumnName("nombre");
        });

        modelBuilder.Entity<Informe>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Informe_3213E83F");
            entity.ToTable("Informe");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CalificacionProm).HasColumnName("calificacion_prom");
            entity.Property(e => e.ClientesMes).HasColumnName("clientes_mes");
            entity.Property(e => e.FechaReporte).HasColumnName("fecha_reporte");
            entity.Property(e => e.NumeroDevoluciones).HasColumnName("numero_devoluciones");
            entity.Property(e => e.PorcentajeTalla).HasMaxLength(5).IsUnicode(false).HasColumnName("porcentaje_talla");
            entity.Property(e => e.TotalClientes).HasColumnName("total_clientes");
            entity.Property(e => e.TotalVentas).HasColumnName("total_ventas");
        });

        modelBuilder.Entity<Modelo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Modelo_3213E83F");
            entity.ToTable("Modelo");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Archivo).IsUnicode(false).HasColumnName("archivo");
            entity.Property(e => e.Imagen).IsUnicode(false).HasColumnName("imagen");
            entity.Property(e => e.Sexo).HasMaxLength(10).IsUnicode(false).HasColumnName("sexo");
            entity.Property(e => e.TipoCuerpo).HasMaxLength(30).IsUnicode(false).HasColumnName("tipo_cuerpo");
        });

        modelBuilder.Entity<Prendum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Prenda_3213E83F");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Activo).HasColumnName("activo");
            entity.Property(e => e.IdColor).HasColumnName("id_color");
            entity.Property(e => e.IdTipo).HasColumnName("id_tipo");
            entity.Property(e => e.Imagen).IsUnicode(false).HasColumnName("imagen");
            entity.Property(e => e.Nombre).HasMaxLength(100).IsUnicode(false).HasColumnName("nombre");
            entity.Property(e => e.Referencia).HasMaxLength(100).IsUnicode(false).HasColumnName("referencia");

            entity.HasOne(d => d.IdColorNavigation).WithMany(p => p.Prenda)
                .HasForeignKey(d => d.IdColor)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.IdTipoNavigation).WithMany(p => p.Prenda)
                .HasForeignKey(d => d.IdTipo)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<ProbadorPrenda>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Probador_3213E83F");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AjusteCadera).HasColumnName("ajuste_cadera");
            entity.Property(e => e.AjusteCintura).HasColumnName("ajuste_cintura");
            entity.Property(e => e.AjusteCuello).HasColumnName("ajuste_cuello");
            entity.Property(e => e.AjusteLargoBrazo).HasColumnName("ajuste_largo_brazo");
            entity.Property(e => e.AjusteLargoPierna).HasColumnName("ajuste_largo_pierna");
            entity.Property(e => e.AjustePecho).HasColumnName("ajuste_pecho");
            entity.Property(e => e.Compatibilidad).HasColumnName("compatibilidad");
            entity.Property(e => e.PorcentajeAjuste).HasColumnName("porcentaje_ajuste");
        });

        modelBuilder.Entity<Recomendacion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Recomend_3213E83F");
            entity.ToTable("Recomendacion");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Descripcion).HasMaxLength(10).IsUnicode(false).HasColumnName("descripcion");
            entity.Property(e => e.Fecha).HasColumnName("fecha");
            entity.Property(e => e.IdCliente).HasColumnName("id_cliente");
            entity.Property(e => e.IdTalla).HasColumnName("id_talla");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Recomendacions)
                .HasForeignKey(d => d.IdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.IdTallaNavigation).WithMany(p => p.Recomendacions)
                .HasForeignKey(d => d.IdTalla)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Review_3213E83F");
            entity.ToTable("Review");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.EncuestaEnviada).HasColumnName("encuesta_enviada");
            entity.Property(e => e.FechaEnvio).HasColumnName("fecha_envio");
            entity.Property(e => e.FechaVenta).HasColumnName("fecha_venta");
            entity.Property(e => e.IdCliente).HasColumnName("id_cliente");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.IdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<Talla>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Talla_3213E83F");
            entity.ToTable("Talla");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre).HasMaxLength(100).IsUnicode(false).HasColumnName("nombre");
        });

        modelBuilder.Entity<Tallaje>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Tallaje_3213E83F");
            entity.ToTable("Tallaje");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CaderaMax).HasColumnName("cadera_max");
            entity.Property(e => e.CaderaMin).HasColumnName("cadera_min");
            entity.Property(e => e.CinturaMax).HasColumnName("cintura_max");
            entity.Property(e => e.CinturaMin).HasColumnName("cintura_min");
            entity.Property(e => e.Cuello).HasColumnName("cuello");
            entity.Property(e => e.HombrosMax).HasColumnName("hombros_max");
            entity.Property(e => e.HombrosMin).HasColumnName("hombros_min");
            entity.Property(e => e.IdTalla).HasColumnName("id_talla");
            entity.Property(e => e.LargoBrazoMax).HasColumnName("largo_brazo_max");
            entity.Property(e => e.LargoBrazoMin).HasColumnName("largo_brazo_min");
            entity.Property(e => e.LargoPiernaMax).HasColumnName("largo_pierna_max");
            entity.Property(e => e.LargoPiernaMin).HasColumnName("largo_pierna_min");
            entity.Property(e => e.PechoMax).HasColumnName("pecho_max");
            entity.Property(e => e.PechoMin).HasColumnName("pecho_min");

            entity.HasOne(d => d.IdTallaNavigation).WithMany(p => p.Tallajes)
                .HasForeignKey(d => d.IdTalla)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<TallajeCliente>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TallajeC_3213E83F");
            entity.ToTable("TallajeCliente");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Altura).HasColumnName("altura");
            entity.Property(e => e.Cadera).HasColumnName("cadera");
            entity.Property(e => e.Cintura).HasColumnName("cintura");
            entity.Property(e => e.Cuello).HasColumnName("cuello");
            entity.Property(e => e.Hombros).HasColumnName("hombros");
            entity.Property(e => e.IdCliente).HasColumnName("id_cliente");
            entity.Property(e => e.LargoBrazo).HasColumnName("largo_brazo");
            entity.Property(e => e.LargoPierna).HasColumnName("largo_pierna");
            entity.Property(e => e.Pecho).HasColumnName("pecho");
            entity.Property(e => e.Peso).HasColumnName("peso");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.TallajeClientes)
                .HasForeignKey(d => d.IdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<TallajePrendum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TallajeP_3213E83F");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdPrenda).HasColumnName("id_prenda");
            entity.Property(e => e.IdTallaje).HasColumnName("id_tallaje");
            entity.Property(e => e.Sexo).HasMaxLength(10).IsUnicode(false).HasColumnName("sexo");

            entity.HasOne(d => d.IdPrendaNavigation).WithMany(p => p.TallajePrenda)
                .HasForeignKey(d => d.IdPrenda)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.IdTallajeNavigation).WithMany(p => p.TallajePrenda)
                .HasForeignKey(d => d.IdTallaje)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<TipoPrendum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TipoPren_3213E83F");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Activo).HasColumnName("activo");
            entity.Property(e => e.Nombre).HasMaxLength(100).IsUnicode(false).HasColumnName("nombre");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Usuario_3213E83F");
            entity.ToTable("Usuario");

            entity.HasIndex(e => e.Correo).IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code).HasMaxLength(10).HasColumnName("code");
            entity.Property(e => e.Correo).HasMaxLength(50).IsUnicode(false).HasColumnName("correo");
            entity.Property(e => e.Estado).HasColumnName("estado");
            entity.Property(e => e.Password).HasMaxLength(50).IsUnicode(false).HasColumnName("password");
            entity.Property(e => e.Rol).HasMaxLength(50).IsUnicode(false).HasColumnName("rol");
            entity.Property(e => e.Salt).IsUnicode(false).HasColumnName("salt");
            entity.Property(e => e.Telefono).HasMaxLength(16).IsUnicode(false).HasColumnName("telefono");
            entity.Property(e => e.Username).HasMaxLength(50).IsUnicode(false).HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
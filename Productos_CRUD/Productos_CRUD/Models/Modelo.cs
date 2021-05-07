using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace Productos_CRUD.Models
{
    public partial class Modelo : DbContext
    {
        public Modelo()
            : base("name=Modelo")
        {
        }

        public virtual DbSet<tb_productos> tb_productos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tb_productos>()
                .Property(e => e.nombre_producto)
                .IsUnicode(false);

            modelBuilder.Entity<tb_productos>()
                .Property(e => e.detalle)
                .IsUnicode(false);
        }
    }
}

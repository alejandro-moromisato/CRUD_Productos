namespace Productos_CRUD.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Linq;

    public partial class tb_productos
    {
        [Key]
        public int id_producto { get; set; }

        [Required]
        [StringLength(100)]
        public string nombre_producto { get; set; }

        public decimal precio_unitario { get; set; }

        public int cantidad { get; set; }

        public string detalle { get; set; }

        public DateTime? fecha_registro { get; set; }


        // ----------------------------    METODOS     ----------------------------------- //


        // -------------------------- LISTAR PRODUCTOS --------------------------------- //

        public List<tb_productos> ListarProductos()
        {
            var productos = new List<tb_productos>();
            string cadena = "SELECT * FROM tb_productos";
            try
            {
                using (var contenedor = new Modelo())
                {
                    productos = contenedor.Database.SqlQuery<tb_productos>(cadena).ToList();
                }
            }
            catch (Exception)
            {
                throw;
            }

            return productos;
        }



        // -------------------------- LISTAR PRODUCTOS POR ID --------------------------------- //

        public List<tb_productos> ListarProductoxId(int id)
        {
            var proveedores = new List<tb_productos>();
            string cadena = "SELECT * FROM tb_productos WHERE id_producto = " + id;
            try
            {
                using (var contenedor = new Modelo())
                {
                    proveedores = contenedor.Database.SqlQuery<tb_productos>(cadena).ToList();
                }
            }
            catch (Exception)
            {
                throw;
            }

            return proveedores;

        }

        // -------------------------- AGREGAR PRODUCTOS --------------------------------- //

        public Boolean InsertarProducto(string nombre, string precio, int cantidad, string detalle)
        {
            bool estado = false;
            string _nombre = "'" + nombre + "'";
            string _detalle = "'" + detalle + "'";



            try
            {
                using (var cnx = new Modelo())
                {
                    int valor = cnx.Database.ExecuteSqlCommand("INSERT INTO tb_productos VALUES (" + _nombre + ", "  + precio + ", " + cantidad + " , " + _detalle + " , GETDATE())");
                    if (valor == 1)
                    {
                        estado = true;
                    }
                }
            }
            catch (Exception)
            {
                estado = false;
            }

            return estado;
        }


        // -------------------------- ELIMINAR PRODUCTO --------------------------------- //

        public Boolean EliminarProducto(int id)
        {
            bool estado = false;
            try
            {
                using (var cnx = new Modelo())
                {
                    int valor = cnx.Database.ExecuteSqlCommand("DELETE FROM tb_productos WHERE id_producto = " + id);
                    if (valor == 1)
                    {
                        estado = true;
                    }
                }
            }
            catch (Exception)
            {
                estado = false;
            }

            return estado;
        }


        // -------------------------- ACTUALIZAR PROVEEDOR --------------------------------- //

        public Boolean ActualizarProducto(int id, string nombre,string precio,int cantidad, string detalle)
        {
            bool estado = false;
            string _nombre = "'" + nombre + "'";            
            string _detalle = "'" + detalle + "'";

            try
            {
                using (var cnx = new Modelo())
                {
                    int valor = cnx.Database.ExecuteSqlCommand("UPDATE tb_productos SET nombre_producto = (" + _nombre + ") , precio_unitario = (" + precio + ") , cantidad = (" + cantidad + ") , detalle = (" + _detalle + ") , fecha_registro = GETDATE() WHERE id_producto = " + id);
                    if (valor == 1)
                    {
                        estado = true;
                    }
                }
            }
            catch (Exception)
            {
                estado = false;
            }

            return estado;
        }


    }
}

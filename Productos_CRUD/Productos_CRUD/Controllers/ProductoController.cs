using Newtonsoft.Json;
using Productos_CRUD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Productos_CRUD.Controllers
{
    public class ProductoController : Controller
    {
        private tb_productos productos = new tb_productos();

        [HttpGet]
        public ActionResult Index()
        {
            return View(productos.ListarProductos());
        }

        public JsonResult ListarProductos()
        {
            var lista = productos.ListarProductos();
            var json = JsonConvert.SerializeObject(lista);
            return Json(json, JsonRequestBehavior.AllowGet);

        }

        public JsonResult AgregarProducto(string nombre,string precio,int cantidad, string detalle)
        {
            bool estado = false;

            estado = productos.InsertarProducto(nombre,precio,cantidad,detalle);


            if (estado == true)
            {
                return Json("true", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("true", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult EliminarProducto(int id)
        {
            bool estado = false;

            estado = productos.EliminarProducto(id);

            if(estado == true)
            {
                return Json("true", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("false", JsonRequestBehavior.AllowGet);
            }
            
        }

        public JsonResult ListarProductoxId(int id)
        {
            var lista = productos.ListarProductoxId(id);
            var json = JsonConvert.SerializeObject(lista);
            return Json(json, JsonRequestBehavior.AllowGet);

        }

        
        public JsonResult ActualizarProducto(int id,string nombre, string precio, int cantidad, string detalle)
        {
            bool estado = false;

            estado = productos.ActualizarProducto(id,nombre, precio, cantidad, detalle);


            if (estado == true)
            {
                return Json("true", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("true", JsonRequestBehavior.AllowGet);
            }
        }




    }
}
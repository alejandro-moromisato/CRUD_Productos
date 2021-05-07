$(document).ready(function () {

    /* Cerrar la ventana modal con el boton escape */

    $(document).keydown(function (event) {
        if (event.keyCode == 27) {
            $('#agregarproveedor').modal('hide');
            $('#eliminarModal').modal('hide');
        }
    });

});


/* Abrir Modal */

$("#btnAgregar").click(function () {
    $("#accion").val(1);
    $("#nombre").val("");
    $('#modal').modal('show');
});

var Confirm = function (id) {
    $('#eliminarModal').modal('show');
    $('#productoId').val(id);
}

var Editar = function (id) {
    extraerDatosProducto(id);
}

$("#btnRefrescar").click(function () {
    $.preloader.start({
        modal: true,
        src: 'sprites2.png'
    });

    setTimeout(function () {
        $.preloader.stop();
    }, 3000);

    listarProductos();


});


/* Acciones */

function extraerDatosProducto(id) {

    var _id = id;

    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: "{ id: " + JSON.stringify(_id) + " }",
        url: 'Producto/ListarProductoxId',
        success: function (data) {
            var data = JSON.parse(data);
            $("#nombre").val(data[0].nombre_producto);
            $("#precio").val(data[0].precio_unitario);
            $("#cantidad").val(data[0].cantidad);
            $("#detalle").val(data[0].detalle);
            $('#productoId').val(_id);
            $("#accion").val(2);
            $('#modal').modal('show');

        },
        error: function (result) {
            toastr.warning('Ocurrio un error inesperado', 'Mensaje', { timeOut: 3000 });
        }
    })

}

function listarProductos() {

    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: 'Producto/ListarProductos',
        success: function (data) {
            var data = JSON.parse(data);
            $("#bodytable").empty();

            for (var i = 0; i < data.length; i++) {
                $("#bodytable").append(
                    "<tr>" +
                    "<td>" + data[i].nombre_producto + "</td>" +
                    "<td>" + data[i].precio_unitario + "</td>" +
                    "<td>" + data[i].cantidad + "</td>" +
                    "<td>" + data[i].fecha_registro + "</td>" +
                    "<td>" + data[i].detalle + "</td>" +
                    "<td> <a class='btn btn-warning btn-sm' onclick='Editar(" + data[i].id_producto + ")'>Actualizar</a>" +
                    " <a class='btn btn-danger btn-sm' onclick='Confirm(" + data[i].id_producto + ")'>Eliminar</a>  </td > " +
                    "</tr>");

            }

        },
        error: function (result) {
            toastr.warning('Ocurrio un error inesperado', 'Mensaje', { timeOut: 3000 }); alert("Error");
        }
    })

}



$('#btnGuardar').click(function () {

    var accion = $("#accion").val();
    var _nombre = $("#nombre").val();
    var _precio = $("#precio").val();
    var _cantidad = $("#cantidad").val();
    var _detalle = $("#detalle").val();

    if ((_nombre.trim()).length == 0) {
        $.notify("Debe de ingresar el nombre del producto", "error");
        return false;
    }

    if ((_precio.trim()).length == 0) {
        $.notify("Debe de ingresar el precio del producto", "error");
        return false;
    }

    if ((_cantidad.trim()).length == 0) {
        $.notify("Debe de ingresar la cantidad del producto", "error");
        return false;
    }

    if (parseInt(_precio) == 0) {
        $.notify("El precio del producto debe ser mayor a 0", "error");
        return false;
    }


    if (parseInt(_cantidad) == 0) {
        $.notify("La cantidad del producto debe ser mayor a 0", "error");
        return false;
    }



    if (accion == "1") {

        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: "{ nombre: " + JSON.stringify(_nombre) + ", precio: " + JSON.stringify(_precio) + ", cantidad: " + JSON.stringify(_cantidad) + ", detalle: " + JSON.stringify(_detalle) + " }",
            url: 'Producto/AgregarProducto',
            success: function (data) {
                toastr.success('Registro agregado correctamente', 'Mensaje', { timeOut: 5000 });
                $("#accion").val(0);
                listarProductos();
                $('#modal').modal('hide');
            },
            error: function (result) {
                toastr.warning('Ocurrio un error al momento de enviar los datos', 'Mensaje', { timeOut: 5000 });
            }
        })

    }
    else {

        var _id = $('#productoId').val();

        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: "{ id: " + JSON.stringify(_id) + ", nombre : " + JSON.stringify(_nombre) + ", precio: " + JSON.stringify(_precio) + ", cantidad: " + JSON.stringify(_cantidad) + ", detalle: " + JSON.stringify(_detalle) + " }",
            url: 'Producto/ActualizarProducto',
            success: function (data) {
                toastr.success('Registro actualizado correctamente', 'Mensaje', { timeOut: 5000 });
                $("#accion").val(0);
                listarProductos();
                $('#modal').modal('hide');
            },
            error: function (result) {
                toastr.warning('Ocurrio un error al momento de enviar los datos', 'Mensaje', { timeOut: 5000 });
            }
        })
    }


});


$("#btnEliminar").click(function () {

    var _id = $('#productoId').val();

    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: "{ id: " + JSON.stringify(_id) + "}",
        url: 'Producto/EliminarProducto',
        success: function (data) {
            toastr.success('Registro eliminado correctamente', 'Mensaje', { timeOut: 5000 });
            listarProductos();
            $('#eliminarModal').modal('hide');
            $('#productoId').val("");
        },
        error: function (result) {
            toastr.warning('Ocurrio un error al momento de eliminar los datos', 'Mensaje', { timeOut: 5000 });
        }
    })

});

/*Validaciones*/

$('#precio').blur(function () {

    var _precio = $('#precio').val();
    var numero = parseInt(_precio);

    if (isNaN(numero)) {
        $('#precio').val("0.00");
    }
    else {
        $('#precio').val(_precio);
    }

});


$('#cantidad').blur(function () {

    var _cantidad = $('#cantidad').val();
    var numero = parseInt(_cantidad);

    if (isNaN(numero)) {
        $('#cantidad').val("0");
    }
    else {
        $('#cantidad').val(_cantidad);
    }

});

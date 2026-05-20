// Referencias a elementos del formulario.
const formulario = document.getElementById("formProducto");
const inputId = document.getElementById("productoId");
const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const selectCategoria = document.getElementById("categoria");
const inputDisponible = document.getElementById("disponible");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");

// Referencias a elementos donde se muestra informacion.
const tablaProductos = document.getElementById("tablaProductos");
const mensaje = document.getElementById("mensaje");
const totalProductos = document.getElementById("totalProductos");

// Muestra un mensaje en pantalla y marca si es error.
function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.classList.toggle("error", tipo === "error");
}

// Limpia el formulario y reinicia el modo agregar.
function limpiarFormulario() {
    formulario.reset();
    inputId.value = "";
    inputDisponible.checked = true;
    productoEnEdicion = null;
    btnGuardar.textContent = "Agregar producto";
}

// Lee los valores escritos en el formulario.
function obtenerDatosFormulario() {
    return {
        id: Number(inputId.value),
        nombre: inputNombre.value.trim(),
        precio: Number(inputPrecio.value),
        categoria: selectCategoria.value,
        disponible: inputDisponible.checked
    };
}

// Valida que los datos obligatorios esten completos.
function validarProducto(producto) {
    if (producto.nombre === "" || producto.precio <= 0 || producto.categoria === "") {
        mostrarMensaje("Completa nombre, precio y categoria del producto.", "error");
        return false;
    }

    return true;
}

// Dibuja todos los productos dentro de la tabla.
function renderizarProductos() {
    // Obtiene los productos desde la logica principal.
    let lista = obtenerProductos();

    // Limpia la tabla antes de volver a llenarla.
    tablaProductos.innerHTML = "";

    // Actualiza el contador superior.
    totalProductos.textContent = lista.length;

    // Muestra una fila especial si no hay productos.
    if (lista.length === 0) {
        tablaProductos.innerHTML = `
            <tr>
                <td class="vacio" colspan="6">No hay productos registrados.</td>
            </tr>
        `;
        return;
    }

    // Recorre cada producto para crear su fila.
    lista.forEach(function(producto) {
        let fila = document.createElement("tr");

        // Texto y clase visual segun disponibilidad.
        let estadoTexto = producto.disponible ? "Disponible" : "No disponible";
        let estadoClase = producto.disponible ? "disponible" : "no-disponible";

        // Contenido HTML de cada fila de producto.
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.categoria}</td>
            <td><span class="estado ${estadoClase}">${estadoTexto}</span></td>
            <td>
                <div class="acciones">
                    <button class="btn btn-editar" type="button" data-accion="editar" data-id="${producto.id}">Editar</button>
                    <button class="btn btn-eliminar" type="button" data-accion="eliminar" data-id="${producto.id}">Eliminar</button>
                </div>
            </td>
        `;

        // Agrega la fila terminada a la tabla.
        tablaProductos.appendChild(fila);
    });
}

// Carga los datos de un producto en el formulario para editarlo.
function cargarProducto(id) {
    // Busca el producto seleccionado.
    let producto = buscarProducto(id);

    // Si no existe, muestra error.
    if (!producto) {
        mostrarMensaje("Producto no encontrado.", "error");
        return;
    }

    // Guarda el ID y llena los campos con los datos actuales.
    productoEnEdicion = id;
    inputId.value = producto.id;
    inputNombre.value = producto.nombre;
    inputPrecio.value = producto.precio;
    selectCategoria.value = producto.categoria;
    inputDisponible.checked = producto.disponible;
    btnGuardar.textContent = "Guardar cambios";
    mostrarMensaje("Editando producto: " + producto.nombre + ".");
}

// Guarda un producto nuevo o actualiza uno existente.
function guardarProducto(evento) {
    // Evita que el formulario recargue la pagina.
    evento.preventDefault();

    // Obtiene los datos escritos por el usuario.
    let datos = obtenerDatosFormulario();

    // Detiene el proceso si los datos no son validos.
    if (!validarProducto(datos)) {
        return;
    }

    // Si no hay producto en edicion, se crea uno nuevo.
    if (productoEnEdicion === null) {
        agregarProducto(datos.nombre, datos.precio, datos.categoria, datos.disponible);
        mostrarMensaje("Producto agregado correctamente.");
    } else {
        // Si hay producto en edicion, se actualiza.
        editarProducto(datos.id, datos.nombre, datos.precio, datos.categoria, datos.disponible);
        mostrarMensaje("Producto editado correctamente.");
    }

    // Limpia el formulario y actualiza la tabla.
    limpiarFormulario();
    renderizarProductos();
}

// Detecta si se presiono Editar o Eliminar dentro de la tabla.
function manejarAccionesTabla(evento) {
    // Busca el boton mas cercano al clic.
    let boton = evento.target.closest("button");

    // Si el clic no fue sobre un boton, no hace nada.
    if (!boton) {
        return;
    }

    // Lee el ID y la accion guardados en el boton.
    let id = Number(boton.dataset.id);
    let accion = boton.dataset.accion;

    // Carga el producto para editarlo.
    if (accion === "editar") {
        cargarProducto(id);
    }

    // Elimina el producto seleccionado.
    if (accion === "eliminar") {
        eliminarProducto(id);
        limpiarFormulario();
        renderizarProductos();
        mostrarMensaje("Producto eliminado correctamente.");
    }
}

// Evento para guardar cuando se envia el formulario.
formulario.addEventListener("submit", guardarProducto);

// Evento para limpiar el formulario al presionar cancelar.
btnCancelar.addEventListener("click", function() {
    limpiarFormulario();
    mostrarMensaje("Formulario limpio.");
});

// Evento para manejar botones dentro de la tabla.
tablaProductos.addEventListener("click", manejarAccionesTabla);

// Primera carga de productos al abrir la pagina.
renderizarProductos();

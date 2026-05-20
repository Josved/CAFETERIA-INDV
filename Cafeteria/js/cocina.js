// Guarda el ID del producto que se esta editando.
let productoEnEdicion = null;

// Calcula el siguiente ID disponible para un producto nuevo.
function obtenerSiguienteId() {
    // Si no hay productos, el primer ID sera 1.
    if (productos.length === 0) {
        return 1;
    }

    // Obtiene todos los ID actuales.
    let ids = productos.map(function(producto) {
        return producto.id;
    });

    // Regresa el ID mayor mas uno.
    return Math.max(...ids) + 1;
}

// Crea un nuevo producto y lo agrega al array.
function agregarProducto(nombre, precio, categoria, disponible) {
    // Objeto que representa el producto.
    let nuevoProducto = {
        id: obtenerSiguienteId(),
        nombre: nombre,
        precio: precio,
        categoria: categoria,
        disponible: disponible
    };

    // Agrega el producto al array principal.
    productos.push(nuevoProducto);
    console.log("Producto agregado:", nuevoProducto);
}

// Regresa la lista completa de productos.
function obtenerProductos() {
    return productos;
}

// Busca un producto por su ID.
function buscarProducto(id) {
    return productos.find(function(producto) {
        return producto.id === id;
    });
}

// Edita los datos de un producto existente.
function editarProducto(id, nuevoNombre, nuevoPrecio, nuevaCategoria, nuevaDisponibilidad) {
    // Primero se busca el producto a editar.
    let producto = buscarProducto(id);

    // Si no existe, se detiene la funcion.
    if (!producto) {
        return false;
    }

    // Se actualizan las propiedades del producto.
    producto.nombre = nuevoNombre;
    producto.precio = nuevoPrecio;
    producto.categoria = nuevaCategoria;
    producto.disponible = nuevaDisponibilidad;

    console.log("Producto editado:", producto);
    return true;
}

// Elimina un producto usando su ID.
function eliminarProducto(id) {
    // Guarda la cantidad antes de eliminar.
    let cantidadInicial = productos.length;

    // Filtra el array dejando fuera el producto eliminado.
    productos = productos.filter(function(producto) {
        return producto.id !== id;
    });

    // Regresa true si se elimino algun producto.
    console.log("Producto eliminado con ID:", id);
    return productos.length < cantidadInicial;
}

// Muestra los productos en consola para revisar el array.
function listarProductos() {
    console.log("Lista de productos:");

    // Recorre cada producto y muestra sus datos principales.
    productos.forEach(function(producto) {
        console.log(producto.id + " - " + producto.nombre + " - $" + producto.precio);
    });

    // Tambien regresa el array completo.
    return productos;
}

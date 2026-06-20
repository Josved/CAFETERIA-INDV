let productos = [
  { nombre: "Torta", precio: 35, categoria: "comida" },
  { nombre: "Hamburguesa", precio: 80, categoria: "comida" },
  { nombre: "Agua", precio: 15, categoria: "bebida" },
  { nombre: "Café", precio: 25, categoria: "bebida" },
  { nombre: "Pastel", precio: 45, categoria: "postre" },
  { nombre: "Pay de queso", precio: 55, categoria: "postre" }
];


// array.filter(function(elemento) {
//   return condicion;
// });


// array.filter(elemento => condicion);



// let productosBaratos = productos.filter(producto => producto.precio < 40);

// let productosCaros = productos.filter(producto => producto.precio >= 50);


// console.log("Lista de PRODUCTOS CAROS: ", productosCaros);

// console.log("Lista de PRODUCTOS BARATOS: ", productosBaratos);



// let bebidas = productos.filter(producto => producto.categoria === "bebida");

// console.log("Lista de todas las BEBIDAS",bebidas);



// let postres = productos.filter(producto => producto.categoria === "postre");

// console.log(postres);

// array.find(function(elemento) {
//   return condicion;
// });



// array.find(elemento => condicion);



// let productoEncontrado = productos.find(producto => producto.nombre === "Café");

// console.log(productoEncontrado);



// let primerProductoCaro = productos.find(producto => producto.precio >= 50);

// console.log(primerProductoCaro);



// let buscarPizza = productos.find(producto => producto.nombre === "Pizza");

// console.log(buscarPizza);
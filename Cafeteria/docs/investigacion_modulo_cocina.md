# Modulo Cocina - estructura e investigacion breve

## Objetivo del modulo

El modulo Cocina se encargara de gestionar los productos del menu de la cafeteria. En esta primera etapa el trabajo se enfocara en JavaScript basico: objetos, propiedades, arrays y funciones. La idea es validar primero la logica con `console.log()` antes de conectarla completamente con la interfaz HTML.

## Estructura propuesta

```text
Cafeteria/
|
+-- cocina.html
+-- css/
|   +-- cocina.css
+-- js/
    +-- productos.js
    +-- cocina.js
    +-- cocinaDOM.js
```

## Responsabilidad de cada archivo

| Archivo | Responsabilidad |
| --- | --- |
| `cocina.html` | Pantalla principal del modulo Cocina. Carga el CSS y los scripts de JavaScript. |
| `css/cocina.css` | Estilos visuales del formulario, botones, tarjetas y lista de productos. |
| `js/productos.js` | Array principal de productos y objetos base del menu. |
| `js/cocina.js` | Funciones principales: agregar, listar, editar y eliminar productos. |
| `js/cocinaDOM.js` | Conexion entre la logica y la pantalla. Se usara en la segunda etapa. |

El orden de carga recomendado en HTML es:

```html
<script src="./js/productos.js"></script>
<script src="./js/cocina.js"></script>
<script src="./js/cocinaDOM.js"></script>
```

Primero se cargan los datos, despues la logica y al final la parte que interactua con el documento HTML.

## Investigacion breve

### Objetos en JavaScript

Un objeto permite agrupar datos relacionados usando propiedades. Para este proyecto, cada producto puede representarse como un objeto con `id`, `nombre`, `precio`, `categoria` y `disponible`.

```js
let producto = {
  id: 1,
  nombre: "Hamburguesa",
  precio: 85,
  categoria: "Comida",
  disponible: true
};
```

Esto ayuda a trabajar con productos completos, no solo con valores sueltos.

### Arrays

Un array permite guardar varios elementos en una sola variable. En el modulo Cocina se usara para almacenar todos los productos del menu.

```js
let productos = [
  { id: 1, nombre: "Hamburguesa", precio: 85, categoria: "Comida", disponible: true },
  { id: 2, nombre: "Agua de horchata", precio: 30, categoria: "Bebida", disponible: true }
];
```

Con un array se pueden recorrer, agregar, buscar, editar o eliminar productos.

### Funciones

Las funciones separan tareas especificas del programa. En este modulo se proponen funciones como:

- `agregarProducto()`: crea un producto y lo guarda en el array.
- `listarProductos()`: muestra los productos disponibles.
- `editarProducto()`: modifica los datos de un producto existente.
- `eliminarProducto()`: quita un producto del array.

Esta separacion vuelve el codigo mas facil de probar y explicar.

### DOM

El DOM representa la estructura del HTML como objetos que JavaScript puede leer o modificar. Por eso se dejara `cocinaDOM.js` para una segunda etapa: cuando la logica ya funcione en consola, se conectaran formularios, botones y listas visuales.

## Primera etapa

En la primera etapa se probara la logica desde la consola del navegador:

- Crear productos usando objetos.
- Guardar productos en un array.
- Usar propiedades como nombre, precio, categoria y disponibilidad.
- Agregar productos.
- Editar productos.
- Eliminar productos.
- Listar productos con `console.log()`.

## Etapa posterior

Despues se conectara la logica con HTML y CSS. En esa etapa se agregara o ajustara el formulario para capturar productos y se usaran botones para editar, eliminar y listar productos directamente en pantalla.

## Fuentes consultadas

- MDN Web Docs: JavaScript Objects - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects
- MDN Web Docs: Array - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- MDN Web Docs: Document Object Model - https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Using_the_Document_Object_Model

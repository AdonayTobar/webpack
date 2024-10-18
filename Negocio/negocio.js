// Recuperar el negocio seleccionado del localStorage
const negocioSeleccionado = JSON.parse(localStorage.getItem('negocioSeleccionado'));
const contenedorMenu = document.getElementById('contenedor-menu');
const carrito = JSON.parse(localStorage.getItem('carrito')) || {};

// Mostrar el menú del negocio seleccionado dividido por categorías
function mostrarMenu() {
    contenedorMenu.innerHTML = ''; // Limpiar contenedor
    for (const categoria in negocioSeleccionado.menu) {
        const categoriaDiv = document.createElement('div');
        categoriaDiv.className = 'categoria';
        categoriaDiv.innerHTML = `<h3>${categoria}</h3>`;

        negocioSeleccionado.menu[categoria].forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.className = 'producto';
            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h4>${producto.nombre}</h4>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            `;
            categoriaDiv.appendChild(productoDiv);
        });

        contenedorMenu.appendChild(categoriaDiv);
    }
}

// Función para agregar productos al carrito
function agregarAlCarrito(idProducto) {
    const producto = Object.values(negocioSeleccionado.menu)
        .flat()
        .find(p => p.id === idProducto);

    const nombreNegocio = negocioSeleccionado.nombre;
    if (!carrito[nombreNegocio]) {
        carrito[nombreNegocio] = [];
    }
    carrito[nombreNegocio].push(producto);

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Producto "${producto.nombre}" agregado al carrito.`);
}

// Llamar a la función para mostrar el menú del negocio seleccionado
mostrarMenu();

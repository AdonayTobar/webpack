// Código del menú para ocultar/mostrar al hacer scroll
let prevScrollPos = window.pageYOffset;
const menu = document.querySelector('.menu-prin');

window.onload = function() {
    menu.style.top = "0";
};

window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 30) {
        menu.style.top = (prevScrollPos < currentScrollPos) ? "-500px" : "0";
    } else {
        menu.style.top = "0";
    }
    prevScrollPos = currentScrollPos;
};

// Recuperar el negocio seleccionado del localStorage
const negocioSeleccionado = JSON.parse(localStorage.getItem('negocioSeleccionado'));

const contenedorMenu = document.getElementById('product-list'); // Contenedor para mostrar los productos por categorias
// Función para mostrar el menú del negocio seleccionado dividido por categorías
function mostrarMenu() {
    contenedorMenu.innerHTML = ''; // Limpiar el contenedor

    // Iterar por cada categoría en el menú del negocio seleccionado
    for (const categoria in negocioSeleccionado.menu) {
        const categoriaContainer = document.createElement('div');
        categoriaContainer.className = 'categoria-container'; // Contenedor para cada categoría

        // Título de la categoría
        const tituloCategoria = document.createElement('h3');
        tituloCategoria.textContent = categoria;
        categoriaContainer.appendChild(tituloCategoria);

        // Contenedor para los productos de la categoría
        const productosContainer = document.createElement('div');
        productosContainer.className = 'productos-container'; // Contenedor para productos

        // Crear cada tarjeta de producto dentro de esta categoría
        negocioSeleccionado.menu[categoria].forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.className = 'product-card';
            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" onclick="ampliarImagen('${producto.imagen}')">
                <h4>${producto.nombre}</h4>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            `;
            productosContainer.appendChild(productoDiv);
        });

        // Añadir los productos agrupados debajo del título de la categoría
        categoriaContainer.appendChild(productosContainer);
        contenedorMenu.appendChild(categoriaContainer);
    }
}


// Llamar a la función para mostrar el menú al cargar la página
mostrarMenu();

//Esto es para el modal
// Función para abrir el modal y mostrar la imagen ampliada
function ampliarImagen(src) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  
  modal.style.display = "block";
  modalImg.src = src;
}

// Función para cerrar el modal
document.getElementById('close-modal').onclick = function() {
  document.getElementById('image-modal').style.display = "none";
}

// Cerrar el modal cuando se hace clic fuera de la imagen
window.onclick = function(event) {
  const modal = document.getElementById('image-modal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// Cargar el carrito desde localStorage si existe
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];



// Función para agregar producto al carrito
function agregarAlCarrito(idProducto) {
    let productoSeleccionado = null;

    // Buscar el producto en cada categoría del menú
    for (const categoria in negocioSeleccionado.menu) {
        productoSeleccionado = negocioSeleccionado.menu[categoria].find(
            producto => producto.id === idProducto
        );
        if (productoSeleccionado) break; // Si se encuentra, salir del bucle
    }

    if (!productoSeleccionado) {
        console.error('Producto no encontrado.');
        return;
    }

    // Buscar si el negocio ya está en el carrito
    let negocioEnCarrito = carrito.find(item => item.negocioId === negocioSeleccionado.id);

    if (negocioEnCarrito) {
        // Buscar si el producto ya está en ese negocio
        const productoEnNegocio = negocioEnCarrito.productos.find(
            producto => producto.id === idProducto
        );

        if (productoEnNegocio) {
            // Si el producto ya está, aumentar la cantidad
            productoEnNegocio.cantidad += 1;
        } else {
            // Agregar el producto al array de productos del negocio
            negocioEnCarrito.productos.push({ ...productoSeleccionado, cantidad: 1 });
        }
    } else {
        // Agregar un nuevo negocio con el producto seleccionado
        carrito.push({
            negocioId: negocioSeleccionado.id,
            nombreNegocio: negocioSeleccionado.nombre,
            productos: [{ ...productoSeleccionado, cantidad: 1 }]
        });
    }

    // Guardar el carrito actualizado en localStorage
    guardarCarrito();
}

// Función para actualizar el carrito (en la página secundaria, si aplica)
function actualizarCarrito() {
    const cartCount = document.getElementById('cart-count');
    
    // Verificar que el cartCount existe
    if (!cartCount) {
        console.error('Elemento cart-count no encontrado.');
        return;
    }

    // Contar el total de productos en todos los negocios
    const totalItems = carrito.reduce((total, negocio) => {
        const productosEnNegocio = negocio.productos.reduce((subtotal, producto) => subtotal + producto.cantidad, 0);
        return total + productosEnNegocio;
    }, 0);

    cartCount.textContent = totalItems;
}

function actualizarCarrito() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = carrito.reduce((total, negocio) => {
        return total + negocio.productos.reduce((subtotal, producto) => subtotal + producto.cantidad, 0);
    }, 0);
    cartCount.textContent = totalItems;
}

// Guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Llamar a la función para actualizar el contador cuando cargue la página secundaria
actualizarCarrito();


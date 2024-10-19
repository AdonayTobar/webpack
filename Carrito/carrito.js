// Obtener el carrito del localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Recuperar el array de negocios de localStorage
const negocios = JSON.parse(localStorage.getItem('negocios')) || [];

// Referencias a elementos del DOM
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
  cartItems.innerHTML = '';
  let total = 0;

  carrito.forEach((negocio, negocioIndex) => {
    cartItems.innerHTML += `<h2>${negocio.nombreNegocio}</h2>`;
    
    negocio.productos.forEach((producto, productoIndex) => {
      total += producto.precio * producto.cantidad;
      cartItems.innerHTML += `
        <div class="cart-item">
          <div class="item-info">
              <img src="${producto.imagen}" alt="${producto.nombre}">
              <h3>${producto.nombre}</h3>
          </div>
          <p>Precio: $${producto.precio.toFixed(2)}</p>
          <p>
              Cantidad: 
              <input type="number" value="${producto.cantidad}" min="1" onchange="actualizarCantidad(${negocioIndex}, ${productoIndex}, this.value)">
          </p>
          <button onclick="eliminarProducto(${negocioIndex}, ${productoIndex})">X</button>
        </div>

      `;
    });
  });

  totalPrice.textContent = total.toFixed(2);
}

// Función para actualizar la cantidad de un producto
function actualizarCantidad(negocioIndex, productoIndex, cantidad) {
  carrito[negocioIndex].productos[productoIndex].cantidad = parseInt(cantidad);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(negocioIndex, productoIndex) {
  carrito[negocioIndex].productos.splice(productoIndex, 1);

  // Si no hay más productos en el negocio, eliminar el negocio del carrito
  if (carrito[negocioIndex].productos.length === 0) {
    carrito.splice(negocioIndex, 1);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

// Función para agrupar productos por tienda
function agruparProductosPorTienda(carrito, negocios) {
  const productosAgrupados = {};

  carrito.forEach(negocio => {
    productosAgrupados[negocio.nombreNegocio] = negocio.productos;
  });

  console.log('Productos agrupados por tienda:', productosAgrupados); // Debugging line
  return productosAgrupados;
}

// Función para finalizar la compra
document.getElementById('checkout-btn').addEventListener('click', () => {
  // Obtener datos del formulario
  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;
  const ubicacion = document.getElementById('ubicacion').value;
  const instrucciones = document.getElementById('instrucciones').value;

  // Validar que los campos no estén vacíos
  if (!nombre || !telefono || !ubicacion) {
    alert('Por favor, rellena todos los campos obligatorios.');
    return;
  }

  // Agrupar productos por tienda
  const productosPorTienda = agruparProductosPorTienda(carrito, negocios);

  // Crear el mensaje del pedido
let mensaje = '';
let totalGeneral = 0;


mensaje += `    *PackSeguro Delivery*\n\n`;
for (const [tiendaNombre, productos] of Object.entries(productosPorTienda)) {
    let totalTienda = productos.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    totalGeneral += totalTienda; // Sumar el total de la tienda al total general

    mensaje += `⚪ *${tiendaNombre}*\n`;
    mensaje += productos.map(item => `  - ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`).join('\n') + `\n`;
    mensaje += `  *Sub-Total:* $${totalTienda.toFixed(2)}\n\n`;
}

// Añadir datos del cliente al mensaje final
mensaje += `*Datos del cliente:*\n`;
mensaje += `  Nombre: ${nombre}\n`;
mensaje += `  Teléfono: ${telefono}\n`;
mensaje += `  Dirección: ${ubicacion}\n`;
mensaje += `  Instrucciones adicionales: ${instrucciones}\n\n`;
mensaje += ` Costo de Delivery: $0.00\n\n`;
mensaje += `*Total General:* $${totalGeneral.toFixed(2)}\n\n`;
mensaje += `*El costo de delivery lo pondrá nuestro agente de Call Center*`;

const numeroWhatsApp = '72757591';
const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

// Abrir WhatsApp con el mensaje
window.open(urlWhatsApp, '_blank');


  // Limpiar el carrito después de finalizar la compra
  carrito = [];
  localStorage.removeItem('carrito');
  mostrarCarrito();
});

// Inicializar la página mostrando el carrito
mostrarCarrito();





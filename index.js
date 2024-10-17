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

const negocios = [
  {
    id: 1,
    nombre: 'Pizza Little Caesars',
    categorias: ['Pizza', 'Almuerzo'],
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoaORguKiAaXYq2m3P73HXpKEvSZ3bsA5R5A&s',
    url: '/Cesar/cesar.html',
    menu: {
      Pizza: [
        { id: 1, nombre: 'Pizza Pepperoni', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2021/01/Pepperoni.jpg', precio: 5.00 },
        { id: 2, nombre: 'Pizza Jamon', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2021/01/Jamon.jpg', precio: 5.00 },
        { id: 3, nombre: 'Super Cheese Gigante', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2022/07/Super-Cheese.jpg', precio: 7.75 },
        { id: 4, nombre: 'Cheeser Gigante', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2021/03/Cheeser.jpg', precio: 4.50 },
        { id: 5, nombre: 'Deluxe 4N1 Cheesy Cheddar', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2024/07/4N1-cheesy-cheddar.jpg', precio: 7.75 },
        { id: 6, nombre: 'Ultimate Supreme', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2022/07/Ultimate-Supreme.jpg', precio: 8.95 },
        { id: 7, nombre: '3 Meat Treat', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2022/07/3-Meat-Treat.jpg', precio: 8.95 },
        { id: 8, nombre: 'Hula-Hawaiian', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2023/12/Hula-Hawaiian.png', precio: 8.50 }
      ],
      Extras: [
        { id: 9, nombre: 'Crazy Bread', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2022/07/CRAZY-BREAD.jpg', precio: 2.25 },
        { id: 10, nombre: 'Canelitas', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2022/07/Canelitas.jpg', precio: 2.50 },
        { id: 11, nombre: 'Crazy Cheese Bread', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2023/12/Crazy-cheese-bread.png', precio: 3.50 },
        { id: 12, nombre: 'Crazy Puffs', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2024/04/Crazy-Puffs-QT.jpg', precio: 2.99 }
      ]
    }
  },
  {
    id: 2,
    nombre: 'Subway',
    categorias: ['Almuerzo'],
    logo: '/Subway/LogoSubway.png',
    url: '/Subway/subway.html',
    menu: {
      Almuerzo: [
        { id: 11, nombre: 'Subway2', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2021/01/Pepperoni.jpg', precio: 6.00 },
        { id: 22, nombre: 'Subway3', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2021/01/Jamon.jpg', precio: 7.00 },
        { id: 33, nombre: 'Subway1', imagen: 'https://pizzapizza.com.sv/wp-content/uploads/2022/07/Super-Cheese.jpg', precio: 7.75 }
      ]
    }
  }
];

// Mostrando los negocios en la sección "negocios-afiliados"
const contenedor = document.getElementById('negocios-afiliados');
const searchInput = document.getElementById('search'); // Input buscador

// Función para mostrar todos los negocios en el contenedor
function mostrarNegocios(negocios) {
    contenedor.innerHTML = '';
    negocios.forEach(negocio => {
        const negocioDiv = document.createElement('div');
        negocioDiv.className = 'negocio';
        negocioDiv.innerHTML = `
            <img src="${negocio.logo}" alt="${negocio.nombre}" class="negocio-logo">
            <h3>${negocio.nombre}</h3>
            <p>Categorías: ${negocio.categorias.join(', ')}</p>
            <a href="${negocio.url}" class="ver-mas">Ver más</a>
        `;
        contenedor.appendChild(negocioDiv);
    });
}
// Mostrar todos los negocios al cargar la página
mostrarNegocios(negocios);
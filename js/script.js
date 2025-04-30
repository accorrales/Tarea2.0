// ===== CONSTANTES Y VARIABLES GLOBALES =====
const SLIDER_INTERVAL_TIME = 5000; // 5 segundos entre slides
let currentSlide = 0;
let sliderInterval;

// ===== FUNCIONES PRINCIPALES =====

/**
 * Muestra una sección específica y oculta las demás
 * @param {string} id - ID de la sección a mostrar
 */
function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach((seccion) => {
    seccion.classList.remove("activa");
  });

  const target = document.getElementById(id);
  if (target) {
    target.classList.add("activa");

    // Reiniciar el slider cuando se muestra la sección de inicio
    if (id === "inicio") {
      iniciarSlider();
    } else {
      detenerSlider();
    }
  }
}
// Cargar navbar
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-placeholder").innerHTML = data;

    // Esperar a que se inserte el HTML para agregar eventos
    activarBotonesMenu();
  });

// Cargar footer
fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });
/**
 * Inicia el slider automático
 */
function iniciarSlider() {
  const slides = document.querySelector(".slides");
  const totalSlides = document.querySelectorAll(".slide").length;

  if (!slides || totalSlides === 0) return;

  detenerSlider();

  sliderInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  }, SLIDER_INTERVAL_TIME);
}

/**
 * Detiene el slider automático
 */
function detenerSlider() {
  if (sliderInterval) {
    clearInterval(sliderInterval);
  }
}

/**
 * Cambia al slide siguiente/anterior
 * @param {number} direction - 1 para siguiente, -1 para anterior
 */
function cambiarSlide(direction) {
  const slides = document.querySelector(".slides");
  const totalSlides = document.querySelectorAll(".slide").length;

  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Reiniciar el intervalo después de un cambio manual
  iniciarSlider();
}
function mostrarRestaurante(restauranteId) {
  // Oculta lista de restaurantes
  const lista = document.getElementById("restaurantes");
  if (lista) lista.style.display = "none";

  // Oculta todos los detalles
  document
    .querySelectorAll(".restaurante-detalle")
    .forEach((r) => (r.style.display = "none"));

  // Muestra el restaurante seleccionado
  const detalle = document.getElementById(restauranteId);
  if (detalle) {
    detalle.style.display = "block";
    detalle.scrollIntoView({ behavior: "smooth" });
  }
}

function volverArestaurantes() {
  // Oculta todos los detalles
  document
    .querySelectorAll(".restaurante-detalle")
    .forEach((r) => (r.style.display = "none"));

  // Muestra la lista
  const lista = document.getElementById("restaurantes");
  if (lista) {
    lista.style.display = "block";
    lista.scrollIntoView({ behavior: "smooth" });
  }
}

function cambiarContenido(id, event) {
  // Actualizar clases activas
  document.querySelectorAll(".contenido-seccion").forEach((seccion) => {
    seccion.classList.remove("activo");
  });
  document.getElementById(id).classList.add("activo");

  // Actualizar botones activos
  document.querySelectorAll(".menu-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }
}

// ===== CONTENIDO DINÁMICO =====
const contenidoSecciones = {
  promociones: `
        <div class="menu-categoria">
            <h3 class="categoria-titulo">Promociones Especiales</h3>
            <div class="promo-grid">
                <div class="promo-item">
                    <img src="images/PromocionTodosDias.jpg" alt="Promoción 1" class="promo-imagen">
                   
                </div>
                
                </div>
            </div>
        </div>
    `,
  pizzas: `
        <div class="menu-categoria">
            <h3 class="categoria-titulo">Nuestras Pizzas</h3>
            <div class="pizza-list">
                ${[
                  {
                    nombre: "Jamón & Hongos",
                    precio: "₡5,900",
                    img: "pizza-jamon-champinones-aislado-fondo-blanco_711700-428.avif",
                  },
                  {
                    nombre: "Hawaiana",
                    precio: "₡6,200",
                    img: "pizzahawainna.jpg",
                  },
                  {
                    nombre: "Brasileña",
                    precio: "₡6,500",
                    img: "pizza-brasileña-aislado-en-fondo-blanco-185101613 (1).jpg",
                  },
                  {
                    nombre: "Super Suprema",
                    precio: "₡7,000",
                    img: "supersuprema-1192094401-612x612.jpg",
                  },
                  {
                    nombre: "Veggie Lovers",
                    precio: "₡6,800",
                    img: "pizza-vegetariana-pimientos.avif",
                  },
                  {
                    nombre: "Cheese Lovers",
                    precio: "₡6,500",
                    img: "pizza_cheeselover (1).jpg",
                  }, // ✅ Corregido
                  {
                    nombre: "Napolitana",
                    precio: "₡6,700",
                    img: "istockphoto-671200808-612x612.jpg",
                  },
                ]
                  .map(
                    (pizza) => `
                    <div class="pizza-item">
                        <img src="images/${pizza.img}" alt="${pizza.nombre}" class="pizza-imagen">
                        <div class="pizza-info">
                            <h4>${pizza.nombre}</h4>
                            <p class="precio">${pizza.precio}</p>
                            <button class="btn-ordenar">Ordenar</button>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    `,
  pastas: `
        <div class="menu-categoria">
            <h3 class="categoria-titulo">Pastas Deliciosas</h3>
            <div class="pasta-list">
                ${[
                  {
                    nombre: "Spaghetti Bolognesa",
                    precio: "₡4,500",
                    img: "espaguetis-salsa-bolonesa.avif",
                  },
                  {
                    nombre: "Lasagna",
                    precio: "₡5,200",
                    img: "lasagna-sobre-fondo.avif",
                  },
                  {
                    nombre: "Penne Alfredo",
                    precio: "₡4,800",
                    img: "penneAlfredo.jpg",
                  },
                  {
                    nombre: "Ravioli de Queso",
                    precio: "₡5,500",
                    img: "ravioli-pasta-italiana.avif",
                  },
                ]
                  .map(
                    (pasta) => `
                    <div class="pasta-item">
                        <img src="images/${pasta.img}" alt="${pasta.nombre}" class="pasta-imagen">
                        <div class="pasta-info">
                            <h4>${pasta.nombre}</h4>
                            <p class="precio">${pasta.precio}</p>
                            <button class="btn-ordenar">Ordenar</button>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    `,
  aperitivos: `
        <div class="menu-categoria">
            <h3 class="categoria-titulo">Aperitivos</h3>
            <div class="aperitivo-list">
                ${[
                  {
                    nombre: "Pan de Ajo",
                    precio: "₡2,000",
                    img: "panes-ajo-sobre-fondo-blanco_62856-2441.avif",
                  },
                  {
                    nombre: "Palitos de Queso",
                    precio: "₡3,000",
                    img: "palistos_de_queso.jpg",
                  },
                  {
                    nombre: "Alitas BBQ",
                    precio: "₡4,500",
                    img: "alitas-pollo-barbacoa-caliente-salsa-bbq-aislado-sobre-fondo-blanco_89816-45318.avif",
                  },
                  {
                    nombre: "Nachos Supreme",
                    precio: "₡4,800",
                    img: "nachos-delight-fondo-blanco-mejor-imagen-nachos_1020697-553798.avif",
                  },
                ]
                  .map(
                    (item) => `
                    <div class="aperitivo-item">
                        <img src="images/${item.img}" alt="${item.nombre}" class="aperitivo-imagen">
                        <div class="aperitivo-info">
                            <h4>${item.nombre}</h4>
                            <p class="precio">${item.precio}</p>
                            <button class="btn-ordenar">Ordenar</button>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    `,
  bebidas: `
        <div class="menu-categoria">
            <h3 class="categoria-titulo">Bebidas</h3>
            <div class="bebida-list">
                ${[
                  {
                    nombre: "Refrescos",
                    precio: "₡1,500",
                    img: "qwertyuiop.jpg",
                  },
                  {
                    nombre: "Cerveza Nacional",
                    precio: "₡2,500",
                    img: "cervezanacional (1).png",
                  },
                  {
                    nombre: "Jugos Naturales",
                    precio: "₡2,000",
                    img: "jugosnaturales (1).jpg",
                  },
                  {
                    nombre: "Agua Mineral",
                    precio: "₡1,200",
                    img: "agua (1).jpg",
                  },
                ]
                  .map(
                    (bebida) => `
                    <div class="bebida-item">
                        <img src="images/${bebida.img}" alt="${bebida.nombre}" class="bebida-imagen">
                        <div class="bebida-info">
                            <h4>${bebida.nombre}</h4>
                            <p class="precio">${bebida.precio}</p>
                            <button class="btn-ordenar">Ordenar</button>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    `,
};

// ===== EVENT LISTENERS =====
document.addEventListener("DOMContentLoaded", () => {
  // Menú móvil toggle
  const menuToggle = document.querySelector(".menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.querySelector(".nav-links").classList.toggle("show");
    });
  }

  // Control del slider
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => cambiarSlide(1));
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => cambiarSlide(-1));
  }

  // Cargar contenido dinámico del menú
  const contenidoContainer = document.getElementById("contenido-container");
  const contenidoTitle = document.getElementById("contenido-title");
  const contenidoBody = document.getElementById("contenido-body");

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

  // Mostrar la sección de inicio por defecto
  mostrarSeccion("inicio");
});
// Función para mostrar los detalles de un restaurante
function mostrarRestaurante(restauranteId) {
  document.getElementById("restaurantes").style.display = "none";
  const detalle = document.getElementById(restauranteId);
  if (detalle) {
    detalle.style.display = "block";
  }
  // Scroll suave hacia arriba
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Función para volver a la lista de restaurantes
function volverArestaurantes() {
  document.querySelectorAll(".restaurante-detalle").forEach((detalle) => {
    detalle.style.display = "none";
  });
  document.getElementById("restaurantes").style.display = "block";
}

// Menú móvil toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.querySelector(".nav-links").classList.toggle("show");
    });
  }
});

function activarBotonesMenu() {
  const contenidoContainer = document.getElementById("contenido-container");
  const contenidoTitle = document.getElementById("contenido-title");
  const contenidoBody = document.getElementById("contenido-body");

  if (contenidoContainer && contenidoTitle && contenidoBody) {
    document.querySelectorAll(".menu-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const section = this.getAttribute("data-section");
        contenidoTitle.textContent = this.textContent.trim();
        contenidoBody.innerHTML =
          contenidoSecciones[section] || "<p>Contenido no disponible</p>";
        contenidoContainer.style.display = "block";
        contenidoContainer.scrollIntoView({ behavior: "smooth" });
      });
    });
  }
}

function cambiarContenido(id, event) {
  // Oculta todas las secciones
  document.querySelectorAll(".contenido-seccion").forEach((seccion) => {
    seccion.style.display = "none";
  });

  // Quita la clase 'active' de todos los botones
  document.querySelectorAll(".menu-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Muestra la sección seleccionada
  const activa = document.getElementById(id);
  if (activa) {
    activa.style.display = "block";
    activa.scrollIntoView({ behavior: "smooth" });
  }

  // Agrega clase 'active' al botón que se presionó
  if (event) {
    event.currentTarget.classList.add("active");
  }
}

// Al cargar la página, mostrar solo la sección activa y ocultar las demás
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".contenido-seccion").forEach((seccion) => {
    if (
      !seccion.classList.contains("activo") &&
      !seccion.classList.contains("activa")
    ) {
      seccion.style.display = "none";
    }
  });
});

// Al cargar la página, mostrar solo la sección activa y ocultar las demás
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".contenido-seccion").forEach((seccion) => {
    if (
      !seccion.classList.contains("activo") &&
      !seccion.classList.contains("activa")
    ) {
      seccion.style.display = "none";
    }
  });
});
// ===== EXPORTAR FUNCIONES GLOBALES =====
window.mostrarSeccion = mostrarSeccion;
window.mostrarRestaurante = mostrarRestaurante;
window.volverArestaurantes = volverArestaurantes;
window.cambiarContenido = cambiarContenido;

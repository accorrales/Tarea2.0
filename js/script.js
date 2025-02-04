function mostrarSeccion(id) {
    // Ocultar todas las secciones
    document.querySelectorAll(".seccion").forEach(seccion => {
        seccion.classList.remove("activa");
    });

    // Mostrar la sección seleccionada
    document.getElementById(id).classList.add("activa");
}
document.addEventListener("DOMContentLoaded", () => {
    // 🚀 Activa el menú en móviles
    document.querySelector(".menu-toggle").addEventListener("click", function () {
        document.querySelector(".nav-links").classList.toggle("show");
    });

    // 🚀 Mostrar la sección "Nosotros" y ocultar la principal
    document.querySelector("#nosotros").addEventListener("click", () => {
        document.querySelector("#mainContent").style.display = "none";
        document.body.innerHTML += "<div id='nosotrosContent'><h2>Cargando sección Nosotros...</h2></div>";
    });

    // 🚀 Script para el slider automático
    let currentSlide = 0;
    const slides = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".slide").length;

    let sliderInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 3000); // Cambia de imagen cada 3 segundos

    const restartSliderInterval = () => {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 10000);
    };

    // 🚀 Adelantar imagen en el slider
    document.querySelector(".next").addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        restartSliderInterval();
    });

    // 🚀 Retroceder imagen en el slider
    document.querySelector(".prev").addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        restartSliderInterval();
    });
});
function mostrarRestaurante(restaurante) {
    // Ocultar todos los restaurantes y detalles
    const detalles = document.querySelectorAll('.restaurante-detalle');
    detalles.forEach(detalle => {
        detalle.style.display = 'none';
    });

    // Ocultar la lista de restaurantes
    document.getElementById('restaurantes').style.display = 'none';

    // Mostrar solo el restaurante seleccionado
    const restauranteDetalle = document.getElementById(restaurante);
    if (restauranteDetalle) {
        restauranteDetalle.style.display = 'block';
    }
}

function volverArestaurantes() {
    // Ocultar los detalles del restaurante
    const detalles = document.querySelectorAll('.restaurante-detalle');
    detalles.forEach(detalle => {
        detalle.style.display = 'none';
    });

    // Mostrar la lista de restaurantes
    document.getElementById('restaurantes').style.display = 'block';
}
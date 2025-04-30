document.addEventListener("DOMContentLoaded", () => {
  // Cargar navbar
  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      // ✅ Esperamos a que el navbar esté en el DOM para agregar eventos
      agregarEventosMenu();
    });
    // Mostrar automáticamente la sección "promociones" al cargar Menu.html
if (window.location.pathname.includes("Menu.html")) {
  setTimeout(() => {
    const promoBtn = document.querySelector('[data-section="promociones"]');
    if (promoBtn) promoBtn.click();
  }, 100);
}
});
function agregarEventosMenu() {
  const contenidoContainer = document.getElementById("contenido-container");
  const contenidoTitle = document.getElementById("contenido-title");
  const contenidoBody = document.getElementById("contenido-body");

  if (contenidoContainer && contenidoTitle && contenidoBody) {
    document.querySelectorAll(".menu-btn").forEach(button => {
      button.addEventListener("click", function () {
        const section = this.getAttribute("data-section");
        contenidoTitle.textContent = this.textContent.trim();
        contenidoBody.innerHTML = contenidoSecciones[section] || "<p>Contenido no disponible</p>";
        contenidoContainer.style.display = "block";
        contenidoContainer.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
}

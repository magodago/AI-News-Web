// Proyecto AI FUTURO - Archivo de Scripts
// Archivo: script.js

document.addEventListener("DOMContentLoaded", () => {
  let secretClicksTitle = 0;
  const titleElement = document.querySelector(".glitch");

  if (titleElement) {
    titleElement.addEventListener("click", () => {
      secretClicksTitle++;
      if (secretClicksTitle >= 5) {
        activarPortalSecreto();
        secretClicksTitle = 0; // Reinicia el contador de clics
      }
    });
  }

  function activarPortalSecreto() {
    let portal = document.getElementById("secret-portal");
    portal.innerHTML = `
      <div class="portal-content">
        <h1 class="portal-title">Sección Oculta</h1>
        <p class="portal-message">¡Has encontrado la sección oculta del Oráculo!</p>
      </div>
    `;
    portal.style.display = "flex";
  }
});

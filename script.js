document.addEventListener("DOMContentLoaded", () => {
  // 1. Cargar fuente Orbitron
  const linkOrbitron = document.createElement("link");
  linkOrbitron.rel = "stylesheet";
  linkOrbitron.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
  document.head.appendChild(linkOrbitron);

  // 2. Efecto glitch en el título
  const title = document.querySelector(".glitch");
  setInterval(() => {
    if (title) {
      title.classList.toggle("glitch-active");
    }
  }, 2000);

  // 3. Efecto Matrix dentro de la barra (height 60px)
  function iniciarEfectoMatrix() {
    const bar = document.getElementById("matrix-bar");
    const canvas = document.createElement("canvas");
    canvas.width = bar.offsetWidth;
    canvas.height = bar.offsetHeight;
    canvas.style.display = "block";
    canvas.style.position = "absolute";
    bar.style.position = "relative";
    bar.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const letters = "0123456789AI";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0ff";
      ctx.font = fontSize + "px Orbitron";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawMatrix, 50);

    // Ajustar tamaño del canvas al redimensionar la ventana
    window.addEventListener("resize", () => {
      canvas.width = bar.offsetWidth;
      canvas.height = bar.offsetHeight;
    });
  }
  iniciarEfectoMatrix();

  // 4. Cursor Futurista
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate3d(${e.pageX}px, ${e.pageY}px, 0)`;
  });

  // 5. Pop-up de noticias (estáticas)
  const popup = document.getElementById("news-popup");
  const popupTitle = document.getElementById("popup-title");
  const popupSummary = document.getElementById("popup-summary");
  const closePopupBtn = document.getElementById("close-popup");

  // Seleccionar todos los botones “Ver más”
  const verMasButtons = document.querySelectorAll(".ver-mas");
  verMasButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const t = button.getAttribute("data-title");
      const s = button.getAttribute("data-summary");

      popupTitle.textContent = t;
      popupSummary.textContent = s;
      popup.style.display = "block";
    });
  });

  // Cerrar pop-up
  closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
});

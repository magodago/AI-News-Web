document.addEventListener("DOMContentLoaded", () => {
  // 1. Cargar la fuente Orbitron
  const linkOrbitron = document.createElement("link");
  linkOrbitron.rel = "stylesheet";
  linkOrbitron.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
  document.head.appendChild(linkOrbitron);

  // 2. Efecto Glitch en el Título
  const title = document.querySelector(".glitch");
  setInterval(() => {
    title.classList.toggle("glitch-active");
  }, 2000);

  // 3. Efecto Matrix en el Fondo
  function iniciarEfectoMatrix() {
    const canvas = document.createElement("canvas");
    canvas.id = "matrixCanvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "-1";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const letters = "0123456789AI智能人工智能未来";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrixEffect() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0ff";
      ctx.font = fontSize + "px Orbitron";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reiniciar cascada en un 2.5% de probabilidad
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    setInterval(drawMatrixEffect, 50);
  }
  iniciarEfectoMatrix();

  // 4. Cursor Futurista
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate3d(${e.pageX}px, ${e.pageY}px, 0)`;
  });

  // 5. Cargar Noticias en Cajas con Botón "Ver más"
  const RSS_URL = "https://news.google.com/rss/search?q=inteligencia+artificial&hl=es&gl=ES&ceid=ES:es";
  const newsContainer = document.getElementById("news-container");
  const popup = document.getElementById("news-popup");
  const popupTitle = document.getElementById("popup-title");
  const popupSummary = document.getElementById("popup-summary");
  const popupLink = document.getElementById("popup-link");
  const closePopupBtn = document.getElementById("close-popup");

  async function cargarNoticias() {
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(RSS_URL)}`);
      const data = await response.json();
      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, "text/xml");
      const items = xml.querySelectorAll("item");

      let html = "";
      items.forEach((item, index) => {
        if (index < 5) {
          const title = item.querySelector("title")?.textContent || "Noticia sin título";
          const link = item.querySelector("link")?.textContent || "#";
          const description = item.querySelector("description")?.textContent || "Sin descripción";

          html += `
            <div class="news-box">
              <h3>${title}</h3>
              <p>${description.substring(0, 80)}...</p>
              <button class="ver-mas"
                data-title="${title}"
                data-summary="${description}"
                data-link="${link}">
                Ver más
              </button>
            </div>
          `;
        }
      });

      newsContainer.innerHTML = html;

      // Agregar el evento para abrir el pop-up
      const verMasButtons = document.querySelectorAll(".ver-mas");
      verMasButtons.forEach(button => {
        button.addEventListener("click", () => {
          const t = button.getAttribute("data-title");
          const s = button.getAttribute("data-summary");
          const l = button.getAttribute("data-link");

          popupTitle.textContent = t;
          popupSummary.textContent = s;
          popupLink.href = l;
          popup.style.display = "block";
        });
      });
    } catch (error) {
      console.error("Error al cargar noticias:", error);
      newsContainer.textContent = "No se pudieron cargar las noticias.";
    }
  }

  // Llamada inicial
  cargarNoticias();

  // Refrescar noticias cada hora (3600000 ms)
  setInterval(cargarNoticias, 3600000);

  // Cerrar el pop-up
  closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
});

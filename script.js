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

  // 3. Efecto Matrix en la barra superior (#matrix-bar)
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
    const letters = "0123456789AI智能未来";
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

    // Ajustar tamaño del canvas cuando se cambie el tamaño de la ventana
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

  // 5. Cargar Noticias (en cajas con botón 'Ver más')
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
        if (index < 6) {
          const title = item.querySelector("title")?.textContent || "Noticia sin título";
          const link = item.querySelector("link")?.textContent || "#";
          let description = item.querySelector("description")?.textContent || "Sin descripción";

          // Quitar HTML y recortar a 80 caracteres
          description = description.replace(/<[^>]+>/g, '');
          const resumen = description.substring(0, 80).trim();

          html += `
            <div class="news-box">
              <h3>${title}</h3>
              <p>${resumen}...</p>
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

      // Evento para abrir el pop-up
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

  cargarNoticias();

  // Cerrar pop-up
  closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
});

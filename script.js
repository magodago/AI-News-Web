document.addEventListener("DOMContentLoaded", () => {
  // 1. Cargar fuente Orbitron
  const linkOrbitron = document.createElement("link");
  linkOrbitron.rel = "stylesheet";
  linkOrbitron.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
  document.head.appendChild(linkOrbitron);

  // 2. Glitch en el título
  const title = document.querySelector(".glitch");
  setInterval(() => {
    if (title) {
      title.classList.toggle("glitch-active");
    }
  }, 2000);

  // 3. Barra Matrix
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

  // 5. "Follow the white rabbit..."
  const typingTextElem = document.getElementById("typing-text");
  const phrase = "Follow the white rabbit...";
  let idx = 0;
  let showPhraseInterval = null;
  function typePhrase() {
    if (!typingTextElem) return;
    typingTextElem.textContent = phrase.substring(0, idx);
    idx++;
    // glitch random
    if (Math.random() > 0.9) {
      typingTextElem.classList.add("typing-glitch");
      setTimeout(() => {
        typingTextElem.classList.remove("typing-glitch");
      }, 100);
    }
    if (idx > phrase.length) {
      clearInterval(showPhraseInterval);
      setTimeout(() => {
        idx = 0;
        typingTextElem.textContent = "";
        showPhraseInterval = setInterval(typePhrase, 100);
      }, 1500);
    }
  }
  showPhraseInterval = setInterval(typePhrase, 100);

  /*************************************
   * Hora Actual
   *************************************/
  const timeInfoElem = document.getElementById("time-info");
  if (timeInfoElem) {
    function actualizarHora() {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      timeInfoElem.textContent = `${hh}:${mm}:${ss}`;
    }
    setInterval(actualizarHora, 1000);
    actualizarHora();
  }

  /*************************************
   * Bitcoin DEMO (o real con CoinGecko)
   *************************************/
  const bitcoinPriceElem = document.getElementById("bitcoin-price");
  if (bitcoinPriceElem) {
    // Ejemplo real: 
    function actualizarBitcoin() {
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
        .then(r => r.json())
        .then(data => {
          const price = data.bitcoin.usd;
          bitcoinPriceElem.textContent = `USD ${price.toLocaleString()}`;
        })
        .catch(e => {
          bitcoinPriceElem.textContent = "Error al obtener precio BTC.";
        });
    }
    actualizarBitcoin();
    setInterval(actualizarBitcoin, 15000);
  }

  /*************************************
   * Noticias Dinámicas (6 al azar)
   *************************************/
  const allNews = [
    { title: "Robot educativo revoluciona las aulas", text: "Ofrece clases interactivas y personalizadas." },
    { title: "IA de diagnóstico médico logra un 99% de acierto", text: "Herramienta de aprendizaje profundo reduce errores." },
    { title: "Coches autónomos avanzan sin conductor", text: "Ciudades aprueban taxis sin chofer." },
    { title: "Hologramas con IA para videollamadas", text: "Reuniones casi presenciales con HoloMeet." },
    { title: "Robots de limpieza inundan centros comerciales", text: "Sensores LIDAR y rutas optimizadas." },
    { title: "Chatbots conversacionales más humanos", text: "Modelos de lenguaje que conversan naturalmente." },
    { title: "IA vence campeones de póker", text: "Una IA especialista en decisiones inciertas." },
    { title: "Redes neuronales superan récord de traducción", text: "Calidad casi profesional en múltiples idiomas." },
    { title: "IA en la agricultura de precisión", text: "Drones y algoritmos detectan plagas con acierto." },
    { title: "Algoritmo predice terremotos", text: "Sistema IA analiza patrones geológicos." }
  ];
  const newsContainer = document.getElementById("news-container");
  if (newsContainer) {
    const shuffled = allNews.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);
    let newsHTML = "";
    selected.forEach(item => {
      newsHTML += `
        <div class="news-box">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      `;
    });
    newsContainer.innerHTML = newsHTML;
  }

  /*************************************
   * Desafío Adivina la Palabra
   *************************************/
  // (Igual que antes)

  /*************************************
   * Widgets Futuristas
   *************************************/
  // Citas IA
  // Contador Patentes
  // Predicciones
  // Mapa
  // Sorpresa
  // Ranking Países

  // (Igual que en versiones anteriores)

  /*************************************
   * Trivia IA
   *************************************/
  // (Igual que en versiones anteriores)
});

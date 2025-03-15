document.addEventListener("DOMContentLoaded", () => {
  /*************************************
   * 1. Cargar la fuente Orbitron
   *************************************/
  const linkOrbitron = document.createElement("link");
  linkOrbitron.rel = "stylesheet";
  linkOrbitron.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
  document.head.appendChild(linkOrbitron);

  /*************************************
   * 2. Efecto glitch en el título
   *************************************/
  const title = document.querySelector(".glitch");
  setInterval(() => {
    if (title) title.classList.toggle("glitch-active");
  }, 2000);

  /*************************************
   * 3. Efecto Matrix en la barra (#matrix-bar)
   *************************************/
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

    // Ajustar el tamaño del canvas al cambiar el tamaño de la ventana
    window.addEventListener("resize", () => {
      canvas.width = bar.offsetWidth;
      canvas.height = bar.offsetHeight;
    });
  }
  iniciarEfectoMatrix();

  /*************************************
   * 4. Cursor Futurista
   *************************************/
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate3d(${e.pageX}px, ${e.pageY}px, 0)`;
  });

  /*************************************
   * 5. Texto "Follow the white rabbit..."
   * Aparece letra a letra en bucle
   *************************************/
  const typingTextElem = document.getElementById("typing-text");
  const phrase = "Follow the white rabbit...";
  let idx = 0;
  let showPhraseInterval = null;

  function typePhrase() {
    if (!typingTextElem) return;
    typingTextElem.textContent = phrase.substring(0, idx);
    idx++;

    // Pequeño glitch aleatorio
    if (Math.random() > 0.9) {
      typingTextElem.classList.add("typing-glitch");
      setTimeout(() => {
        typingTextElem.classList.remove("typing-glitch");
      }, 100);
    }

    // Cuando terminamos la frase
    if (idx > phrase.length) {
      clearInterval(showPhraseInterval);
      // Espera 1.5s y reinicia
      setTimeout(() => {
        idx = 0;
        typingTextElem.textContent = "";
        showPhraseInterval = setInterval(typePhrase, 100);
      }, 1500);
    }
  }

  showPhraseInterval = setInterval(typePhrase, 100);

  /*************************************
   * 6. Juego de adivinar la palabra
   *************************************/
  const words = [
    { word: "robot", hint: "Máquina programada para tareas humanas." },
    { word: "red", hint: "Conjunto de nodos interconectados." },
    { word: "algoritmo", hint: "Conjunto de reglas para resolver problemas." },
    { word: "datos", hint: "El combustible de la IA." }
  ];
  const randomIndex = Math.floor(Math.random() * words.length);
  const selectedWord = words[randomIndex].word;
  const hint = words[randomIndex].hint;

  const wordDisplay = document.getElementById("word-display");
  const hintElem = document.getElementById("hint");
  const messageElem = document.getElementById("message");
  const attemptsElem = document.getElementById("attempts-remaining");
  const letterInput = document.getElementById("letter-input");
  const checkBtn = document.getElementById("check-letter");

  let wordArray = Array.from(selectedWord).map(() => "_");
  let attempts = selectedWord.length + 3;

  hintElem.textContent = "Pista: " + hint;
  wordDisplay.textContent = wordArray.join(" ");
  attemptsElem.textContent = `Intentos restantes: ${attempts}`;

  checkBtn.addEventListener("click", () => {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = "";

    if (!letter || letter.length !== 1) return;

    let found = false;
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        wordArray[i] = letter;
        found = true;
      }
    }

    if (!found) attempts--;

    wordDisplay.textContent = wordArray.join(" ");
    attemptsElem.textContent = `Intentos restantes: ${attempts}`;

    // Comprobamos si se acertó
    if (!wordArray.includes("_")) {
      messageElem.textContent = `🎉 ¡Correcto! La palabra es: ${selectedWord}`;
      checkBtn.disabled = true;
      letterInput.disabled = true;
    } else if (attempts <= 0) {
      messageElem.textContent = `❌ Sin intentos. La palabra era: ${selectedWord}`;
      checkBtn.disabled = true;
      letterInput.disabled = true;
    }
  });

  /*************************************
   * 7. Widgets Futuristas (6)
   *************************************/

  // 7.1 Citas sobre IA (rotatorias)
  const quotes = [
    "La IA es la nueva electricidad.",
    "Los datos son el nuevo petróleo.",
    "La creatividad sigue siendo humana.",
    "La IA sin ética es solo código.",
    "El futuro pertenece a la IA."
  ];
  function cambiarCita() {
    const quoteElement = document.getElementById("ai-quote");
    if (quoteElement) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quoteElement.textContent = quotes[randomIndex];
    }
  }
  setInterval(cambiarCita, 10000);
  cambiarCita();

  // 7.2 Contador de Patentes de IA
  let patenteContador = 50000;
  function actualizarPatentes() {
    const patentCountElem = document.getElementById("patent-count");
    if (patentCountElem) {
      patentCountElem.textContent = `Patentes registradas en IA: ${patenteContador}`;
      patenteContador += Math.floor(Math.random() * 10);
    }
  }
  setInterval(actualizarPatentes, 5000);
  actualizarPatentes();

  // 7.3 Predicciones de IA
  const predicciones = [
    "En 2030, el 60% de los trabajos incluirán IA colaborativa.",
    "Los robots humanoides convivirán con nosotros en 2050.",
    "La computación cuántica cambiará el Deep Learning en 2040.",
    "La IA superará la creatividad humana en 2045."
  ];
  const predictionTextElem = document.getElementById("prediction-text");
  if (predictionTextElem) {
    predictionTextElem.textContent =
      predicciones[Math.floor(Math.random() * predicciones.length)];
  }

  // 7.4 Mapa de Innovación en IA (Simulado)
  const mapContainer = document.getElementById("map-container");
  if (mapContainer) {
    mapContainer.textContent = "Ciudades top en IA: San Francisco, Beijing, Londres, Tokio.";
  }

  // 7.5 Sorpresa Diaria
  const sorpresas = [
    "En 2025, el 70% de las empresas usará IA para atención al cliente.",
    "Los coches autónomos evitarán el 90% de los accidentes viales.",
    "La IA podría superar la creatividad humana en 2045.",
    "Un nuevo avance en IA reduce el consumo energético un 40%."
  ];
  const revealBtn = document.getElementById("reveal-surprise");
  const surpriseTextElem = document.getElementById("surprise-text");
  if (revealBtn && surpriseTextElem) {
    revealBtn.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * sorpresas.length);
      surpriseTextElem.textContent = sorpresas[randomIndex];
    });
  }

  // 7.6 Ranking Países Inversión IA
  const countriesData = [
    { name: "USA", investment: 90 },
    { name: "China", investment: 85 },
    { name: "Alemania", investment: 70 },
    { name: "Reino Unido", investment: 65 },
    { name: "Japón", investment: 60 }
  ];
  function mostrarPaisesInversion() {
    const countriesContainer = document.getElementById("countries-container");
    if (!countriesContainer) return;
    let html = "";
    countriesData.forEach((pais) => {
      html += `
        <div class="country-bar">
          <div class="country-label">${pais.name}</div>
          <div class="country-fill" style="width: 0%;">0%</div>
        </div>
      `;
    });
    countriesContainer.innerHTML = html;

    // Animar las barras
    const fillElems = countriesContainer.querySelectorAll(".country-fill");
    fillElems.forEach((fill, index) => {
      const inv = countriesData[index].investment;
      setTimeout(() => {
        fill.style.width = inv + "%";
        fill.textContent = inv + "%";
      }, 200);
    });
  }
  mostrarPaisesInversion();

  // Hasta aquí toda la lógica
});

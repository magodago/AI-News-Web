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
   * 3. Efecto Matrix en la barra
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
   * 5. "Follow the white rabbit..."
   *************************************/
  const typingTextElem = document.getElementById("typing-text");
  const phrase = "Follow the white rabbit...";
  let idx = 0;
  let showPhraseInterval = null;
  function typePhrase() {
    if (!typingTextElem) return;
    typingTextElem.textContent = phrase.substring(0, idx);
    idx++;
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
   * 6. Noticias Dinámicas (6 al azar)
   *************************************/
  const allNews = [
    {
      title: "Robot educativo revoluciona las aulas",
      text: "Un nuevo robot con IA está cambiando la forma de aprender en las escuelas."
    },
    {
      title: "IA de diagnóstico médico logra un 99% de acierto",
      text: "Una herramienta de diagnóstico potenciada con redes neuronales reduce errores."
    },
    {
      title: "Coches autónomos avanzan sin conductor",
      text: "Varias ciudades han aprobado la circulación de taxis sin conductor."
    },
    {
      title: "Hologramas con IA para videollamadas",
      text: "La startup HoloMeet crea reuniones casi presenciales basadas en IA."
    },
    {
      title: "Robots de limpieza inundan centros comerciales",
      text: "Sensores LIDAR y rutas optimizadas para limpiar de forma autónoma."
    },
    {
      title: "Chatbots conversacionales más humanos",
      text: "Nuevos modelos de lenguaje permiten un diálogo casi natural."
    },
    {
      title: "IA vence campeones de póker",
      text: "Una IA especializada en decisiones inciertas domina campeonatos mundiales."
    },
    {
      title: "Redes neuronales superan récord de traducción",
      text: "La traducción automática alcanza la calidad de traductores profesionales."
    },
    {
      title: "IA en la agricultura de precisión",
      text: "Drones y algoritmos detectan plagas y enfermedades en cultivos con más acierto."
    },
    {
      title: "Algoritmo predice terremotos",
      text: "Un sistema de IA analiza patrones geológicos para dar alertas tempranas."
    }
  ];
  const newsContainer = document.getElementById("news-container");
  if (newsContainer) {
    // Elegimos 6 noticias aleatorias cada recarga
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
   * 7. Juego de adivinar la palabra
   *************************************/
  const words = [
    { word: "robot", hint: "Máquina programada para tareas humanas." },
    { word: "red", hint: "Conjunto de nodos interconectados." },
    { word: "algoritmo", hint: "Reglas para resolver problemas." },
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
   * 8. Widgets Futuristas (6)
   *************************************/
  // 8.1 Citas sobre IA (rotatorias)
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

  // 8.2 Contador de Patentes de IA
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

  // 8.3 Predicciones de IA
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

  // 8.4 Mapa de Innovación en IA (Simulado)
  const mapContainer = document.getElementById("map-container");
  if (mapContainer) {
    mapContainer.textContent = "Ciudades top en IA: San Francisco, Beijing, Londres, Tokio.";
  }

  // 8.5 Sorpresa Diaria
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

  // 8.6 Ranking Países Inversión IA
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
          <div class="country-fill" style="width: 0%;">
            ${pais.name}: 0%
          </div>
        </div>
      `;
    });
    countriesContainer.innerHTML = html;

    const fillElems = countriesContainer.querySelectorAll(".country-fill");
    fillElems.forEach((fill, index) => {
      const inv = countriesData[index].investment;
      setTimeout(() => {
        fill.style.width = inv + "%";
        fill.textContent = `${countriesData[index].name}: ${inv}%`;
      }, 200);
    });
  }
  mostrarPaisesInversion();

  /*************************************
   * 9. Chatbot IA
   *************************************/
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotSend = document.getElementById("chatbot-send");
  const chatbotMessages = document.getElementById("chatbot-messages");

  const botResponses = [
    "¡Hola! Soy un chatbot IA. ¿En qué puedo ayudarte?",
    "La IA está transformando el mundo rápidamente.",
    "Los humanos aún somos insustituibles en creatividad.",
    "¿Sabías que la IA puede crear música original?",
    "La ética es crucial para el avance de la inteligencia artificial."
  ];

  if (chatbotSend && chatbotMessages && chatbotInput) {
    chatbotSend.addEventListener("click", () => {
      const userText = chatbotInput.value.trim();
      if (!userText) return;
      // Añadir mensaje del usuario
      const userMsg = document.createElement("div");
      userMsg.style.color = "#0ff";
      userMsg.textContent = `Tú: ${userText}`;
      chatbotMessages.appendChild(userMsg);

      chatbotInput.value = "";
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

      // Simular respuesta del bot
      setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.style.color = "#fff";
        const randomIndex = Math.floor(Math.random() * botResponses.length);
        botMsg.textContent = `Bot: ${botResponses[randomIndex]}`;
        chatbotMessages.appendChild(botMsg);

        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }, 800);
    });
  }

  /*************************************
   * 10. Trivia IA
   *************************************/
  const triviaQuestions = [
    {
      question: "¿Qué es un algoritmo?",
      answers: ["Un tipo de robot", "Un conjunto de reglas para resolver problemas", "Un lenguaje de programación"],
      correct: 1
    },
    {
      question: "¿Cuál de estas ciudades es puntera en IA?",
      answers: ["San Francisco", "El Cairo", "Lisboa"],
      correct: 0
    },
    {
      question: "¿Qué es el 'Machine Learning'?",
      answers: ["Aprendizaje automático", "Un sistema de chat", "Una base de datos de imágenes"],
      correct: 0
    },
    {
      question: "¿Qué hace la 'Visión por Computador'?",
      answers: ["Creación de sitios web", "Hacer imágenes 3D", "Permite a una máquina 'ver' e interpretar imágenes"],
      correct: 2
    },
    {
      question: "La ética en la IA es importante para...",
      answers: ["Hacer juegos divertidos", "Evitar sesgos y daños sociales", "Acelerar la computación cuántica"],
      correct: 1
    }
  ];
  let triviaIndex = 0;
  let triviaScore = 0;

  const triviaQuestionElem = document.getElementById("trivia-question");
  const triviaAnswersElem = document.getElementById("trivia-answers");
  const triviaResultElem = document.getElementById("trivia-result");
  const triviaNextBtn = document.getElementById("trivia-next");

  function mostrarPregunta() {
    const q = triviaQuestions[triviaIndex];
    triviaQuestionElem.textContent = q.question;
    triviaAnswersElem.innerHTML = "";
    q.answers.forEach((ans, i) => {
      const div = document.createElement("div");
      div.classList.add("trivia-option");
      div.textContent = ans;
      div.addEventListener("click", () => {
        if (i === q.correct) {
          triviaScore++;
          triviaResultElem.textContent = "¡Correcto!";
        } else {
          triviaResultElem.textContent = "Respuesta incorrecta.";
        }
        // Deshabilitar opciones
        Array.from(triviaAnswersElem.children).forEach(opt => {
          opt.style.pointerEvents = "none";
        });
      });
      triviaAnswersElem.appendChild(div);
    });
    triviaResultElem.textContent = "";
  }

  if (triviaNextBtn && triviaQuestionElem && triviaAnswersElem && triviaResultElem) {
    triviaNextBtn.addEventListener("click", () => {
      triviaIndex++;
      if (triviaIndex < triviaQuestions.length) {
        mostrarPregunta();
      } else {
        // Terminar
        triviaQuestionElem.textContent = "¡Has completado la trivia!";
        triviaAnswersElem.innerHTML = `Puntuación: ${triviaScore}/${triviaQuestions.length}`;
        triviaResultElem.textContent = "";
        triviaNextBtn.disabled = true;
      }
    });
    mostrarPregunta();
  }
});

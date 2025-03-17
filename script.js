document.addEventListener("DOMContentLoaded", () => {
  /* 1. Partículas de fondo */
  function iniciarParticles() {
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const particles = [];
    const numParticles = 100;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        direction: Math.random() * Math.PI * 2
      });
    }
    function updateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      particles.forEach(p => {
        p.x += Math.cos(p.direction) * p.speed;
        p.y += Math.sin(p.direction) * p.speed;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(updateParticles);
    }
    updateParticles();
  }
  iniciarParticles();

  /* 2. Fuente Orbitron */
  const linkOrbitron = document.createElement("link");
  linkOrbitron.rel = "stylesheet";
  linkOrbitron.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
  document.head.appendChild(linkOrbitron);

  /* 3. Efecto Glitch en Título */
  const title = document.querySelector(".glitch");
  setInterval(() => {
    if (title) title.classList.toggle("glitch-active");
  }, 2000);

  /* 4. Barra Matrix */
  function iniciarMatrix() {
    const bar = document.getElementById("matrix-bar");
    const canvas = document.createElement("canvas");
    canvas.width = bar.offsetWidth;
    canvas.height = bar.offsetHeight;
    canvas.style.display = "block";
    canvas.style.position = "absolute";
    bar.style.position = "relative";
    bar.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const letters = "01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
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
    setInterval(draw, 50);
    window.addEventListener("resize", () => {
      canvas.width = bar.offsetWidth;
      canvas.height = bar.offsetHeight;
    });
  }
  iniciarMatrix();

  /* 5. Cursor Futurista */
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);
  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate3d(${e.pageX}px, ${e.pageY}px, 0)`;
  });

  /* 6. Frase aleatoria de famosos (efecto escritura Matrix) */
  const quotes = [
    "La tecnología es el futuro. - Steve Jobs",
    "La inteligencia artificial es la nueva electricidad. - Andrew Ng",
    "Innovar es ver lo invisible. - Philip Kotler",
    "La tecnología nos hace mejores, si se usa con ética. - Sundar Pichai",
    "El futuro pertenece a los que creen en sus sueños. - Eleanor Roosevelt"
  ];
  const randomQuoteElem = document.getElementById("random-quote");
  let currentQuote = "";
  let quoteIdx = 0;
  function typeQuote() {
    if (!randomQuoteElem) return;
    randomQuoteElem.textContent = currentQuote.substring(0, quoteIdx);
    quoteIdx++;
    if (quoteIdx > currentQuote.length) {
      clearInterval(quoteInterval);
      setTimeout(setRandomQuote, 5000);
    }
  }
  function setRandomQuote() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteIdx = 0;
    quoteInterval = setInterval(typeQuote, 80);
  }
  let quoteInterval = null;
  setRandomQuote();

  /* 7. Desafío: Adivina la Palabra (10 intentos) */
  const challengeWords = [
    { word: "robot", hint: "Una máquina programada para realizar tareas." },
    { word: "computadora", hint: "Dispositivo electrónico para procesar información." },
    { word: "algoritmo", hint: "Conjunto de instrucciones para resolver problemas." },
    { word: "datos", hint: "Información procesada y almacenada." },
    { word: "red", hint: "Conexión entre dispositivos." },
    { word: "sistema", hint: "Conjunto de elementos interrelacionados." },
    { word: "código", hint: "Lenguaje de programación en forma de instrucciones." },
    { word: "software", hint: "Programas y aplicaciones de un dispositivo." },
    { word: "hardware", hint: "Componentes físicos de un sistema informático." },
    { word: "programa", hint: "Conjunto de instrucciones ejecutables." },
    { word: "inteligencia", hint: "Capacidad de aprender y razonar." },
    { word: "máquina", hint: "Dispositivo mecánico o electrónico." },
    { word: "sensor", hint: "Dispositivo que detecta y mide estímulos." },
    { word: "análisis", hint: "Examen detallado de datos o situaciones." },
    { word: "variable", hint: "Elemento que puede cambiar en un programa." },
    { word: "bucle", hint: "Estructura de repetición en programación." },
    { word: "función", hint: "Bloque de código que realiza una tarea." },
    { word: "depuración", hint: "Proceso de corregir errores en un programa." },
    { word: "criptografía", hint: "Técnica para proteger información." },
    { word: "servidor", hint: "Computadora que provee recursos a otros." }
  ];
  let randomIndex = Math.floor(Math.random() * challengeWords.length);
  let selectedChallenge = challengeWords[randomIndex];
  const wordDisplayElem = document.getElementById("word-display");
  const hintElem = document.getElementById("hint");
  const messageElem = document.getElementById("message");
  const attemptsElem = document.getElementById("attempts-remaining");
  const letterInput = document.getElementById("letter-input");
  const checkBtn = document.getElementById("check-letter");
  let wordArray = Array.from(selectedChallenge.word).map(() => "_");
  let attempts = 10;
  if (hintElem) hintElem.textContent = "Pista: " + selectedChallenge.hint;
  if (wordDisplayElem) wordDisplayElem.textContent = wordArray.join(" ");
  if (attemptsElem) attemptsElem.textContent = `Intentos restantes: ${attempts}`;
  if (checkBtn) {
    checkBtn.addEventListener("click", () => {
      if (!letterInput) return;
      const letter = letterInput.value.toLowerCase();
      letterInput.value = "";
      if (!letter || letter.length !== 1) return;
      let found = false;
      for (let i = 0; i < selectedChallenge.word.length; i++) {
        if (selectedChallenge.word[i] === letter) {
          wordArray[i] = letter;
          found = true;
        }
      }
      if (!found) attempts--;
      if (wordDisplayElem) wordDisplayElem.textContent = wordArray.join(" ");
      if (attemptsElem) attemptsElem.textContent = `Intentos restantes: ${attempts}`;
      if (!wordArray.includes("_")) {
        if (messageElem) messageElem.textContent = `🎉 ¡Correcto! La palabra es: ${selectedChallenge.word}`;
        checkBtn.disabled = true;
        letterInput.disabled = true;
      } else if (attempts <= 0) {
        if (messageElem) messageElem.textContent = `❌ Sin intentos. La palabra era: ${selectedChallenge.word}`;
        checkBtn.disabled = true;
        letterInput.disabled = true;
      }
    });
  }
  function resetWordChallenge() {
    randomIndex = Math.floor(Math.random() * challengeWords.length);
    selectedChallenge = challengeWords[randomIndex];
    wordArray = Array.from(selectedChallenge.word).map(() => "_");
    attempts = 10;
    if (hintElem) hintElem.textContent = "Pista: " + selectedChallenge.hint;
    if (wordDisplayElem) wordDisplayElem.textContent = wordArray.join(" ");
    if (attemptsElem) attemptsElem.textContent = `Intentos restantes: ${attempts}`;
    if (messageElem) messageElem.textContent = "";
    if (checkBtn) {
      checkBtn.disabled = false;
      letterInput.disabled = false;
    }
  }
  const resetWordChallengeBtn = document.getElementById("reset-word-challenge");
  if (resetWordChallengeBtn) {
    resetWordChallengeBtn.addEventListener("click", resetWordChallenge);
  }

  /* ---------------------------
     8. Trivia IA (shuffle y reinicio)
  --------------------------- */
  const triviaQuestions = [
    { question: "¿Qué es un algoritmo?", answers: ["Un tipo de robot", "Un conjunto de reglas", "Un lenguaje de programación"], correct: 1 },
    { question: "¿Cuál ciudad es puntera en IA?", answers: ["San Francisco", "El Cairo", "Lisboa"], correct: 0 },
    { question: "¿Qué es Machine Learning?", answers: ["Aprendizaje automático", "Un sistema de chat", "Una base de datos"], correct: 0 },
    { question: "¿Qué hace la Visión por Computador?", answers: ["Crea imágenes 3D", "Permite ver e interpretar imágenes", "Diseña páginas web"], correct: 1 },
    { question: "La ética en la IA es importante para...", answers: ["Evitar sesgos", "Hacer juegos divertidos", "Acelerar la computación"], correct: 0 },
    { question: "¿Qué es un sensor?", answers: ["Dispositivo que detecta cambios", "Parte de un algoritmo", "Un tipo de robot"], correct: 0 },
    { question: "¿Qué es hardware?", answers: ["Software especializado", "Componentes físicos", "Un lenguaje de programación"], correct: 1 },
    { question: "¿Qué es una base de datos?", answers: ["Conjunto organizado de información", "Un algoritmo", "Un hardware"], correct: 0 },
    { question: "¿Qué significa 'debug'?", answers: ["Depurar", "Codificar", "Optimizar"], correct: 0 },
    { question: "¿Qué es inteligencia artificial?", answers: ["Imitación de funciones cognitivas", "Un programa de ordenador", "Una base de datos"], correct: 0 }
  ];
  let shuffledTrivia = shuffle([...triviaQuestions]);
  let triviaIndex = 0;
  let triviaScore = 0;
  const triviaQuestionElem = document.getElementById("trivia-question");
  const triviaAnswersElem = document.getElementById("trivia-answers");
  const triviaResultElem = document.getElementById("trivia-result");
  const triviaNextBtn = document.getElementById("trivia-next");
  function mostrarPreguntaTrivia() {
    if (triviaIndex >= shuffledTrivia.length) return;
    const q = shuffledTrivia[triviaIndex];
    if (triviaQuestionElem) triviaQuestionElem.textContent = q.question;
    if (triviaAnswersElem) triviaAnswersElem.innerHTML = "";
    q.answers.forEach((ans, i) => {
      const div = document.createElement("div");
      div.classList.add("trivia-option");
      div.textContent = ans;
      div.addEventListener("click", () => {
        if (i === q.correct) {
          triviaScore++;
          if (triviaResultElem) triviaResultElem.textContent = "¡Correcto!";
        } else {
          if (triviaResultElem) triviaResultElem.textContent = "Respuesta incorrecta.";
        }
        Array.from(triviaAnswersElem.children).forEach(opt => {
          opt.style.pointerEvents = "none";
        });
      });
      if (triviaAnswersElem) triviaAnswersElem.appendChild(div);
    });
    if (triviaResultElem) triviaResultElem.textContent = "";
  }
  if (triviaNextBtn) {
    triviaNextBtn.addEventListener("click", () => {
      triviaIndex++;
      if (triviaIndex < shuffledTrivia.length) {
        mostrarPreguntaTrivia();
      } else {
        if (triviaQuestionElem) triviaQuestionElem.textContent = "¡Completado!";
        if (triviaAnswersElem) triviaAnswersElem.innerHTML = `Puntuación: ${triviaScore}/${shuffledTrivia.length}`;
        if (triviaResultElem) triviaResultElem.textContent = "";
        triviaNextBtn.disabled = true;
      }
    });
    mostrarPreguntaTrivia();
  }
  function resetTrivia() {
    shuffledTrivia = shuffle([...triviaQuestions]);
    triviaIndex = 0;
    triviaScore = 0;
    triviaNextBtn.disabled = false;
    mostrarPreguntaTrivia();
  }
  const resetTriviaBtn = document.getElementById("reset-trivia");
  if (resetTriviaBtn) {
    resetTriviaBtn.addEventListener("click", resetTrivia);
  }

  /* ---------------------------
     9. Crack the Code (10 intentos)
  --------------------------- */
  const codeSymbols = ["🤖", "🚀", "🛸", "⚡", "💫", "🌌", "👾", "🔮", "🧬", "🛰️"];
  const codeLength = 4;
  let secretCode = [];
  for (let i = 0; i < codeLength; i++) {
    const r = Math.floor(Math.random() * codeSymbols.length);
    secretCode.push(codeSymbols[r]);
  }
  let codeAttempts = 10;
  const codeFeedback = document.getElementById("code-feedback");
  const codeAttemptsElem = document.getElementById("code-attempts");
  const codeCheckBtn = document.getElementById("code-check");
  const codeResetBtn = document.getElementById("code-reset");
  const codeInputs = document.querySelectorAll(".code-char");
  const symbolListElem = document.getElementById("symbol-list");
  if (codeAttemptsElem) codeAttemptsElem.textContent = `Intentos restantes: ${codeAttempts}`;
  if (symbolListElem) {
    let html = "";
    codeSymbols.forEach(sym => {
      html += `<button class="symbol-btn">${sym}</button>`;
    });
    symbolListElem.innerHTML = html;
    const symbolBtns = symbolListElem.querySelectorAll(".symbol-btn");
    symbolBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        for (let i = 0; i < codeInputs.length; i++) {
          if (!codeInputs[i].value) {
            codeInputs[i].value = btn.textContent;
            break;
          }
        }
      });
    });
  }
  if (codeResetBtn) {
    codeResetBtn.addEventListener("click", () => {
      codeInputs.forEach(inp => inp.value = "");
      if (codeFeedback) codeFeedback.textContent = "";
    });
  }
  if (codeCheckBtn) {
    codeCheckBtn.addEventListener("click", () => {
      if (codeAttempts <= 0) return;
      let userCode = [];
      codeInputs.forEach(inp => userCode.push(inp.value));
      if (userCode.some(v => !v)) {
        if (codeFeedback) codeFeedback.textContent = "Completa los 4 símbolos.";
        return;
      }
      let correctPos = 0;
      let correctSym = 0;
      let secretCopy = [...secretCode];
      let userCopy = [...userCode];
      for (let i = 0; i < codeLength; i++) {
        if (userCopy[i] === secretCopy[i]) {
          correctPos++;
          secretCopy[i] = null;
          userCopy[i] = null;
        }
      }
      for (let i = 0; i < codeLength; i++) {
        if (userCopy[i]) {
          const idx = secretCopy.indexOf(userCopy[i]);
          if (idx !== -1) {
            correctSym++;
            secretCopy[idx] = null;
          }
        }
      }
      if (correctPos === codeLength) {
        if (codeFeedback) codeFeedback.textContent = `🎉 ¡Descifrado! Era: ${secretCode.join("")}`;
        codeCheckBtn.disabled = true;
        if (symbolListElem) symbolListElem.style.pointerEvents = "none";
        codeInputs.forEach(inp => inp.disabled = true);
      } else {
        codeAttempts--;
        if (codeAttemptsElem) codeAttemptsElem.textContent = `Intentos restantes: ${codeAttempts}`;
        if (codeAttempts <= 0) {
          if (codeFeedback) codeFeedback.textContent = `❌ Sin intentos. Era: ${secretCode.join("")}`;
          codeCheckBtn.disabled = true;
          if (symbolListElem) symbolListElem.style.pointerEvents = "none";
          codeInputs.forEach(inp => inp.disabled = true);
        } else {
          if (codeFeedback) codeFeedback.textContent = `Exactos: ${correctPos} | Otros: ${correctSym}`;
        }
      }
    });
  }
  function resetCrackCode() {
    secretCode = [];
    for (let i = 0; i < codeLength; i++) {
      const r = Math.floor(Math.random() * codeSymbols.length);
      secretCode.push(codeSymbols[r]);
    }
    codeAttempts = 10;
    if (codeAttemptsElem) codeAttemptsElem.textContent = `Intentos restantes: ${codeAttempts}`;
    if (codeFeedback) codeFeedback.textContent = "";
    codeInputs.forEach(inp => {
      inp.value = "";
      inp.disabled = false;
    });
    if (symbolListElem) symbolListElem.style.pointerEvents = "auto";
    codeCheckBtn.disabled = false;
  }
  const resetCrackCodeBtn = document.getElementById("reset-crack-code");
  if (resetCrackCodeBtn) {
    resetCrackCodeBtn.addEventListener("click", resetCrackCode);
  }

  /* ---------------------------
     10. Memory AI Cards
  --------------------------- */
  const memoryContainer = document.getElementById("memory-container");
  const memoryMessage = document.getElementById("memory-message");
  const cardSymbols = ["🤖", "⚙️", "💻", "🤖", "⚙️", "💻", "🔮", "🎉", "🔮", "🎉", "🌐", "🌐"];
  let flippedCards = [];
  let matchedPairs = 0;
  function shuffleArrayMem(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  let shuffledSymbols = shuffleArrayMem([...cardSymbols]);
  function createMemoryBoard() {
    if (!memoryContainer) return;
    memoryContainer.innerHTML = "";
    shuffledSymbols = shuffleArrayMem([...cardSymbols]);
    shuffledSymbols.forEach(sym => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = "?";
      card.dataset.symbol = sym;
      card.addEventListener("click", () => flipCard(card));
      memoryContainer.appendChild(card);
    });
    matchedPairs = 0;
    flippedCards = [];
    if (memoryMessage) memoryMessage.textContent = "";
  }
  function flipCard(card) {
    if (card.classList.contains("flipped")) return;
    if (flippedCards.length === 2) return;
    card.classList.add("flipped");
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 600);
    }
  }
  function checkMatch() {
    const [c1, c2] = flippedCards;
    if (c1.dataset.symbol === c2.dataset.symbol) {
      matchedPairs++;
      c1.removeEventListener("click", () => flipCard(c1));
      c2.removeEventListener("click", () => flipCard(c2));
      if (matchedPairs === cardSymbols.length / 2) {
        if (memoryMessage) memoryMessage.textContent = "¡Todas las parejas encontradas!";
      }
    } else {
      c1.classList.remove("flipped");
      c1.textContent = "?";
      c2.classList.remove("flipped");
      c2.textContent = "?";
    }
    flippedCards = [];
  }
  if (memoryContainer) createMemoryBoard();
  function resetMemoryGame() {
    createMemoryBoard();
  }
  const resetMemoryBtn = document.getElementById("reset-memory");
  if (resetMemoryBtn) {
    resetMemoryBtn.addEventListener("click", resetMemoryGame);
  }

  /* ---------------------------
     11. Sopa de Letras AI
  --------------------------- */
  const wordsearchContainer = document.getElementById("wordsearch-container");
  const wordsearchWordsElem = document.getElementById("wordsearch-words");
  const wsWords = ["ROBOT", "ALGORITMO", "RED", "DATOS", "IA", "CPU", "MEMORIA", "SOFTWARE", "HARDWARE", "CÓDIGO"];
  const wsRows = 10, wsCols = 10;
  let grid = Array.from({ length: wsRows }, () => Array(wsCols).fill(null));
  function placeWordHorizontal(word, r, c) {
    if (c + word.length > wsCols) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[r][c + i] && grid[r][c + i] !== word[i]) return false;
    }
    for (let i = 0; i < word.length; i++) {
      grid[r][c + i] = word[i];
    }
    return true;
  }
  function placeWordVertical(word, r, c) {
    if (r + word.length > wsRows) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[r + i][c] && grid[r + i][c] !== word[i]) return false;
    }
    for (let i = 0; i < word.length; i++) {
      grid[r + i][c] = word[i];
    }
    return true;
  }
  function insertWord(word) {
    let attempts = 100;
    while (attempts > 0) {
      attempts--;
      const orientation = Math.random() < 0.5 ? "H" : "V";
      const rr = Math.floor(Math.random() * wsRows);
      const cc = Math.floor(Math.random() * wsCols);
      if (orientation === "H") {
        if (placeWordHorizontal(word, rr, cc)) return true;
      } else {
        if (placeWordVertical(word, rr, cc)) return true;
      }
    }
    return false;
  }
  wsWords.forEach(w => insertWord(w));
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < wsRows; r++) {
    for (let c = 0; c < wsCols; c++) {
      if (!grid[r][c]) {
        grid[r][c] = letters.charAt(Math.floor(Math.random() * letters.length));
      }
    }
  }
  function renderWordSearch() {
    if (wordsearchContainer) {
      wordsearchContainer.innerHTML = "";
      for (let r = 0; r < wsRows; r++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("wordsearch-row");
        for (let c = 0; c < wsCols; c++) {
          const cellDiv = document.createElement("div");
          cellDiv.classList.add("wordsearch-cell");
          cellDiv.textContent = grid[r][c];
          cellDiv.addEventListener("click", () => {
            cellDiv.classList.toggle("highlighted");
          });
          rowDiv.appendChild(cellDiv);
        }
        wordsearchContainer.appendChild(rowDiv);
      }
    }
    if (wordsearchWordsElem) {
      const shuffledWsWords = shuffle([...wsWords]);
      wordsearchWordsElem.textContent = "Palabras: " + shuffledWsWords.join(", ");
    }
  }
  renderWordSearch();
  function resetWordSearch() {
    grid = Array.from({ length: wsRows }, () => Array(wsCols).fill(null));
    wsWords.forEach(w => insertWord(w));
    for (let r = 0; r < wsRows; r++) {
      for (let c = 0; c < wsCols; c++) {
        if (!grid[r][c]) {
          grid[r][c] = letters.charAt(Math.floor(Math.random() * letters.length));
        }
      }
    }
    renderWordSearch();
  }
  const resetWordSearchBtn = document.getElementById("reset-wordsearch");
  if (resetWordSearchBtn) {
    resetWordSearchBtn.addEventListener("click", resetWordSearch);
  }

  /* ---------------------------
     12. Navegación suave de enlaces internos
  --------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        document.querySelector(targetId).scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  /* ---------------------------
     13. Simulador de Futuro Personalizado
  --------------------------- */
  const automationSlider = document.getElementById("automation");
  const roboticsSlider = document.getElementById("robotics");
  const transportSlider = document.getElementById("transport");
  const automationValue = document.getElementById("automation-value");
  const roboticsValue = document.getElementById("robotics-value");
  const transportValue = document.getElementById("transport-value");
  const simulateFutureBtn = document.getElementById("simulate-future");
  const futureOutput = document.getElementById("future-output");
  if (automationSlider) {
    automationSlider.oninput = () => {
      automationValue.textContent = automationSlider.value + "%";
    };
  }
  if (roboticsSlider) {
    roboticsSlider.oninput = () => {
      roboticsValue.textContent = roboticsSlider.value + "%";
    };
  }
  if (transportSlider) {
    transportSlider.oninput = () => {
      transportValue.textContent = transportSlider.value + "%";
    };
  }
  if (simulateFutureBtn) {
    simulateFutureBtn.addEventListener("click", () => {
      const automation = automationSlider.value;
      const robotics = roboticsSlider.value;
      const transport = transportSlider.value;
      let simulation = "Proyección Futurista: ";
      simulation += (automation > 70) ? "La automatización domina la industria. " :
                    (automation > 40) ? "La automatización impulsa procesos, con intervención humana moderada. " :
                    "La automatización es limitada, prevaleciendo el factor humano. ";
      simulation += (robotics > 70) ? "Robots humanoides conviven en hogares y oficinas. " :
                    (robotics > 40) ? "Se integran robots en tareas específicas. " :
                    "La presencia de robots es escasa. ";
      simulation += (transport > 70) ? "Los coches autónomos son el estándar en transporte urbano. " :
                    (transport > 40) ? "Conviven vehículos autónomos con los tradicionales. " :
                    "El transporte autónomo aún está en fase experimental. ";
      futureOutput.textContent = simulation;
    });
  }

  /* ---------------------------
     14. Panel de Proyecciones Interactivas
  --------------------------- */
  const updateProjectionsBtn = document.getElementById("update-projections");
  const projectionsOutput = document.getElementById("projections-output");
  const projectionsData = [
    "La inversión en IA podría superar los 200 mil millones en 2025.",
    "La adopción de coches autónomos crecerá un 30% anual en la próxima década.",
    "Robots humanoides operarán en el 60% de las industrias para 2030.",
    "Ciudades inteligentes integrarán IA en más del 80% de sus servicios para 2035.",
    "La fusión de computación cuántica e IA revolucionará la investigación médica para 2040.",
    "La integración de IA en la educación transformará la formación profesional en los próximos 10 años.",
    "El uso de asistentes virtuales en hogares se expandirá globalmente en menos de 5 años."
  ];
  if (updateProjectionsBtn) {
    updateProjectionsBtn.addEventListener("click", () => {
      const randomIdx = Math.floor(Math.random() * projectionsData.length);
      projectionsOutput.textContent = projectionsData[randomIdx];
    });
  }

  /* ---------------------------
     15. Trivia IA (shuffle y reinicio)
  --------------------------- */
  const triviaQuestions = [
    { question: "¿Qué es un algoritmo?", answers: ["Un tipo de robot", "Un conjunto de reglas", "Un lenguaje de programación"], correct: 1 },
    { question: "¿Cuál ciudad es puntera en IA?", answers: ["San Francisco", "El Cairo", "Lisboa"], correct: 0 },
    { question: "¿Qué es Machine Learning?", answers: ["Aprendizaje automático", "Un sistema de chat", "Una base de datos"], correct: 0 },
    { question: "¿Qué hace la Visión por Computador?", answers: ["Crea imágenes 3D", "Permite ver e interpretar imágenes", "Diseña páginas web"], correct: 1 },
    { question: "La ética en la IA es importante para...", answers: ["Evitar sesgos", "Hacer juegos divertidos", "Acelerar la computación"], correct: 0 },
    { question: "¿Qué es un sensor?", answers: ["Dispositivo que detecta cambios", "Parte de un algoritmo", "Un tipo de robot"], correct: 0 },
    { question: "¿Qué es hardware?", answers: ["Software especializado", "Componentes físicos", "Un lenguaje de programación"], correct: 1 },
    { question: "¿Qué es una base de datos?", answers: ["Conjunto organizado de información", "Un algoritmo", "Un hardware"], correct: 0 },
    { question: "¿Qué significa 'debug'?", answers: ["Depurar", "Codificar", "Optimizar"], correct: 0 },
    { question: "¿Qué es inteligencia artificial?", answers: ["Imitación de funciones cognitivas", "Un programa de ordenador", "Una base de datos"], correct: 0 }
  ];
  let shuffledTrivia = shuffle([...triviaQuestions]);
  let triviaIndex = 0;
  let triviaScore = 0;
  const triviaQuestionElem = document.getElementById("trivia-question");
  const triviaAnswersElem = document.getElementById("trivia-answers");
  const triviaResultElem = document.getElementById("trivia-result");
  const triviaNextBtn = document.getElementById("trivia-next");
  function mostrarPreguntaTrivia() {
    if (triviaIndex >= shuffledTrivia.length) return;
    const q = shuffledTrivia[triviaIndex];
    if (triviaQuestionElem) triviaQuestionElem.textContent = q.question;
    if (triviaAnswersElem) triviaAnswersElem.innerHTML = "";
    q.answers.forEach((ans, i) => {
      const div = document.createElement("div");
      div.classList.add("trivia-option");
      div.textContent = ans;
      div.addEventListener("click", () => {
        if (i === q.correct) {
          triviaScore++;
          if (triviaResultElem) triviaResultElem.textContent = "¡Correcto!";
        } else {
          if (triviaResultElem) triviaResultElem.textContent = "Respuesta incorrecta.";
        }
        Array.from(triviaAnswersElem.children).forEach(opt => {
          opt.style.pointerEvents = "none";
        });
      });
      if (triviaAnswersElem) triviaAnswersElem.appendChild(div);
    });
    if (triviaResultElem) triviaResultElem.textContent = "";
  }
  if (triviaNextBtn) {
    triviaNextBtn.addEventListener("click", () => {
      triviaIndex++;
      if (triviaIndex < shuffledTrivia.length) {
        mostrarPreguntaTrivia();
      } else {
        if (triviaQuestionElem) triviaQuestionElem.textContent = "¡Completado!";
        if (triviaAnswersElem) triviaAnswersElem.innerHTML = `Puntuación: ${triviaScore}/${shuffledTrivia.length}`;
        if (triviaResultElem) triviaResultElem.textContent = "";
        triviaNextBtn.disabled = true;
      }
    });
    mostrarPreguntaTrivia();
  }
  function resetTrivia() {
    shuffledTrivia = shuffle([...triviaQuestions]);
    triviaIndex = 0;
    triviaScore = 0;
    triviaNextBtn.disabled = false;
    mostrarPreguntaTrivia();
  }
  const resetTriviaBtn = document.getElementById("reset-trivia");
  if (resetTriviaBtn) {
    resetTriviaBtn.addEventListener("click", resetTrivia);
  }

  /* ---------------------------
     16. Crack the Code (10 intentos)
  --------------------------- */
  const codeSymbols = ["🤖", "🚀", "🛸", "⚡", "💫", "🌌", "👾", "🔮", "🧬", "🛰️"];
  const codeLength = 4;
  let secretCode = [];
  for (let i = 0; i < codeLength; i++) {
    const r = Math.floor(Math.random() * codeSymbols.length);
    secretCode.push(codeSymbols[r]);
  }
  let codeAttempts = 10;
  const codeFeedback = document.getElementById("code-feedback");
  const codeAttemptsElem = document.getElementById("code-attempts");
  const codeCheckBtn = document.getElementById("code-check");
  const codeResetBtn = document.getElementById("code-reset");
  const codeInputs = document.querySelectorAll(".code-char");
  const symbolListElem = document.getElementById("symbol-list");
  if (codeAttemptsElem) codeAttemptsElem.textContent = `Intentos restantes: ${codeAttempts}`;
  if (symbolListElem) {
    let html = "";
    codeSymbols.forEach(sym => {
      html += `<button class="symbol-btn">${sym}</button>`;
    });
    symbolListElem.innerHTML = html;
    const symbolBtns = symbolListElem.querySelectorAll(".symbol-btn");
    symbolBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        for (let i = 0; i < codeInputs.length; i++) {
          if (!codeInputs[i].value) {
            codeInputs[i].value = btn.textContent;
            break;
          }
        }
      });
    });
  }
  if (codeResetBtn) {
    codeResetBtn.addEventListener("click", () => {
      codeInputs.forEach(inp => inp.value = "");
      if (codeFeedback) codeFeedback.textContent = "";
    });
  }
  if (codeCheckBtn) {
    codeCheckBtn.addEventListener("click", () => {
      if (codeAttempts <= 0) return;
      let userCode = [];
      codeInputs.forEach(inp => userCode.push(inp.value));
      if (userCode.some(v => !v)) {
        if (codeFeedback) codeFeedback.textContent = "Completa los 4 símbolos.";
        return;
      }
      let correctPos = 0;
      let correctSym = 0;
      let secretCopy = [...secretCode];
      let userCopy = [...userCode];
      for (let i = 0; i < codeLength; i++) {
        if (userCopy[i] === secretCopy[i]) {
          correctPos++;
          secretCopy[i] = null;
          userCopy[i] = null;
        }
      }
      for (let i = 0; i < codeLength; i++) {
        if (userCopy[i]) {
          const idx = secretCopy.indexOf(userCopy[i]);
          if (idx !== -1) {
            correctSym++;
            secretCopy[idx] = null;
          }
        }
      }
      if (correctPos === codeLength) {
        if (codeFeedback) codeFeedback.textContent = `🎉 ¡Descifrado! Era: ${secretCode.join("")}`;
        codeCheckBtn.disabled = true;
        if (symbolListElem) symbolListElem.style.pointerEvents = "none";
        codeInputs.forEach(inp => inp.disabled = true);
      } else {
        codeAttempts--;
        if (codeAttemptsElem) codeAttemptsElem.textContent = `Intentos restantes: ${codeAttempts}`;
        if (codeAttempts <= 0) {
          if (codeFeedback) codeFeedback.textContent = `❌ Sin intentos. Era: ${secretCode.join("")}`;
          codeCheckBtn.disabled = true;
          if (symbolListElem) symbolListElem.style.pointerEvents = "none";
          codeInputs.forEach(inp => inp.disabled = true);
        } else {
          if (codeFeedback) codeFeedback.textContent = `Exactos: ${correctPos} | Otros: ${correctSym}`;
        }
      }
    });
  }
  function resetCrackCode() {
    secretCode = [];
    for (let i = 0; i < codeLength; i++) {
      const r = Math.floor(Math.random() * codeSymbols.length);
      secretCode.push(codeSymbols[r]);
    }
    codeAttempts = 10;
    if (codeAttemptsElem) codeAttemptsElem.textContent = `Intentos restantes: ${codeAttempts}`;
    if (codeFeedback) codeFeedback.textContent = "";
    codeInputs.forEach(inp => {
      inp.value = "";
      inp.disabled = false;
    });
    if (symbolListElem) symbolListElem.style.pointerEvents = "auto";
    codeCheckBtn.disabled = false;
  }
  const resetCrackCodeBtn = document.getElementById("reset-crack-code");
  if (resetCrackCodeBtn) {
    resetCrackCodeBtn.addEventListener("click", resetCrackCode);
  }

  /* ---------------------------
     17. Memory AI Cards
  --------------------------- */
  const memoryContainer = document.getElementById("memory-container");
  const memoryMessage = document.getElementById("memory-message");
  const cardSymbols = ["🤖", "⚙️", "💻", "🤖", "⚙️", "💻", "🔮", "🎉", "🔮", "🎉", "🌐", "🌐"];
  let flippedCards = [];
  let matchedPairs = 0;
  function shuffleArrayMem(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  let shuffledSymbols = shuffleArrayMem([...cardSymbols]);
  function createMemoryBoard() {
    if (!memoryContainer) return;
    memoryContainer.innerHTML = "";
    shuffledSymbols = shuffleArrayMem([...cardSymbols]);
    shuffledSymbols.forEach(sym => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = "?";
      card.dataset.symbol = sym;
      card.addEventListener("click", () => flipCard(card));
      memoryContainer.appendChild(card);
    });
    matchedPairs = 0;
    flippedCards = [];
    if (memoryMessage) memoryMessage.textContent = "";
  }
  function flipCard(card) {
    if (card.classList.contains("flipped")) return;
    if (flippedCards.length === 2) return;
    card.classList.add("flipped");
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 600);
    }
  }
  function checkMatch() {
    const [c1, c2] = flippedCards;
    if (c1.dataset.symbol === c2.dataset.symbol) {
      matchedPairs++;
      c1.removeEventListener("click", () => flipCard(c1));
      c2.removeEventListener("click", () => flipCard(c2));
      if (matchedPairs === cardSymbols.length / 2) {
        if (memoryMessage) memoryMessage.textContent = "¡Todas las parejas encontradas!";
      }
    } else {
      c1.classList.remove("flipped");
      c1.textContent = "?";
      c2.classList.remove("flipped");
      c2.textContent = "?";
    }
    flippedCards = [];
  }
  if (memoryContainer) createMemoryBoard();
  function resetMemoryGame() {
    createMemoryBoard();
  }
  const resetMemoryBtn = document.getElementById("reset-memory");
  if (resetMemoryBtn) {
    resetMemoryBtn.addEventListener("click", resetMemoryGame);
  }

  /* ---------------------------
     18. Sopa de Letras AI
  --------------------------- */
  const wordsearchContainer = document.getElementById("wordsearch-container");
  const wordsearchWordsElem = document.getElementById("wordsearch-words");
  const wsWords = ["ROBOT", "ALGORITMO", "RED", "DATOS", "IA", "CPU", "MEMORIA", "SOFTWARE", "HARDWARE", "CÓDIGO"];
  const wsRows = 10, wsCols = 10;
  let grid = Array.from({ length: wsRows }, () => Array(wsCols).fill(null));
  function placeWordHorizontal(word, r, c) {
    if (c + word.length > wsCols) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[r][c + i] && grid[r][c + i] !== word[i]) return false;
    }
    for (let i = 0; i < word.length; i++) {
      grid[r][c + i] = word[i];
    }
    return true;
  }
  function placeWordVertical(word, r, c) {
    if (r + word.length > wsRows) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[r + i][c] && grid[r + i][c] !== word[i]) return false;
    }
    for (let i = 0; i < word.length; i++) {
      grid[r + i][c] = word[i];
    }
    return true;
  }
  function insertWord(word) {
    let attempts = 100;
    while (attempts > 0) {
      attempts--;
      const orientation = Math.random() < 0.5 ? "H" : "V";
      const rr = Math.floor(Math.random() * wsRows);
      const cc = Math.floor(Math.random() * wsCols);
      if (orientation === "H") {
        if (placeWordHorizontal(word, rr, cc)) return true;
      } else {
        if (placeWordVertical(word, rr, cc)) return true;
      }
    }
    return false;
  }
  wsWords.forEach(w => insertWord(w));
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < wsRows; r++) {
    for (let c = 0; c < wsCols; c++) {
      if (!grid[r][c]) {
        grid[r][c] = letters.charAt(Math.floor(Math.random() * letters.length));
      }
    }
  }
  function renderWordSearch() {
    if (wordsearchContainer) {
      wordsearchContainer.innerHTML = "";
      for (let r = 0; r < wsRows; r++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("wordsearch-row");
        for (let c = 0; c < wsCols; c++) {
          const cellDiv = document.createElement("div");
          cellDiv.classList.add("wordsearch-cell");
          cellDiv.textContent = grid[r][c];
          cellDiv.addEventListener("click", () => {
            cellDiv.classList.toggle("highlighted");
          });
          rowDiv.appendChild(cellDiv);
        }
        wordsearchContainer.appendChild(rowDiv);
      }
    }
    if (wordsearchWordsElem) {
      const shuffledWsWords = shuffle([...wsWords]);
      wordsearchWordsElem.textContent = "Palabras: " + shuffledWsWords.join(", ");
    }
  }
  renderWordSearch();
  function resetWordSearch() {
    grid = Array.from({ length: wsRows }, () => Array(wsCols).fill(null));
    wsWords.forEach(w => insertWord(w));
    for (let r = 0; r < wsRows; r++) {
      for (let c = 0; c < wsCols; c++) {
        if (!grid[r][c]) {
          grid[r][c] = letters.charAt(Math.floor(Math.random() * letters.length));
        }
      }
    }
    renderWordSearch();
  }
  const resetWordSearchBtn = document.getElementById("reset-wordsearch");
  if (resetWordSearchBtn) {
    resetWordSearchBtn.addEventListener("click", resetWordSearch);
  }

  /* ---------------------------
     19. Navegación suave de enlaces internos
  --------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        document.querySelector(targetId).scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  /* ---------------------------
     20. Laberinto: Escapa del Laberinto
  --------------------------- */
  let labyrinth = [];
  let playerPos = { row: 0, col: 0 };
  function initLabyrinth() {
    // Laberinto fijo 10x10: 1 = camino, 0 = pared
    labyrinth = [
      [1,1,0,1,1,1,0,1,1,1],
      [0,1,0,1,0,1,0,1,0,1],
      [0,1,1,1,0,1,1,1,0,1],
      [0,0,0,1,0,0,0,1,0,1],
      [1,1,1,1,1,1,0,1,1,1],
      [1,0,0,0,0,1,0,0,0,1],
      [1,1,1,1,0,1,1,1,0,1],
      [0,0,0,1,0,0,0,1,0,1],
      [1,1,1,1,1,1,0,1,1,1],
      [1,0,0,0,0,1,1,1,0,1]
    ];
    playerPos = { row: 0, col: 0 };
  }
  function renderLabyrinth() {
    const container = document.getElementById("laberinto-container");
    container.innerHTML = "";
    for (let r = 0; r < labyrinth.length; r++) {
      for (let c = 0; c < labyrinth[r].length; c++) {
        const cell = document.createElement("div");
        cell.classList.add("lab-cell");
        const inner = document.createElement("div");
        inner.classList.add("lab-cell-inner");
        if (r === playerPos.row && c === playerPos.col) {
          inner.classList.add("player");
          inner.textContent = "P";
        } else if (r === labyrinth.length - 1 && c === labyrinth[0].length - 1) {
          inner.classList.add("exit");
          inner.textContent = "E";
        } else {
          inner.classList.add(labyrinth[r][c] === 1 ? "path" : "wall");
        }
        cell.appendChild(inner);
        container.appendChild(cell);
      }
    }
  }
  function movePlayer(direction) {
    let newRow = playerPos.row;
    let newCol = playerPos.col;
    if (direction === "ArrowUp") newRow--;
    if (direction === "ArrowDown") newRow++;
    if (direction === "ArrowLeft") newCol--;
    if (direction === "ArrowRight") newCol++;
    if (newRow >= 0 && newRow < labyrinth.length && newCol >= 0 && newCol < labyrinth[0].length) {
      if (labyrinth[newRow][newCol] === 1) {
        playerPos.row = newRow;
        playerPos.col = newCol;
        renderLabyrinth();
        checkLabyrinthWin();
      }
    }
  }
  function checkLabyrinthWin() {
    if (playerPos.row === labyrinth.length - 1 && playerPos.col === labyrinth[0].length - 1) {
      document.getElementById("laberinto-message").textContent = "¡Felicidades! Has escapado del laberinto.";
    }
  }
  initLabyrinth();
  renderLabyrinth();
  document.addEventListener("keydown", (e) => {
    movePlayer(e.key);
  });
  const resetLaberintoBtn = document.getElementById("reset-laberinto");
  if (resetLaberintoBtn) {
    resetLaberintoBtn.addEventListener("click", () => {
      initLabyrinth();
      renderLabyrinth();
      document.getElementById("laberinto-message").textContent = "";
    });
  }

  /* ---------------------------
     21. Simulador de Futuro Personalizado
  --------------------------- */
  const automationSlider = document.getElementById("automation");
  const roboticsSlider = document.getElementById("robotics");
  const transportSlider = document.getElementById("transport");
  const automationValue = document.getElementById("automation-value");
  const roboticsValue = document.getElementById("robotics-value");
  const transportValue = document.getElementById("transport-value");
  const simulateFutureBtn = document.getElementById("simulate-future");
  const futureOutput = document.getElementById("future-output");
  if (automationSlider) {
    automationSlider.oninput = () => {
      automationValue.textContent = automationSlider.value + "%";
    };
  }
  if (roboticsSlider) {
    roboticsSlider.oninput = () => {
      roboticsValue.textContent = roboticsSlider.value + "%";
    };
  }
  if (transportSlider) {
    transportSlider.oninput = () => {
      transportValue.textContent = transportSlider.value + "%";
    };
  }
  if (simulateFutureBtn) {
    simulateFutureBtn.addEventListener("click", () => {
      const automation = automationSlider.value;
      const robotics = roboticsSlider.value;
      const transport = transportSlider.value;
      let simulation = "Proyección Futurista: ";
      simulation += (automation > 70) ? "La automatización domina la industria. " :
                    (automation > 40) ? "La automatización impulsa procesos, con intervención humana moderada. " :
                    "La automatización es limitada, prevaleciendo el factor humano. ";
      simulation += (robotics > 70) ? "Robots humanoides conviven en hogares y oficinas. " :
                    (robotics > 40) ? "Se integran robots en tareas específicas. " :
                    "La presencia de robots es escasa. ";
      simulation += (transport > 70) ? "Los coches autónomos son el estándar en transporte urbano. " :
                    (transport > 40) ? "Conviven vehículos autónomos con los tradicionales. " :
                    "El transporte autónomo aún está en fase experimental. ";
      futureOutput.textContent = simulation;
    });
  }

  /* ---------------------------
     22. Panel de Proyecciones Interactivas
  --------------------------- */
  const updateProjectionsBtn = document.getElementById("update-projections");
  const projectionsOutput = document.getElementById("projections-output");
  const projectionsData = [
    "La inversión en IA podría superar los 200 mil millones en 2025.",
    "La adopción de coches autónomos crecerá un 30% anual en la próxima década.",
    "Robots humanoides operarán en el 60% de las industrias para 2030.",
    "Ciudades inteligentes integrarán IA en más del 80% de sus servicios para 2035.",
    "La fusión de computación cuántica e IA revolucionará la investigación médica para 2040.",
    "La integración de IA en la educación transformará la formación profesional en los próximos 10 años.",
    "El uso de asistentes virtuales en hogares se expandirá globalmente en menos de 5 años."
  ];
  if (updateProjectionsBtn) {
    updateProjectionsBtn.addEventListener("click", () => {
      const randomIdx = Math.floor(Math.random() * projectionsData.length);
      projectionsOutput.textContent = projectionsData[randomIdx];
    });
  }
});

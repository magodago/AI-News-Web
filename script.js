document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------
     1. Efecto de partículas con líneas conectadas
  --------------------------- */
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
    const maxDistance = 100;
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
      particles.forEach(p => {
        p.x += Math.cos(p.direction) * p.speed;
        p.y += Math.sin(p.direction) * p.speed;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0f0";
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(0,255,0,${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(updateParticles);
    }
    updateParticles();
  }
  iniciarParticles();

  /* ---------------------------
     2. Cargar fuente Orbitron
  --------------------------- */
  const linkOrbitron = document.createElement("link");
  linkOrbitron.rel = "stylesheet";
  linkOrbitron.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
  document.head.appendChild(linkOrbitron);

  /* ---------------------------
     3. Efecto Glitch en el Título
  --------------------------- */
  const title = document.querySelector(".glitch");
  setInterval(() => {
    if (title) title.classList.toggle("glitch-active");
  }, 2000);

  /* ---------------------------
     4. Barra Matrix
  --------------------------- */
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

  /* ---------------------------
     5. Cursor Futurista
  --------------------------- */
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);
  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate3d(${e.pageX}px, ${e.pageY}px, 0)`;
  });

  /* ---------------------------
     6. Texto "Follow the white rabbit..."
  --------------------------- */
  const typingText = document.getElementById("typing-text");
  const phrase = "Follow the white rabbit...";
  let idx = 0;
  let typingInterval = null;
  function typePhrase() {
    if (!typingText) return;
    typingText.textContent = phrase.substring(0, idx);
    idx++;
    if (Math.random() > 0.9) {
      typingText.classList.add("typing-glitch");
      setTimeout(() => {
        typingText.classList.remove("typing-glitch");
      }, 100);
    }
    if (idx > phrase.length) {
      clearInterval(typingInterval);
      setTimeout(() => {
        idx = 0;
        typingText.textContent = "";
        typingInterval = setInterval(typePhrase, 100);
      }, 1500);
    }
  }
  typingInterval = setInterval(typePhrase, 100);

  /* ---------------------------
     7. Desafío: Adivina la Palabra (10 intentos)
  --------------------------- */
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
     8. Quiz de Curiosidades (20 preguntas, 2 min)
  --------------------------- */
  const quizQuestions = [
    { question: "La inteligencia artificial puede aprender por sí sola.", answer: true },
    { question: "Los robots humanoides ya realizan tareas domésticas en masa.", answer: false },
    { question: "La computación cuántica está revolucionando la investigación en IA.", answer: true },
    { question: "La IA no tiene aplicaciones en la medicina.", answer: false },
    { question: "Los coches autónomos son solo una idea de ciencia ficción.", answer: false },
    { question: "La IA puede analizar grandes volúmenes de datos en segundos.", answer: true },
    { question: "La ética no es relevante en el desarrollo de IA.", answer: false },
    { question: "Los algoritmos pueden presentar sesgos si se entrenan con datos parciales.", answer: true },
    { question: "La robótica no influirá en el futuro del trabajo.", answer: false },
    { question: "La IA se utiliza en la creación de contenido artístico.", answer: true },
    { question: "El aprendizaje automático es lo mismo que la inteligencia artificial.", answer: false },
    { question: "Los asistentes virtuales son un ejemplo de IA aplicada.", answer: true },
    { question: "La tecnología futurista no influirá en el sector educativo.", answer: false },
    { question: "Los robots pueden tener emociones.", answer: false },
    { question: "La automatización puede mejorar la productividad.", answer: true },
    { question: "La IA es incapaz de predecir tendencias de mercado.", answer: false },
    { question: "La ciberseguridad se beneficia del uso de inteligencia artificial.", answer: true },
    { question: "La realidad virtual es irrelevante para la formación profesional.", answer: false },
    { question: "La IA puede ayudar a optimizar el consumo energético.", answer: true },
    { question: "El futuro de la tecnología no incluye la integración de la IA en la vida cotidiana.", answer: false }
  ];
  let quizIndex = 0;
  let quizScore = 0;
  let quizTime = 120;
  let quizTimerInterval;
  const quizTimerElem = document.getElementById("quiz-timer");
  const quizQuestionElem = document.getElementById("quiz-question");
  const quizFeedbackElem = document.getElementById("quiz-feedback");
  const quizScoreElem = document.getElementById("quiz-score");
  const quizTrueBtn = document.getElementById("quiz-true");
  const quizFalseBtn = document.getElementById("quiz-false");
  const quizStartBtn = document.getElementById("quiz-start");
  const quizContainer = document.getElementById("quiz-container");
  function mostrarPreguntaQuiz() {
    if (quizIndex < quizQuestions.length) {
      quizQuestionElem.textContent = quizQuestions[quizIndex].question;
      quizFeedbackElem.textContent = "";
    } else {
      terminarQuiz();
    }
  }
  function terminarQuiz() {
    clearInterval(quizTimerInterval);
    if (quizScore >= 15) {
      quizFeedbackElem.textContent = `¡Ganaste! Puntaje: ${quizScore}/${quizQuestions.length}`;
    } else {
      quizFeedbackElem.textContent = `Perdiste. Puntaje: ${quizScore}/${quizQuestions.length}`;
    }
    quizTrueBtn.disabled = true;
    quizFalseBtn.disabled = true;
  }
  function iniciarTemporizadorQuiz() {
    clearInterval(quizTimerInterval);
    quizTime = 120;
    quizTimerElem.textContent = `Tiempo: ${quizTime}s`;
    quizTimerInterval = setInterval(() => {
      quizTime--;
      quizTimerElem.textContent = `Tiempo: ${quizTime}s`;
      if (quizTime <= 0) {
        terminarQuiz();
      }
    }, 1000);
  }
  quizTrueBtn.addEventListener("click", () => {
    if (quizQuestions[quizIndex].answer === true) quizScore++;
    quizScoreElem.textContent = `Puntaje: ${quizScore}`;
    quizIndex++;
    mostrarPreguntaQuiz();
  });
  quizFalseBtn.addEventListener("click", () => {
    if (quizQuestions[quizIndex].answer === false) quizScore++;
    quizScoreElem.textContent = `Puntaje: ${quizScore}`;
    quizIndex++;
    mostrarPreguntaQuiz();
  });
  quizStartBtn.addEventListener("click", () => {
    quizStartBtn.style.display = "none";
    quizContainer.style.display = "block";
    iniciarTemporizadorQuiz();
    mostrarPreguntaQuiz();
  });
  const quizRestartBtn = document.getElementById("quiz-restart");
  quizRestartBtn.addEventListener("click", () => {
    clearInterval(quizTimerInterval);
    quizIndex = 0;
    quizScore = 0;
    quizScoreElem.textContent = `Puntaje: ${quizScore}`;
    quizTrueBtn.disabled = false;
    quizFalseBtn.disabled = false;
    iniciarTemporizadorQuiz();
    mostrarPreguntaQuiz();
  });

  /* ---------------------------
     17. Crack the Code (10 intentos)
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
        document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
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
      const automation = Number(automationSlider.value);
      const robotics = Number(roboticsSlider.value);
      const transport = Number(transportSlider.value);
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
     15. Píldora Roja o Azul (Juego Matrix)
  --------------------------- */
  const redPillBtn = document.getElementById("red-pill");
  const bluePillBtn = document.getElementById("blue-pill");
  const pillMessageElem = document.getElementById("pill-message");
  if (redPillBtn) {
    redPillBtn.addEventListener("click", () => {
      pillMessageElem.textContent = "Has elegido la Píldora Roja. Bienvenido al mundo real.";
    });
  }
  if (bluePillBtn) {
    bluePillBtn.addEventListener("click", () => {
      pillMessageElem.textContent = "Has elegido la Píldora Azul. Continúas en la ilusión.";
    });
  }

  /* ---------------------------
     16. Quiz de Curiosidades (20 preguntas, 2 min)
  --------------------------- */
  const quizQuestions = [
    { question: "La inteligencia artificial puede aprender por sí sola.", answer: true },
    { question: "Los robots humanoides ya realizan tareas domésticas en masa.", answer: false },
    { question: "La computación cuántica está revolucionando la investigación en IA.", answer: true },
    { question: "La IA no tiene aplicaciones en la medicina.", answer: false },
    { question: "Los coches autónomos son solo una idea de ciencia ficción.", answer: false },
    { question: "La IA puede analizar grandes volúmenes de datos en segundos.", answer: true },
    { question: "La ética no es relevante en el desarrollo de IA.", answer: false },
    { question: "Los algoritmos pueden presentar sesgos si se entrenan con datos parciales.", answer: true },
    { question: "La robótica no influirá en el futuro del trabajo.", answer: false },
    { question: "La IA se utiliza en la creación de contenido artístico.", answer: true },
    { question: "El aprendizaje automático es lo mismo que la inteligencia artificial.", answer: false },
    { question: "Los asistentes virtuales son un ejemplo de IA aplicada.", answer: true },
    { question: "La tecnología futurista no influirá en el sector educativo.", answer: false },
    { question: "Los robots pueden tener emociones.", answer: false },
    { question: "La automatización puede mejorar la productividad.", answer: true },
    { question: "La IA es incapaz de predecir tendencias de mercado.", answer: false },
    { question: "La ciberseguridad se beneficia del uso de inteligencia artificial.", answer: true },
    { question: "La realidad virtual es irrelevante para la formación profesional.", answer: false },
    { question: "La IA puede ayudar a optimizar el consumo energético.", answer: true },
    { question: "El futuro de la tecnología no incluye la integración de la IA en la vida cotidiana.", answer: false }
  ];
  let quizIndex = 0;
  let quizScore = 0;
  let quizTime = 120;
  let quizTimerInterval;
  const quizTimerElem = document.getElementById("quiz-timer");
  const quizQuestionElem = document.getElementById("quiz-question");
  const quizFeedbackElem = document.getElementById("quiz-feedback");
  const quizScoreElem = document.getElementById("quiz-score");
  const quizTrueBtn = document.getElementById("quiz-true");
  const quizFalseBtn = document.getElementById("quiz-false");
  const quizStartBtn = document.getElementById("quiz-start");
  const quizContainer = document.getElementById("quiz-container");
  function mostrarPreguntaQuiz() {
    if (quizIndex < quizQuestions.length) {
      quizQuestionElem.textContent = quizQuestions[quizIndex].question;
      quizFeedbackElem.textContent = "";
    } else {
      terminarQuiz();
    }
  }
  function terminarQuiz() {
    clearInterval(quizTimerInterval);
    if (quizScore >= 15) {
      quizFeedbackElem.textContent = `¡Ganaste! Puntaje: ${quizScore}/${quizQuestions.length}`;
    } else {
      quizFeedbackElem.textContent = `Perdiste. Puntaje: ${quizScore}/${quizQuestions.length}`;
    }
    quizTrueBtn.disabled = true;
    quizFalseBtn.disabled = true;
  }
  function iniciarTemporizadorQuiz() {
    clearInterval(quizTimerInterval);
    quizTime = 120;
    quizTimerElem.textContent = `Tiempo: ${quizTime}s`;
    quizTimerInterval = setInterval(() => {
      quizTime--;
      quizTimerElem.textContent = `Tiempo: ${quizTime}s`;
      if (quizTime <= 0) {
        terminarQuiz();
      }
    }, 1000);
  }
  quizTrueBtn.addEventListener("click", () => {
    if (quizQuestions[quizIndex].answer === true) quizScore++;
    quizScoreElem.textContent = `Puntaje: ${quizScore}`;
    quizIndex++;
    mostrarPreguntaQuiz();
  });
  quizFalseBtn.addEventListener("click", () => {
    if (quizQuestions[quizIndex].answer === false) quizScore++;
    quizScoreElem.textContent = `Puntaje: ${quizScore}`;
    quizIndex++;
    mostrarPreguntaQuiz();
  });
  quizStartBtn.addEventListener("click", () => {
    quizStartBtn.style.display = "none";
    quizContainer.style.display = "block";
    iniciarTemporizadorQuiz();
    mostrarPreguntaQuiz();
  });
  const quizRestartBtn = document.getElementById("quiz-restart");
  quizRestartBtn.addEventListener("click", () => {
    clearInterval(quizTimerInterval);
    quizIndex = 0;
    quizScore = 0;
    quizScoreElem.textContent = `Puntaje: ${quizScore}`;
    quizTrueBtn.disabled = false;
    quizFalseBtn.disabled = false;
    iniciarTemporizadorQuiz();
    mostrarPreguntaQuiz();
  });

  /* ---------------------------
     17. Crack the Code (10 intentos)
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
        document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ---------------------------
     13. Efecto Bola Neurona y Onda Expansiva (omitido en este paso)
       (en esta versión usamos solo el efecto de distorsión cada 10s)
  --------------------------- */

  /* ---------------------------
     14. Efecto de distorsión de la realidad tipo Matrix
         Se añade la clase 'reality-distortion' al body durante 500ms cada 10s.
  --------------------------- */
  setInterval(() => {
    document.body.classList.add("reality-distortion");
    setTimeout(() => {
      document.body.classList.remove("reality-distortion");
    }, 500);
  }, 10000);

  /* ---------------------------
     15. Efecto de Scroll Animado (Fade In)
  --------------------------- */
  const scrollElements = document.querySelectorAll(".animate-on-scroll");
  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
  };
  const displayScrollElement = (element) => {
    element.classList.add("scrolled");
  };
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      }
    });
  };
  window.addEventListener("scroll", handleScrollAnimation);
  handleScrollAnimation();
});

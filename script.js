document.addEventListener("DOMContentLoaded", () => {
  /*******************************************
   * 1. Carga de la fuente Orbitron
   *******************************************/
  const linkOrbitron = document.createElement("link");
  linkOrbitron.rel = "stylesheet";
  linkOrbitron.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
  document.head.appendChild(linkOrbitron);

  /*******************************************
   * 2. Glitch en el Título (Verde)
   *******************************************/
  const title = document.querySelector(".glitch");
  setInterval(() => {
    if (title) title.classList.toggle("glitch-active");
  }, 2000);

  /*******************************************
   * 3. Barra Matrix (Verde)
   *******************************************/
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
        if (y > canvas.height && Math.random() > 0.975) { drops[i] = 0; }
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

  /*******************************************
   * 4. Cursor Futurista (Verde)
   *******************************************/
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);
  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate3d(${e.pageX}px, ${e.pageY}px, 0)`;
  });

  /*******************************************
   * 5. "Follow the white rabbit..." (typing)
   *******************************************/
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
      setTimeout(() => { typingText.classList.remove("typing-glitch"); }, 100);
    }
    if (idx > phrase.length) {
      clearInterval(typingInterval);
      setTimeout(() => { idx = 0; typingText.textContent = ""; typingInterval = setInterval(typePhrase, 100); }, 1500);
    }
  }
  typingInterval = setInterval(typePhrase, 100);

  /*******************************************
   * 6. Desafío: Adivina la Palabra
   *******************************************/
  const palabrasCurso = [
    { word: "robot", hint: "Máquina programada para tareas humanas." },
    { word: "red", hint: "Conjunto de nodos interconectados." },
    { word: "algoritmo", hint: "Reglas para resolver problemas." },
    { word: "datos", hint: "El combustible de la IA." }
  ];
  const randomIndex = Math.floor(Math.random() * palabrasCurso.length);
  const selectedWord = palabrasCurso[randomIndex].word;
  const hint = palabrasCurso[randomIndex].hint;
  const wordDisplay = document.getElementById("word-display");
  const hintElem = document.getElementById("hint");
  const messageElem = document.getElementById("message");
  const attemptsElem = document.getElementById("attempts-remaining");
  const letterInput = document.getElementById("letter-input");
  const checkBtn = document.getElementById("check-letter");
  let wordArray = Array.from(selectedWord).map(() => "_");
  let attempts = selectedWord.length + 3;
  if (hintElem) hintElem.textContent = "Pista: " + hint;
  if (wordDisplay) wordDisplay.textContent = wordArray.join(" ");
  if (attemptsElem) attemptsElem.textContent = `Intentos restantes: ${attempts}`;
  if (checkBtn) {
    checkBtn.addEventListener("click", () => {
      if (!letterInput) return;
      const letter = letterInput.value.toLowerCase();
      letterInput.value = "";
      if (!letter || letter.length !== 1) return;
      let found = false;
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) { wordArray[i] = letter; found = true; }
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
  }

  /*******************************************
   * 7. Trivia IA
   *******************************************/
  const triviaPool = [
    { question: "¿Qué es un algoritmo?", answers: ["Un tipo de robot", "Un conjunto de reglas para resolver problemas", "Un lenguaje de programación"], correct: 1 },
    { question: "¿Cuál es la principal función del machine learning?", answers: ["Aprender de datos", "Crear algoritmos", "Programar robots"], correct: 0 },
    { question: "¿Qué es el overfitting en IA?", answers: ["Un modelo que generaliza demasiado", "Un modelo que se adapta demasiado a los datos", "Un error de programación"], correct: 1 },
    { question: "¿Qué es una red neuronal?", answers: ["Una red de computadoras", "Un modelo inspirado en el cerebro humano", "Una base de datos"], correct: 1 },
    { question: "¿Qué representa AI en inglés?", answers: ["Artificial Intelligence", "Automatic Intelligence", "Applied Innovation"], correct: 0 },
    { question: "¿Qué es el aprendizaje supervisado?", answers: ["Sin datos etiquetados", "Con datos etiquetados", "Por ensayo y error"], correct: 1 },
    { question: "¿Cuál de los siguientes es un algoritmo de clasificación?", answers: ["K-means", "Regresión logística", "PCA"], correct: 1 },
    { question: "¿Qué es el deep learning?", answers: ["Aprendizaje superficial", "Redes neuronales profundas", "Almacenamiento de datos"], correct: 1 },
    { question: "¿Por qué es crucial la ética en la IA?", answers: ["Para evitar sesgos", "Solo para cumplir normas", "No es relevante"], correct: 0 },
    { question: "¿Qué significa ‘training data’?", answers: ["Datos de prueba", "Datos de entrenamiento", "Datos de validación"], correct: 1 }
  ];
  function getRandomTrivia(n) {
    const shuffled = triviaPool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }
  const triviaQuestions = getRandomTrivia(5);
  let triviaIndex = 0;
  let triviaScore = 0;
  const triviaQuestionElem = document.getElementById("trivia-question");
  const triviaAnswersElem = document.getElementById("trivia-answers");
  const triviaResultElem = document.getElementById("trivia-result");
  const triviaNextBtn = document.getElementById("trivia-next");
  function mostrarPreguntaTrivia() {
    if (triviaIndex >= triviaQuestions.length) return;
    const q = triviaQuestions[triviaIndex];
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
        Array.from(triviaAnswersElem.children).forEach(opt => { opt.style.pointerEvents = "none"; });
      });
      triviaAnswersElem.appendChild(div);
    });
    if (triviaResultElem) triviaResultElem.textContent = "";
  }
  if (triviaNextBtn) {
    triviaNextBtn.addEventListener("click", () => {
      triviaIndex++;
      if (triviaIndex < triviaQuestions.length) { mostrarPreguntaTrivia(); }
      else {
        if (triviaQuestionElem) triviaQuestionElem.textContent = "¡Has completado la trivia!";
        if (triviaAnswersElem) triviaAnswersElem.innerHTML = `Puntuación: ${triviaScore}/${triviaQuestions.length}`;
        if (triviaResultElem) triviaResultElem.textContent = "";
        triviaNextBtn.disabled = true;
      }
    });
    mostrarPreguntaTrivia();
  }

  /*******************************************
   * 8. Crack the Code (Símbolos variados)
   *******************************************/
  const symbolPool = "!@#$%^&*A0BCDEFGH";
  const codeSymbols = symbolPool.split("");
  const codeLength = 4;
  let secretCode = [];
  for (let i = 0; i < codeLength; i++) {
    const r = Math.floor(Math.random() * codeSymbols.length);
    secretCode.push(codeSymbols[r]);
  }
  let codeAttempts = 7;
  const codeFeedback = document.getElementById("code-feedback");
  const codeAttemptsElem = document.getElementById("code-attempts");
  const codeCheckBtn = document.getElementById("code-check");
  const codeResetBtn = document.getElementById("code-reset");
  const codeInputs = document.querySelectorAll(".code-char");
  const symbolListElem = document.getElementById("symbol-list");
  if (codeAttemptsElem) codeAttemptsElem.textContent = `Intentos restantes: ${codeAttempts}`;
  if (symbolListElem) {
    let html = "";
    codeSymbols.forEach(sym => { html += `<button class="symbol-btn">${sym}</button>`; });
    symbolListElem.innerHTML = html;
    const symbolBtns = symbolListElem.querySelectorAll(".symbol-btn");
    symbolBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        for (let i = 0; i < codeInputs.length; i++) {
          if (!codeInputs[i].value) { codeInputs[i].value = btn.textContent; break; }
        }
      });
    });
  }
  if (codeResetBtn) {
    codeResetBtn.addEventListener("click", () => {
      codeInputs.forEach(inp => inp.value = "");
      codeFeedback.textContent = "";
    });
  }
  if (codeCheckBtn) {
    codeCheckBtn.addEventListener("click", () => {
      if (codeAttempts <= 0) return;
      let userCode = [];
      codeInputs.forEach(inp => userCode.push(inp.value));
      if (userCode.some(v => !v)) { codeFeedback.textContent = "Completa los 4 símbolos antes de comprobar."; return; }
      let correctPos = 0, correctSym = 0;
      let secretCopy = [...secretCode], userCopy = [...userCode];
      for (let i = 0; i < codeLength; i++) {
        if (userCopy[i] === secretCopy[i]) { correctPos++; secretCopy[i] = null; userCopy[i] = null; }
      }
      for (let i = 0; i < codeLength; i++) {
        if (userCopy[i]) {
          const idx = secretCopy.indexOf(userCopy[i]);
          if (idx !== -1) { correctSym++; secretCopy[idx] = null; }
        }
      }
      if (correctPos === codeLength) {
        codeFeedback.textContent = `🎉 ¡Código descifrado! Era: ${secretCode.join("")}`;
        codeCheckBtn.disabled = true;
        symbolListElem.style.pointerEvents = "none";
        codeInputs.forEach(inp => inp.disabled = true);
      } else {
        codeAttempts--;
        codeAttemptsElem.textContent = `Intentos restantes: ${codeAttempts}`;
        if (codeAttempts <= 0) {
          codeFeedback.textContent = `❌ Sin intentos. El código era: ${secretCode.join("")}`;
          codeCheckBtn.disabled = true;
          symbolListElem.style.pointerEvents = "none";
          codeInputs.forEach(inp => inp.disabled = true);
        } else {
          codeFeedback.textContent = `Posición exacta: ${correctPos} | Símbolo correcto en otra posición: ${correctSym}`;
        }
      }
    });
  }

  /*******************************************
   * 9. Memory AI Cards
   *******************************************/
  const memoryContainer = document.getElementById("memory-container");
  const memoryMessage = document.getElementById("memory-message");
  const cardPool = ["🤖", "⚙️", "💻", "🔮", "🎉", "🌐", "🚀", "🧠"];
  const cardSymbols = [];
  cardPool.forEach(symbol => { cardSymbols.push(symbol, symbol); });
  let flippedCards = [];
  let matchedPairs = 0;
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  const shuffledSymbols = shuffleArray([...cardSymbols]);
  function createMemoryBoard() {
    if (!memoryContainer) return;
    memoryContainer.innerHTML = "";
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
    memoryMessage.textContent = "";
  }
  function flipCard(card) {
    if (card.classList.contains("flipped")) return;
    if (flippedCards.length === 2) return;
    card.classList.add("flipped");
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);
    if (flippedCards.length === 2) { setTimeout(checkMatch, 600); }
  }
  function checkMatch() {
    const [c1, c2] = flippedCards;
    if (c1.dataset.symbol === c2.dataset.symbol) {
      matchedPairs++;
      c1.removeEventListener("click", () => flipCard(c1));
      c2.removeEventListener("click", () => flipCard(c2));
      if (matchedPairs === cardSymbols.length / 2) { memoryMessage.textContent = "¡Has encontrado todas las parejas!"; }
    } else {
      c1.classList.remove("flipped"); c1.textContent = "?";
      c2.classList.remove("flipped"); c2.textContent = "?";
    }
    flippedCards = [];
  }
  if (memoryContainer) createMemoryBoard();

  /*******************************************
   * 10. Neon TicTacToe (centrado)
   *******************************************/
  const tictactoeContainer = document.getElementById("tictactoe-container");
  const tictactoeMessage = document.getElementById("tictactoe-message");
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameOver = false;
  function createTicTacToe() {
    if (!tictactoeContainer) return;
    tictactoeContainer.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("tictactoe-cell");
      cell.dataset.index = i;
      cell.textContent = board[i];
      cell.addEventListener("click", () => handleMove(cell));
      tictactoeContainer.appendChild(cell);
    }
    tictactoeMessage.textContent = "";
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
  }
  function handleMove(cell) {
    if (gameOver) return;
    const idx = cell.dataset.index;
    if (board[idx] !== "") return;
    board[idx] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
  }
  function checkWinner() {
    const combos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let c of combos) {
      const [a, b, d] = c;
      if (board[a] && board[a] === board[b] && board[b] === board[d]) {
        gameOver = true;
        tictactoeMessage.textContent = `🎉 Jugador ${board[a]} gana`;
        return;
      }
    }
    if (!board.includes("")) {
      gameOver = true;
      tictactoeMessage.textContent = "Empate. Tablero lleno.";
    }
  }
  createTicTacToe();

  /*******************************************
   * 11. AI Number Guesser
   *******************************************/
  const guesserContainer = document.getElementById("guesser-container");
  const startBtn = document.getElementById("start-guesser");
  const guesserQuestion = document.getElementById("guesser-question");
  const higherBtn = document.getElementById("higher");
  const lowerBtn = document.getElementById("lower");
  const correctBtn = document.getElementById("correct");
  const guesserFeedback = document.getElementById("guesser-feedback");
  let guesserLow = 1;
  let guesserHigh = 100;
  let guesserCurrent = 0;
  let guesserOver = false;
  function guessNumber() {
    guesserCurrent = Math.floor((guesserLow + guesserHigh) / 2);
    guesserQuestion.textContent = `¿Es ${guesserCurrent}?`;
  }
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      guesserLow = 1; guesserHigh = 100; guesserOver = false;
      guesserFeedback.textContent = ""; guessNumber();
    });
  }
  if (higherBtn) {
    higherBtn.addEventListener("click", () => {
      if (guesserOver) return;
      guesserLow = guesserCurrent + 1;
      if (guesserLow > guesserHigh) { guesserFeedback.textContent = "¡Inconsistente! No quedan números."; guesserOver = true; return; }
      guessNumber();
    });
  }
  if (lowerBtn) {
    lowerBtn.addEventListener("click", () => {
      if (guesserOver) return;
      guesserHigh = guesserCurrent - 1;
      if (guesserHigh < guesserLow) { guesserFeedback.textContent = "¡Inconsistente! No quedan números."; guesserOver = true; return; }
      guessNumber();
    });
  }
  if (correctBtn) {
    correctBtn.addEventListener("click", () => {
      if (guesserOver) return;
      guesserFeedback.textContent = `🎉 ¡La IA adivinó! Era ${guesserCurrent}`;
      guesserOver = true;
    });
  }

  /*******************************************
   * 12. Noticias (API Apitube con indicador)
   *******************************************/
  const fallbackNews = [
    { title: "Última hora: ChatGPT-4 revoluciona la IA", text: "OpenAI lanza GPT-4 con capacidades multimodales que sorprenden al mundo." },
    { title: "Google responde con Bard", text: "El gigante lanza su chatbot en versión beta para competir en IA." },
    { title: "Robots en fábricas: Producción automatizada", text: "La integración de IA impulsa la eficiencia industrial." },
    { title: "Tesla mejora su autopiloto con IA", text: "Nuevas actualizaciones prometen mayor seguridad en la conducción autónoma." },
    { title: "Microsoft reinventa Bing con IA", text: "La búsqueda online se vuelve más inteligente con IA integrada." },
    { title: "DeepMind avanza en algoritmos de IA", text: "Nuevos desarrollos en aprendizaje profundo marcan tendencia." }
  ];
  async function loadNews() {
    const newsContainer = document.getElementById("news-container");
    if (!newsContainer) return;
    newsContainer.innerHTML = "Cargando noticias...";
    try {
      const response = await fetch("https://api.apitube.com/news?api_key=api_live_QjyerYEi61p2aHyQldFOwQiYX3sXvuk9k8QTF8lz6ZbMbRFJ9Ov");
      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) throw new Error("No hay noticias");
      newsContainer.innerHTML = "";
      data.slice(0, 6).forEach(item => {
        const box = document.createElement("div");
        box.classList.add("news-box");
        box.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
        const indicator = document.createElement("span");
        indicator.classList.add("api-indicator");
        box.appendChild(indicator);
        newsContainer.appendChild(box);
      });
    } catch (error) {
      console.error("Error en API, usando noticias fallback:", error);
      newsContainer.innerHTML = "";
      fallbackNews.forEach(item => {
        const box = document.createElement("div");
        box.classList.add("news-box");
        box.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
        const indicator = document.createElement("span");
        indicator.classList.add("api-indicator");
        box.appendChild(indicator);
        newsContainer.appendChild(box);
      });
    }
  }
  loadNews();
  setInterval(loadNews, 300000);

  /*******************************************
   * 13. Widgets Futuristas
   *******************************************/
  // 13.1 Citas IA
  const quotes = [
    "La IA es la nueva electricidad.",
    "Los datos son el nuevo petróleo.",
    "La creatividad sigue siendo humana.",
    "La IA sin ética es solo código.",
    "El futuro pertenece a la IA.",
    "Innovar es vivir en la era de la inteligencia.",
    "La tecnología se funde con la imaginación.",
    "El código es poesía, la IA es su musa."
  ];
  function cambiarCita() {
    const quoteElem = document.getElementById("ai-quote");
    if (!quoteElem) return;
    const r = Math.floor(Math.random() * quotes.length);
    quoteElem.textContent = quotes[r];
  }
  setInterval(cambiarCita, 10000);
  cambiarCita();

  // 13.2 Contador Patentes
  let patenteContador = 50000;
  function actualizarPatentes() {
    const patentCountElem = document.getElementById("patent-count");
    if (!patentCountElem) return;
    patentCountElem.textContent = `Patentes registradas en IA: ${patenteContador}`;
    patenteContador += Math.floor(Math.random() * 10);
  }
  setInterval(actualizarPatentes, 5000);
  actualizarPatentes();

  // 13.3 Predicciones IA
  const predicciones = [
    "En 2030, el 60% de los trabajos incluirán IA colaborativa.",
    "Los robots humanoides convivirán con nosotros en 2050.",
    "La computación cuántica cambiará el Deep Learning en 2040.",
    "La IA superará la creatividad humana en 2045.",
    "El aprendizaje automático se integrará en el día a día.",
    "La IA potenciará la medicina personalizada.",
    "La automatización transformará la industria global.",
    "La ética se convertirá en la base de la tecnología del futuro."
  ];
  const predictionTextElem = document.getElementById("prediction-text");
  if (predictionTextElem) {
    predictionTextElem.textContent = predicciones[Math.floor(Math.random() * predicciones.length)];
  }

  // 13.4 Mapa de Innovación
  const innovacionOptions = [
    "Ciudades top en IA: San Francisco, Beijing, Londres, Tokio.",
    "Centros de innovación: Silicon Valley, Tel Aviv, Bangalore, Seúl.",
    "Ecosistemas de tecnología: Estocolmo, Berlín, Amsterdam, Melbourne.",
    "Capitales de la innovación: Nueva York, París, Dubai, Sídney."
  ];
  const mapContainer = document.getElementById("map-container");
  if (mapContainer) {
    mapContainer.textContent = innovacionOptions[Math.floor(Math.random() * innovacionOptions.length)];
  }

  // 13.5 Sorpresa Diaria
  const sorpresas = [
    "En 2025, el 70% de las empresas usará IA para atención al cliente.",
    "Los coches autónomos evitarán el 90% de los accidentes viales.",
    "La IA podría superar la creatividad humana en 2045.",
    "Un nuevo avance en IA reduce el consumo energético un 40%.",
    "La IA transformará el sector educativo con tutorías personalizadas.",
    "Robots de asistencia se integrarán en hogares inteligentes.",
    "La visión por computador revolucionará la seguridad vial.",
    "La automatización impulsará el comercio global."
  ];
  const revealBtn = document.getElementById("reveal-surprise");
  const surpriseTextElem = document.getElementById("surprise-text");
  if (revealBtn && surpriseTextElem) {
    revealBtn.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * sorpresas.length);
      surpriseTextElem.textContent = sorpresas[randomIndex];
    });
  }

  // 13.6 Ranking Países
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
    countriesData.forEach(p => {
      html += `
        <div class="country-bar">
          <div class="country-fill" style="width:0%;">
            ${p.name}: 0%
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

  /*******************************************
   * 14. Sopa de Letras AI
   *******************************************/
  const wordsearchContainer = document.getElementById("wordsearch-container");
  const wordsearchWordsElem = document.getElementById("wordsearch-words");
  const wsPool = ["ROBOT", "ALGORITMO", "RED", "DATOS", "IA", "INTELIGENCIA", "SISTEMA", "APRENDIZAJE", "CÓDIGO", "MÁQUINA"];
  const wsWords = wsPool.sort(() => 0.5 - Math.random()).slice(0, 5);
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
    for (let attempt = 0; attempt < 100; attempt++) {
      const rr = Math.floor(Math.random() * wsRows);
      const cc = Math.floor(Math.random() * (wsCols - word.length + 1));
      if (placeWordHorizontal(word, rr, cc)) return true;
    }
    for (let attempt = 0; attempt < 100; attempt++) {
      const rr = Math.floor(Math.random() * (wsRows - word.length + 1));
      const cc = Math.floor(Math.random() * wsCols);
      if (placeWordVertical(word, rr, cc)) return true;
    }
    return false;
  }
  wsWords.forEach(w => insertWord(w));
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < wsRows; r++) {
    for (let c = 0; c < wsCols; c++) {
      if (!grid[r][c]) { grid[r][c] = letters.charAt(Math.floor(Math.random() * letters.length)); }
    }
  }
  if (wordsearchContainer) {
    wordsearchContainer.innerHTML = "";
    for (let r = 0; r < wsRows; r++) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("wordsearch-row");
      for (let c = 0; c < wsCols; c++) {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("wordsearch-cell");
        cellDiv.textContent = grid[r][c];
        cellDiv.addEventListener("click", () => { cellDiv.classList.toggle("highlighted"); });
        rowDiv.appendChild(cellDiv);
      }
      wordsearchContainer.appendChild(rowDiv);
    }
  }
  if (wordsearchWordsElem) {
    wordsearchWordsElem.textContent = "Palabras: " + wsWords.join(", ");
  }

  /*******************************************
   * 15. Nuevo Juego: Caza de Partículas AI
   * Temporizador de 30 segundos
   *******************************************/
  function initParticleHunt() {
    const container = document.getElementById("particle-hunt-container");
    const scoreElem = document.getElementById("particle-hunt-score");
    const timerElem = document.getElementById("particle-hunt-timer");
    if (!container || !scoreElem || !timerElem) return;
    container.innerHTML = "";
    let score = 0;
    let timeLeft = 30;
    scoreElem.textContent = `Puntuación: ${score}`;
    timerElem.textContent = `Tiempo: ${timeLeft}s`;
    function spawnParticle() {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      const containerRect = container.getBoundingClientRect();
      const x = Math.random() * (containerRect.width - 20);
      const y = Math.random() * (containerRect.height - 20);
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      container.appendChild(particle);
      particle.addEventListener("animationend", () => {
        if (particle.parentElement === container) { container.removeChild(particle); }
      });
      particle.addEventListener("click", () => {
        score++;
        scoreElem.textContent = `Puntuación: ${score}`;
        if (particle.parentElement === container) { container.removeChild(particle); }
      });
    }
    const particleInterval = setInterval(spawnParticle, 1000);
    const timerInterval = setInterval(() => {
      timeLeft--;
      timerElem.textContent = `Tiempo: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        clearInterval(particleInterval);
        alert(`Tiempo terminado. Tu puntuación final es: ${score}`);
      }
    }, 1000);
  }
  const startParticleHuntBtn = document.getElementById("start-particle-hunt");
  if (startParticleHuntBtn) {
    startParticleHuntBtn.addEventListener("click", initParticleHunt);
  }

  /*******************************************
   * 16. Curso Futurista de Fundamentos de la IA
   * Mostrar/Ocultar contenido de cada módulo
   *******************************************/
  const moduleButtons = document.querySelectorAll(".start-module");
  moduleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        button.textContent = "Ocultar Módulo";
      } else {
        content.style.display = "none";
        button.textContent = "Empezar Módulo";
      }
    });
  });
});

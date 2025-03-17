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

  /*******************************************
   * 6. Desafío: Adivina la Palabra
   *******************************************/
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
  }

  /*******************************************
   * 7. Trivia IA
   *******************************************/
  const triviaQuestions = [
    { question: "¿Qué es un algoritmo?", answers: ["Un tipo de robot", "Un conjunto de reglas para resolver problemas", "Un lenguaje de programación"], correct: 1 },
    { question: "¿Cuál de estas ciudades es puntera en IA?", answers: ["San Francisco", "El Cairo", "Lisboa"], correct: 0 },
    { question: "¿Qué es 'Machine Learning'?", answers: ["Aprendizaje automático", "Un sistema de chat", "Una base de datos de imágenes"], correct: 0 },
    { question: "¿Qué hace la 'Visión por Computador'?", answers: ["Crea imágenes 3D", "Permite a la máquina 'ver' e interpretar imágenes", "Diseña páginas web"], correct: 1 },
    { question: "La ética en la IA es importante para...", answers: ["Evitar sesgos y daños sociales", "Hacer juegos divertidos", "Acelerar la computación cuántica"], correct: 0 }
  ];
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
        Array.from(triviaAnswersElem.children).forEach(opt => {
          opt.style.pointerEvents = "none";
        });
      });
      triviaAnswersElem.appendChild(div);
    });
    if (triviaResultElem) triviaResultElem.textContent = "";
  }

  if (triviaNextBtn) {
    triviaNextBtn.addEventListener("click", () => {
      triviaIndex++;
      if (triviaIndex < triviaQuestions.length) {
        mostrarPreguntaTrivia();
      } else {
        if (triviaQuestionElem) triviaQuestionElem.textContent = "¡Has completado la trivia!";
        if (triviaAnswersElem) triviaAnswersElem.innerHTML = `Puntuación: ${triviaScore}/${triviaQuestions.length}`;
        if (triviaResultElem) triviaResultElem.textContent = "";
        triviaNextBtn.disabled = true;
      }
    });
    mostrarPreguntaTrivia();
  }

  /*******************************************
   * 8. Crack the Code (10 símbolos)
   *******************************************/
  const codeSymbols = "!@#$%^&*A0".split("");
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
        if (codeFeedback) codeFeedback.textContent = "Completa los 4 símbolos antes de comprobar.";
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
        if (codeFeedback) codeFeedback.textContent = `🎉 ¡Código descifrado! Era: ${secretCode.join("")}`;
        codeCheckBtn.disabled = true;
        if (symbolListElem) symbolListElem.style.pointerEvents = "none";
        codeInputs.forEach(inp => inp.disabled = true);
      } else {
        codeAttempts--;
        if (codeAttemptsElem) codeAttemptsElem.textContent = `Intentos restantes: ${codeAttempts}`;
        if (codeAttempts <= 0) {
          if (codeFeedback) codeFeedback.textContent = `❌ Sin intentos. El código era: ${secretCode.join("")}`;
          codeCheckBtn.disabled = true;
          if (symbolListElem) symbolListElem.style.pointerEvents = "none";
          codeInputs.forEach(inp => inp.disabled = true);
        } else {
          if (codeFeedback) codeFeedback.textContent = `Posición exacta: ${correctPos} | Símbolo correct

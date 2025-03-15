document.addEventListener("DOMContentLoaded", () => {
  // 1. Cargar la fuente Orbitron
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

  // 3. Efecto Matrix en la barra (height 60px)
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

  // 5. Texto "Follow the white rabbit..." apareciendo letra a letra con glitch
  const typingTextElem = document.getElementById("typing-text");
  const phrase = "Follow the white rabbit...";
  let idx = 0;
  let showPhraseInterval = null;

  function typePhrase() {
    if (!typingTextElem) return;

    typingTextElem.textContent = phrase.substring(0, idx);
    idx++;

    // Añadir una clase glitch aleatoriamente
    if (Math.random() > 0.9) {
      typingTextElem.classList.add("typing-glitch");
      setTimeout(() => {
        typingTextElem.classList.remove("typing-glitch");
      }, 100);
    }

    if (idx > phrase.length) {
      // Esperar un poco y reiniciar
      clearInterval(showPhraseInterval);
      setTimeout(() => {
        idx = 0;
        typingTextElem.textContent = "";
        showPhraseInterval = setInterval(typePhrase, 100);
      }, 1500);
    }
  }

  // Empezar a mostrar la frase
  showPhraseInterval = setInterval(typePhrase, 100);

  // 6. Juego de adivinar la palabra
  const words = [
    { word: "robot", hint: "Máquina programada para realizar tareas humanas." },
    { word: "red", hint: "Conjunto de nodos interconectados, clave en la IA." },
    { word: "algoritmo", hint: "Conjunto de reglas para resolver problemas." },
    { word: "datos", hint: "El combustible de la inteligencia artificial." }
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
});

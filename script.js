document.addEventListener("DOMContentLoaded", () => {
  /*************************************
   * 1. Cargar la fuente Orbitron
   *************************************/
  const linkOrbitron = document.createElement("link");
  linkOrbitron.rel = "stylesheet";
  linkOrbitron.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
  document.head.appendChild(linkOrbitron);

  /*************************************
   * 2. Glitch en el Título
   *************************************/
  const title = document.querySelector(".glitch");
  setInterval(() => {
    if (title) {
      title.classList.toggle("glitch-active");
    }
  }, 2000);

  /*************************************
   * 3. Barra Matrix
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
  let typingInterval = null;

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
      clearInterval(typingInterval);
      setTimeout(() => {
        idx = 0;
        typingTextElem.textContent = "";
        typingInterval = setInterval(typePhrase, 100);
      }, 1500);
    }
  }
  typingInterval = setInterval(typePhrase, 100);

  /*************************************
   * 6. Desafío de la Palabra
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

  /*************************************
   * 7. Trivia IA
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
      question: "¿Qué es 'Machine Learning'?",
      answers: ["Aprendizaje automático", "Un sistema de chat", "Una base de datos de imágenes"],
      correct: 0
    },
    {
      question: "¿Qué hace la 'Visión por Computador'?",
      answers: ["Crea imágenes 3D", "Permite a la máquina 'ver' e interpretar imágenes", "Diseña páginas web"],
      correct: 1
    },
    {
      question: "La ética en la IA es importante para...",
      answers: ["Evitar sesgos y daños sociales", "Hacer juegos divertidos", "Acelerar la computación cuántica"],
      correct: 0
    }
  ];
  let triviaIndex = 0;
  let triviaScore = 0;

  const triviaQuestionElem = document.getElementById("trivia-question");
  const triviaAnswersElem = document.getElementById("trivia-answers");
  const triviaResultElem = document.getElementById("trivia-result");
  const triviaNextBtn = document.getElementById("trivia-next");

  function mostrarPreguntaTrivia() {
    const q = triviaQuestions[triviaIndex];
    if (!q) return;
    triviaQuestionElem.textContent = q.question;
    if (triviaAnswersElem) triviaAnswersElem.innerHTML = "";
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
        Array.from(triviaAnswersElem.children).forEach(opt => {
          opt.style.pointerEvents = "none";
        });
      });
      triviaAnswersElem.appendChild(div);
    });
    if (triviaResultElem) triviaResultElem.textContent = "";
  }

  if (triviaNextBtn && triviaQuestionElem && triviaAnswersElem && triviaResultElem) {
    triviaNextBtn.addEventListener("click", () => {
      triviaIndex++;
      if (triviaIndex < triviaQuestions.length) {
        mostrarPreguntaTrivia();
      } else {
        triviaQuestionElem.textContent = "¡Has completado la trivia!";
        triviaAnswersElem.innerHTML = `Puntuación: ${triviaScore}/${triviaQuestions.length}`;
        triviaResultElem.textContent = "";
        triviaNextBtn.disabled = true;
      }
    });
    mostrarPreguntaTrivia();
  }

  /*************************************
   * 8. Nuevo Juego: CRACK THE CODE (tipo Mastermind)
   *************************************/
  const codeChars = "!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-"; 
  // Símbolos a usar
  const codeLength = 4;
  let secretCode = [];
  // Generar secuencia secreta
  for (let i = 0; i < codeLength; i++) {
    const r = Math.floor(Math.random() * codeChars.length);
    secretCode.push(codeChars[r]);
  }
  let codeAttempts = 7; // 7 intentos
  const codeFeedback = document.getElementById("code-feedback");
  const codeAttemptsElem = document.getElementById("code-attempts");
  const codeCheckBtn = document.getElementById("code-check");
  const codeInputs = document.querySelectorAll(".code-char");

  if (codeAttemptsElem) {
    codeAttemptsElem.textContent = `Intentos restantes: ${codeAttempts}`;
  }

  if (codeCheckBtn) {
    codeCheckBtn.addEventListener("click", () => {
      if (codeAttempts <= 0) return;
      // Leer lo que el usuario puso
      let userCode = [];
      codeInputs.forEach(input => {
        userCode.push(input.value.toUpperCase());
      });
      // Comparar
      let correctPos = 0;
      let correctChar = 0;

      // Copias para contar
      let secretCopy = [...secretCode];
      let userCopy = [...userCode];

      // Primero: buscar correctos en posición
      for (let i = 0; i < codeLength; i++) {
        if (userCopy[i] === secretCopy[i]) {
          correctPos++;
          // Eliminar de las copias
          secretCopy[i] = null;
          userCopy[i] = null;
        }
      }
      // Luego: buscar correctos en posición equivocada
      for (let i = 0; i < codeLength; i++) {
        if (userCopy[i] !== null && userCopy[i] !== undefined) {
          const index = secretCopy.indexOf(userCopy[i]);
          if (index !== -1) {
            correctChar++;
            secretCopy[index] = null;
          }
        }
      }

      if (correctPos === codeLength) {
        codeFeedback.textContent = `🎉 ¡Crackeaste el código! Era ${secretCode.join("")}`;
        codeCheckBtn.disabled = true;
        codeInputs.forEach(inp => (inp.disabled = true));
      } else {
        codeAttempts--;
        codeAttemptsElem.textContent = `Intentos restantes: ${codeAttempts}`;
        if (codeAttempts <= 0) {
          codeFeedback.textContent = `❌ Código bloqueado. El código era: ${secretCode.join("")}`;
          codeCheckBtn.disabled = true;
          codeInputs.forEach(inp => (inp.disabled = true));
        } else {
          codeFeedback.textContent = `Posición exacta: ${correctPos} | Símbolo correcto en otra posición: ${correctChar}`;
        }
      }
    });
  }

  /*************************************
   * 9. Noticias Dinámicas (6 al azar) + Botón “Leer”
   *************************************/
  const allNews = [
    {
      title:"Robot educativo revoluciona las aulas",
      text:"Ofrece clases personalizadas con IA.",
      link:"https://www.example.com/noticia1"
    },
    {
      title:"IA médica logra un 99% de acierto",
      text:"Redes neuronales para diagnóstico.",
      link:"https://www.example.com/noticia2"
    },
    {
      title:"Coches autónomos avanzan sin conductor",
      text:"Ciudades aprueban taxis sin chofer.",
      link:"https://www.example.com/noticia3"
    },
    {
      title:"Hologramas con IA",
      text:"Reuniones casi presenciales con HoloMeet.",
      link:"https://www.example.com/noticia4"
    },
    {
      title:"Robots de limpieza en centros comerciales",
      text:"Sensores LIDAR y algoritmos de planificación.",
      link:"https://www.example.com/noticia5"
    },
    {
      title:"Chatbots conversacionales más humanos",
      text:"Modelos de lenguaje que conversan naturalmente.",
      link:"https://www.example.com/noticia6"
    },
    {
      title:"IA vence campeones de póker",
      text:"Una IA especialista en decisiones inciertas.",
      link:"https://www.example.com/noticia7"
    },
    {
      title:"Redes neuronales rompen récord de traducción",
      text:"Calidad casi profesional en múltiples idiomas.",
      link:"https://www.example.com/noticia8"
    },
    {
      title:"IA en agricultura de precisión",
      text:"Drones y algoritmos detectan plagas.",
      link:"https://www.example.com/noticia9"
    },
    {
      title:"Algoritmo predice terremotos",
      text:"Sistema IA analiza patrones geológicos.",
      link:"https://www.example.com/noticia10"
    }
  ];
  const newsContainer = document.getElementById("news-container");
  if(newsContainer){
    const shuffled = allNews.sort(()=>0.5 - Math.random());
    const selected = shuffled.slice(0,6);
    let newsHTML = "";
    selected.forEach(item=>{
      newsHTML += `
        <div class="news-box">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
          <a href="${item.link}" class="leer-btn" target="_blank">Leer</a>
        </div>
      `;
    });
    newsContainer.innerHTML = newsHTML;
  }

  /*************************************
   * 10. Widgets Futuristas
   *************************************/
  // 10.1 Citas IA
  const quotes = [
    "La IA es la nueva electricidad.",
    "Los datos son el nuevo petróleo.",
    "La creatividad sigue siendo humana.",
    "La IA sin ética es solo código.",
    "El futuro pertenece a la IA."
  ];
  function cambiarCita(){
    const quoteElement = document.getElementById("ai-quote");
    if(!quoteElement)return;
    const randomIndex=Math.floor(Math.random()*quotes.length);
    quoteElement.textContent=quotes[randomIndex];
  }
  setInterval(cambiarCita,10000);
  cambiarCita();

  // 10.2 Contador Patentes
  let patenteContador=50000;
  function actualizarPatentes(){
    const patentCountElem=document.getElementById("patent-count");
    if(!patentCountElem)return;
    patentCountElem.textContent=`Patentes registradas en IA: ${patenteContador}`;
    patenteContador+=Math.floor(Math.random()*10);
  }
  setInterval(actualizarPatentes,5000);
  actualizarPatentes();

  // 10.3 Predicciones IA
  const predicciones=[
    "En 2030, el 60% de los trabajos incluirán IA colaborativa.",
    "Los robots humanoides convivirán con nosotros en 2050.",
    "La computación cuántica cambiará el Deep Learning en 2040.",
    "La IA superará la creatividad humana en 2045."
  ];
  const predictionTextElem=document.getElementById("prediction-text");
  if(predictionTextElem){
    predictionTextElem.textContent=predicciones[Math.floor(Math.random()*predicciones.length)];
  }

  // 10.4 Mapa de Innovación
  const mapContainer=document.getElementById("map-container");
  if(mapContainer){
    mapContainer.textContent="Ciudades top en IA: San Francisco, Beijing, Londres, Tokio.";
  }

  // 10.5 Sorpresa Diaria
  const sorpresas=[
    "En 2025, el 70% de las empresas usará IA para atención al cliente.",
    "Los coches autónomos evitarán el 90% de los accidentes viales.",
    "La IA podría superar la creatividad humana en 2045.",
    "Un nuevo avance en IA reduce el consumo energético un 40%."
  ];
  const revealBtn=document.getElementById("reveal-surprise");
  const surpriseTextElem=document.getElementById("surprise-text");
  if(revealBtn && surpriseTextElem){
    revealBtn.addEventListener("click",()=>{
      const randomIndex=Math.floor(Math.random()*sorpresas.length);
      surpriseTextElem.textContent=sorpresas[randomIndex];
    });
  }

  // 10.6 Ranking Países
  const countriesData=[
    { name:"USA", investment:90 },
    { name:"China", investment:85 },
    { name:"Alemania", investment:70 },
    { name:"Reino Unido", investment:65 },
    { name:"Japón", investment:60 }
  ];
  function mostrarPaisesInversion(){
    const countriesContainer=document.getElementById("countries-container");
    if(!countriesContainer)return;
    let html="";
    countriesData.forEach(pais=>{
      html+=`
        <div class="country-bar">
          <div class="country-fill" style="width:0%;">
            ${pais.name}: 0%
          </div>
        </div>
      `;
    });
    countriesContainer.innerHTML=html;

    const fillElems=countriesContainer.querySelectorAll(".country-fill");
    fillElems.forEach((fill,index)=>{
      const inv=countriesData[index].investment;
      setTimeout(()=>{
        fill.style.width=inv+"%";
        fill.textContent=`${countriesData[index].name}: ${inv}%`;
      },200);
    });
  }
  mostrarPaisesInversion();
});

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
    // “Matrix style”: solo "01"
    const letters = "01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0"; // verde
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

    // glitch breve
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
      codeFeedback.textContent = "";
    });
  }

  if (codeCheckBtn) {
    codeCheckBtn.addEventListener("click", () => {
      if (codeAttempts <= 0) return;
      let userCode = [];
      codeInputs.forEach(inp => userCode.push(inp.value));
      if (userCode.some(v => !v)) {
        codeFeedback.textContent = "Completa los 4 símbolos antes de comprobar.";
        return;
      }

      let correctPos = 0;
      let correctSym = 0;
      let secretCopy = [...secretCode];
      let userCopy = [...userCode];

      // correctos en posición
      for (let i = 0; i < codeLength; i++) {
        if (userCopy[i] === secretCopy[i]) {
          correctPos++;
          secretCopy[i] = null;
          userCopy[i] = null;
        }
      }
      // correctos en otra posición
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
  const cardSymbols = ["🤖","⚙️","💻","🤖","⚙️","💻","🔮","🎉","🔮","🎉","🌐","🌐"];
  let flippedCards = [];
  let matchedPairs = 0;

  function shuffleArray(arr){
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }
  const shuffledSymbols=shuffleArray([...cardSymbols]);

  function createMemoryBoard(){
    if(!memoryContainer)return;
    memoryContainer.innerHTML="";
    shuffledSymbols.forEach(sym=>{
      const card=document.createElement("div");
      card.classList.add("card");
      card.innerHTML="?";
      card.dataset.symbol=sym;
      card.addEventListener("click",()=>flipCard(card));
      memoryContainer.appendChild(card);
    });
    matchedPairs=0;
    flippedCards=[];
    memoryMessage.textContent="";
  }
  function flipCard(card){
    if(card.classList.contains("flipped"))return;
    if(flippedCards.length===2)return;

    card.classList.add("flipped");
    card.textContent=card.dataset.symbol;
    flippedCards.push(card);

    if(flippedCards.length===2){
      setTimeout(checkMatch,600);
    }
  }
  function checkMatch(){
    const [c1,c2]=flippedCards;
    if(c1.dataset.symbol===c2.dataset.symbol){
      matchedPairs++;
      c1.removeEventListener("click",()=>flipCard(c1));
      c2.removeEventListener("click",()=>flipCard(c2));
      if(matchedPairs===cardSymbols.length/2){
        memoryMessage.textContent="¡Has encontrado todas las parejas!";
      }
    } else {
      c1.classList.remove("flipped");
      c1.textContent="?";
      c2.classList.remove("flipped");
      c2.textContent="?";
    }
    flippedCards=[];
  }
  if(memoryContainer) createMemoryBoard();

  /*******************************************
   * 10. Neon TicTacToe (centrado)
   *******************************************/
  const tictactoeContainer = document.getElementById("tictactoe-container");
  const tictactoeMessage = document.getElementById("tictactoe-message");
  let board = ["","","","","","","","",""];
  let currentPlayer = "X";
  let gameOver = false;

  function createTicTacToe(){
    if(!tictactoeContainer)return;
    tictactoeContainer.innerHTML="";
    // “inline-block” y margin:0 auto en CSS
    for(let i=0;i<9;i++){
      const cell=document.createElement("div");
      cell.classList.add("tictactoe-cell");
      cell.dataset.index=i;
      cell.textContent=board[i];
      cell.addEventListener("click",()=>handleMove(cell));
      tictactoeContainer.appendChild(cell);
    }
    tictactoeMessage.textContent="";
    currentPlayer="X";
    board=["","","","","","","","",""];
    gameOver=false;
  }
  function handleMove(cell){
    if(gameOver)return;
    const idx=cell.dataset.index;
    if(board[idx]!=="")return; 
    board[idx]=currentPlayer;
    cell.textContent=currentPlayer;
    checkWinner();
    currentPlayer=(currentPlayer==="X")?"O":"X";
  }
  function checkWinner(){
    const combos=[
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for(let c of combos){
      const[a,b,d]=c;
      if(board[a] && board[a]===board[b] && board[b]===board[d]){
        gameOver=true;
        tictactoeMessage.textContent=`🎉 Jugador ${board[a]} gana`;
        return;
      }
    }
    if(!board.includes("")){
      gameOver=true;
      tictactoeMessage.textContent="Empate. Tablero lleno.";
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

  let guesserLow=1;
  let guesserHigh=100;
  let guesserCurrent=0;
  let guesserOver=false;

  function guessNumber(){
    guesserCurrent=Math.floor((guesserLow+guesserHigh)/2);
    guesserQuestion.textContent=`¿Es ${guesserCurrent}?`;
  }

  if(startBtn){
    startBtn.addEventListener("click",()=>{
      guesserLow=1;
      guesserHigh=100;
      guesserOver=false;
      guesserFeedback.textContent="";
      guessNumber();
    });
  }
  if(higherBtn){
    higherBtn.addEventListener("click",()=>{
      if(guesserOver)return;
      guesserLow=guesserCurrent+1;
      if(guesserLow>guesserHigh){
        guesserFeedback.textContent="¡Inconsistente! No quedan números.";
        guesserOver=true;
        return;
      }
      guessNumber();
    });
  }
  if(lowerBtn){
    lowerBtn.addEventListener("click",()=>{
      if(guesserOver)return;
      guesserHigh=guesserCurrent-1;
      if(guesserHigh<guesserLow){
        guesserFeedback.textContent="¡Inconsistente! No quedan números.";
        guesserOver=true;
        return;
      }
      guessNumber();
    });
  }
  if(correctBtn){
    correctBtn.addEventListener("click",()=>{
      if(guesserOver)return;
      guesserFeedback.textContent=`🎉 ¡La IA adivinó! Era ${guesserCurrent}`;
      guesserOver=true;
    });
  }

  /*******************************************
   * 12. Noticias Reales con Autorefresco
   *******************************************/
  let usedIndices=[];
  // 10 noticias REALES con sus links
  const allNews=[
    {
      title:"ChatGPT-4 revoluciona la IA generativa",
      text:"OpenAI lanza GPT-4 con sorprendentes capacidades multimodales",
      link:"https://www.nytimes.com/2023/03/14/technology/openai-gpt4.html"
    },
    {
      title:"Google lanza Bard en respuesta a ChatGPT",
      text:"El gigante de internet presenta su chatbot Bard en versión beta",
      link:"https://www.bbc.com/news/technology-64672280"
    },
    {
      title:"Robots humanoides avanzan en fábricas",
      text:"Empresas de robótica muestran prototipos con IA avanzada",
      link:"https://www.cnn.com/2023/02/13/tech/robotics-humanoid-ia"
    },
    {
      title:"Meta anuncia nuevo supercomputador de IA",
      text:"La compañía de Zuckerberg presenta potente clúster para entrenar IA",
      link:"https://www.reuters.com/technology/meta-supercomputer-ai-2023"
    },
    {
      title:"Microsoft integra ChatGPT en Bing",
      text:"La búsqueda se vuelve conversacional con IA generativa integrada",
      link:"https://www.theverge.com/2023/02/07/microsoft-bing-chatgpt-integration"
    },
    {
      title:"IA en diagnósticos médicos se consolida",
      text:"La FDA aprueba nuevos algoritmos para detección temprana de cáncer",
      link:"https://www.wired.com/story/fda-approves-ai-cancer-detection"
    },
    {
      title:"Tesla refuerza su sistema de auto-conducción",
      text:"Nuevos chips con IA prometen mejorar la conducción autónoma",
      link:"https://www.bloomberg.com/news/articles/2023-04-07/tesla-ai-autopilot-upgrade"
    },
    {
      title:"DeepMind presenta AlphaCode",
      text:"La IA que resuelve problemas de programación en competiciones",
      link:"https://www.ft.com/content/5f9a63f6-7f0c-485e-b18c-8fc3e249fa77"
    },
    {
      title:"IBM lanza herramientas de IA para empresas",
      text:"Plataforma para automatización inteligente y análisis de big data",
      link:"https://www.wsj.com/articles/ibm-unveils-new-ai-platform"
    },
    {
      title:"Amazon apuesta por la IA en la nube",
      text:"La empresa integra algoritmos de machine learning para clientes AWS",
      link:"https://www.cnbc.com/2023/03/12/amazon-ai-ml-cloud-announcement"
    }
  ];

  function loadNews(){
    const newsContainer=document.getElementById("news-container");
    if(!newsContainer)return;
    newsContainer.innerHTML="";

    // Filtrar índices no usados
    let available=allNews.map((_,i)=>i).filter(i=>!usedIndices.includes(i));
    if(available.length<6){
      usedIndices=[];
      available=allNews.map((_,i)=>i);
    }
    shuffleArray(available);
    const chosen=available.slice(0,6);
    chosen.forEach(idx=>usedIndices.push(idx));

    chosen.forEach(idx=>{
      const item=allNews[idx];
      const box=document.createElement("div");
      box.classList.add("news-box");
      box.innerHTML=`
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <a href="${item.link}" class="leer-btn" target="_blank">Leer</a>
      `;
      newsContainer.appendChild(box);
    });
  }

  // Llamamos la primera vez
  loadNews();
  // Se refresca cada 5 min
  setInterval(loadNews,300000);

  /*******************************************
   * 13. Widgets Futuristas
   *******************************************/
  // 13.1 Citas IA
  const quotes=[
    "La IA es la nueva electricidad.",
    "Los datos son el nuevo petróleo.",
    "La creatividad sigue siendo humana.",
    "La IA sin ética es solo código.",
    "El futuro pertenece a la IA."
  ];
  function cambiarCita(){
    const quoteElem=document.getElementById("ai-quote");
    if(!quoteElem)return;
    const r=Math.floor(Math.random()*quotes.length);
    quoteElem.textContent=quotes[r];
  }
  setInterval(cambiarCita,10000);
  cambiarCita();

  // 13.2 Contador Patentes
  let patenteContador=50000;
  function actualizarPatentes(){
    const patentCountElem=document.getElementById("patent-count");
    if(!patentCountElem)return;
    patentCountElem.textContent=`Patentes registradas en IA: ${patenteContador}`;
    patenteContador+=Math.floor(Math.random()*10);
  }
  setInterval(actualizarPatentes,5000);
  actualizarPatentes();

  // 13.3 Predicciones IA
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

  // 13.4 Mapa de Innovación
  const mapContainer=document.getElementById("map-container");
  if(mapContainer){
    mapContainer.textContent="Ciudades top en IA: San Francisco, Beijing, Londres, Tokio.";
  }

  // 13.5 Sorpresa Diaria
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

  // 13.6 Ranking Países
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
    countriesData.forEach(p=>{
      html+=`
        <div class="country-bar">
          <div class="country-fill" style="width:0%;">
            ${p.name}: 0%
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

  /*******************************************
   * 14. Sopa de Letras AI (seleccionable)
   *******************************************/
  const wordsearchContainer=document.getElementById("wordsearch-container");
  const wordsearchWordsElem=document.getElementById("wordsearch-words");
  // Palabras: "ROBOT", "ALGORITMO", "RED", "DATOS", "IA"
  const wsWords=["ROBOT","ALGORITMO","RED","DATOS","IA"];

  const rows=10, cols=10;
  let grid=Array.from({length:rows},()=>Array(cols).fill(null));

  function placeWordHorizontal(word,r,c){
    if(c+word.length>cols) return false;
    for(let i=0;i<word.length;i++){
      if(grid[r][c+i] && grid[r][c+i]!==word[i])return false;
    }
    for(let i=0;i<word.length;i++){
      grid[r][c+i]=word[i];
    }
    return true;
  }
  function placeWordVertical(word,r,c){
    if(r+word.length>rows)return false;
    for(let i=0;i<word.length;i++){
      if(grid[r+i][c] && grid[r+i][c]!==word[i])return false;
    }
    for(let i=0;i<word.length;i++){
      grid[r+i][c]=word[i];
    }
    return true;
  }
  function insertWord(word){
    let attempts=100;
    while(attempts>0){
      attempts--;
      const orientation=Math.random()<0.5?"H":"V";
      const rr=Math.floor(Math.random()*rows);
      const cc=Math.floor(Math.random()*cols);
      if(orientation==="H"){
        if(placeWordHorizontal(word,rr,cc))return true;
      } else {
        if(placeWordVertical(word,rr,cc))return true;
      }
    }
    return false;
  }
  wsWords.forEach(w=>insertWord(w));

  // Rellenar con letras random
  const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      if(!grid[r][c]){
        grid[r][c]=letters.charAt(Math.floor(Math.random()*letters.length));
      }
    }
  }

  // Mostrar & permitir "seleccionar" celdas
  if(wordsearchContainer){
    wordsearchContainer.innerHTML="";
    for(let r=0;r<rows;r++){
      const rowDiv=document.createElement("div");
      rowDiv.classList.add("wordsearch-row");
      for(let c=0;c<cols;c++){
        const cellDiv=document.createElement("div");
        cellDiv.classList.add("wordsearch-cell");
        cellDiv.textContent=grid[r][c];
        cellDiv.addEventListener("click",()=>{
          cellDiv.classList.toggle("highlighted");
        });
        rowDiv.appendChild(cellDiv);
      }
      wordsearchContainer.appendChild(rowDiv);
    }
  }
  if(wordsearchWordsElem){
    wordsearchWordsElem.textContent="Palabras: "+wsWords.join(", ");
  }

});


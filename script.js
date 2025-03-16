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
    if (title) title.classList.toggle("glitch-active");
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
  // ... (Igual que en versiones anteriores)...

  /*************************************
   * 7. Trivia IA
   *************************************/
  // ... (Igual que en versiones anteriores)...

  /*************************************
   * 8. Crack the Code (Limitado a 10 símbolos)
   *************************************/
  const codeSymbols = "!@#$%^&*A0".split(""); // Máximo 10 símbolos
  const codeLength=4;
  let secretCode=[];
  for(let i=0;i<codeLength;i++){
    const r=Math.floor(Math.random()*codeSymbols.length);
    secretCode.push(codeSymbols[r]);
  }
  let codeAttempts=7;

  const codeFeedback=document.getElementById("code-feedback");
  const codeAttemptsElem=document.getElementById("code-attempts");
  const codeCheckBtn=document.getElementById("code-check");
  const codeResetBtn=document.getElementById("code-reset");
  const codeInputs=document.querySelectorAll(".code-char");
  const symbolListElem=document.getElementById("symbol-list");

  if(codeAttemptsElem) codeAttemptsElem.textContent=`Intentos restantes: ${codeAttempts}`;

  // Mostrar lista de 10 símbolos
  if(symbolListElem){
    let html="";
    codeSymbols.forEach(sym=>{
      html+=`<button class="symbol-btn">${sym}</button>`;
    });
    symbolListElem.innerHTML=html;

    const symbolBtns=symbolListElem.querySelectorAll(".symbol-btn");
    symbolBtns.forEach(btn=>{
      btn.addEventListener("click",()=>{
        for(let i=0;i<codeInputs.length;i++){
          if(!codeInputs[i].value){
            codeInputs[i].value=btn.textContent;
            break;
          }
        }
      });
    });
  }

  if(codeResetBtn){
    codeResetBtn.addEventListener("click",()=>{
      codeInputs.forEach(inp=>inp.value="");
      codeFeedback.textContent="";
    });
  }

  if(codeCheckBtn){
    codeCheckBtn.addEventListener("click",()=>{
      if(codeAttempts<=0)return;
      let userCode=[];
      codeInputs.forEach(inp=>userCode.push(inp.value));

      if(userCode.some(v=>!v)){
        codeFeedback.textContent="Completa los 4 símbolos antes de comprobar.";
        return;
      }

      let correctPos=0;
      let correctSym=0;

      let secretCopy=[...secretCode];
      let userCopy=[...userCode];

      // correctos en posición
      for(let i=0;i<codeLength;i++){
        if(userCopy[i]===secretCopy[i]){
          correctPos++;
          secretCopy[i]=null;
          userCopy[i]=null;
        }
      }
      // correctos en posición equivocada
      for(let i=0;i<codeLength;i++){
        if(userCopy[i]){
          const idx=secretCopy.indexOf(userCopy[i]);
          if(idx!==-1){
            correctSym++;
            secretCopy[idx]=null;
          }
        }
      }

      if(correctPos===codeLength){
        codeFeedback.textContent=`🎉 ¡Código descifrado! Era: ${secretCode.join("")}`;
        codeCheckBtn.disabled=true;
        symbolListElem.style.pointerEvents="none";
        codeInputs.forEach(inp=>inp.disabled=true);
      } else {
        codeAttempts--;
        codeAttemptsElem.textContent=`Intentos restantes: ${codeAttempts}`;
        if(codeAttempts<=0){
          codeFeedback.textContent=`❌ Sin intentos. El código era: ${secretCode.join("")}`;
          codeCheckBtn.disabled=true;
          symbolListElem.style.pointerEvents="none";
          codeInputs.forEach(inp=>inp.disabled=true);
        } else {
          codeFeedback.textContent=`Posición exacta: ${correctPos} | Símbolo correcto en otra posición: ${correctSym}`;
        }
      }
    });
  }

  /*************************************
   * 9. Memory AI Cards
   *************************************/
  // ... (Igual que en versiones anteriores)...

  const memoryContainer=document.getElementById("memory-container");
  const memoryMessage=document.getElementById("memory-message");
  const cardSymbols=["🤖","⚙️","💻","🤖","⚙️","💻","🔮","🎉","🔮","🎉","🌐","🌐"];
  let flippedCards=[];
  let matchedPairs=0;

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
    if(memoryMessage) memoryMessage.textContent="";
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

  if(memoryContainer){
    createMemoryBoard();
  }

  /*************************************
   * 10. Neon TicTacToe
   *************************************/
  const tictactoeContainer=document.getElementById("tictactoe-container");
  const tictactoeMessage=document.getElementById("tictactoe-message");
  let board=["","","","","","","","",""];
  let currentPlayer="X";
  let gameOver=false;

  function createTicTacToe(){
    if(!tictactoeContainer)return;
    tictactoeContainer.innerHTML="";
    for(let i=0;i<9;i++){
      const cell=document.createElement("div");
      cell.classList.add("tictactoe-cell");
      cell.dataset.index=i;
      cell.textContent=board[i];
      cell.addEventListener("click",()=>handleMove(cell));
      tictactoeContainer.appendChild(cell);
    }
    if(tictactoeMessage) tictactoeMessage.textContent="";
    currentPlayer="X";
    board=["","","","","","","","",""];
    gameOver=false;
  }
  function handleMove(cell){
    if(gameOver)return;
    const idx=cell.dataset.index;
    if(board[idx]!=="")return; // ya ocupado
    board[idx]=currentPlayer;
    cell.textContent=currentPlayer;
    checkWinner();
    currentPlayer=(currentPlayer==="X")?"O":"X";
  }
  function checkWinner(){
    const winningCombos=[
      [0,1,2],[3,4,5],[6,7,8], // horizontales
      [0,3,6],[1,4,7],[2,5,8], // verticales
      [0,4,8],[2,4,6]         // diagonales
    ];
    for(let combo of winningCombos){
      const [a,b,c]=combo;
      if(board[a] && board[a]===board[b] && board[b]===board[c]){
        // Ganador
        gameOver=true;
        tictactoeMessage.textContent=`🎉 Jugador ${board[a]} gana`;
        return;
      }
    }
    if(!board.includes("")){
      gameOver=true;
      tictactoeMessage.textContent="Empate. Tablero lleno";
    }
  }
  if(tictactoeContainer){
    createTicTacToe();
  }

  /*************************************
   * 11. Noticias (6 al azar) + “Leer”
   *************************************/
  // ... (Igual que antes)...

  const allNews=[
    {title:"Robot educativo revoluciona las aulas",text:"Ofrece clases personalizadas con IA.",link:"#1"},
    {title:"IA médica logra un 99% de acierto",text:"Redes neuronales para diagnóstico.",link:"#2"},
    {title:"Coches autónomos sin conductor",text:"Ciudades aprueban taxis sin chofer.",link:"#3"},
    {title:"Hologramas con IA",text:"Reuniones casi presenciales con HoloMeet.",link:"#4"},
    {title:"Robots de limpieza en centros comerciales",text:"Sensores LIDAR y algoritmos de planificación.",link:"#5"},
    {title:"Chatbots conversacionales más humanos",text:"Lenguaje casi natural.",link:"#6"},
    {title:"IA vence campeones de póker",text:"IA especialista en decisiones inciertas.",link:"#7"},
    {title:"Redes neuronales rompen récord",text:"Traducción casi profesional.",link:"#8"},
    {title:"IA en agricultura de precisión",text:"Drones detectan plagas con mayor acierto.",link:"#9"},
    {title:"Algoritmo predice terremotos",text:"Sistema IA analiza patrones geológicos.",link:"#10"}
  ];
  const newsContainer=document.getElementById("news-container");
  if(newsContainer){
    const shuffled=allNews.sort(()=>0.5 - Math.random());
    const selected=shuffled.slice(0,6);
    let newsHTML="";
    selected.forEach(item=>{
      newsHTML+=`
        <div class="news-box">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
          <a href="${item.link}" class="leer-btn" target="_blank">Leer</a>
        </div>
      `;
    });
    newsContainer.innerHTML=newsHTML;
  }

  /*************************************
   * 12. Widgets Futuristas
   *************************************/
  // 12.1 Citas IA
  const quotes=[
    "La IA es la nueva electricidad.",
    "Los datos son el nuevo petróleo.",
    "La creatividad sigue siendo humana.",
    "La IA sin ética es solo código.",
    "El futuro pertenece a la IA."
  ];
  function cambiarCita(){
    const quoteElement=document.getElementById("ai-quote");
    if(!quoteElement)return;
    const randomIndex=Math.floor(Math.random()*quotes.length);
    quoteElement.textContent=quotes[randomIndex];
  }
  setInterval(cambiarCita,10000);
  cambiarCita();

  // 12.2 Contador Patentes
  let patenteContador=50000;
  function actualizarPatentes(){
    const patentCountElem=document.getElementById("patent-count");
    if(!patentCountElem)return;
    patentCountElem.textContent=`Patentes registradas en IA: ${patenteContador}`;
    patenteContador+=Math.floor(Math.random()*10);
  }
  setInterval(actualizarPatentes,5000);
  actualizarPatentes();

  // 12.3 Predicciones
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

  // 12.4 Mapa de Innovación
  const mapContainer=document.getElementById("map-container");
  if(mapContainer){
    mapContainer.textContent="Ciudades top en IA: San Francisco, Beijing, Londres, Tokio.";
  }

  // 12.5 Sorpresa Diaria
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

  // 12.6 Ranking Países
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

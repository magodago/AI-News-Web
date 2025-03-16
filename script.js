document.addEventListener("DOMContentLoaded", () => {
  /*************************************
   * 1. Fuente Orbitron
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
  // ... (igual que antes)
  // ... no repetimos la explicación, simplemente pegamos la lógica.

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

  if(hintElem) hintElem.textContent = "Pista: " + hint;
  if(wordDisplay) wordDisplay.textContent = wordArray.join(" ");
  if(attemptsElem) attemptsElem.textContent = `Intentos restantes: ${attempts}`;

  if(checkBtn){
    checkBtn.addEventListener("click",()=>{
      const letter=letterInput.value.toLowerCase();
      letterInput.value="";
      if(!letter||letter.length!==1)return;

      let found=false;
      for(let i=0;i<selectedWord.length;i++){
        if(selectedWord[i]===letter){
          wordArray[i]=letter;
          found=true;
        }
      }
      if(!found) attempts--;
      wordDisplay.textContent=wordArray.join(" ");
      attemptsElem.textContent=`Intentos restantes: ${attempts}`;

      if(!wordArray.includes("_")){
        messageElem.textContent=`🎉 ¡Correcto! La palabra es: ${selectedWord}`;
        checkBtn.disabled=true;
        letterInput.disabled=true;
      } else if(attempts<=0){
        messageElem.textContent=`❌ Sin intentos. La palabra era: ${selectedWord}`;
        checkBtn.disabled=true;
        letterInput.disabled=true;
      }
    });
  }

  /*************************************
   * 7. Trivia IA
   *************************************/
  // ... (igual a antes)
  const triviaQuestions = [
    {
      question:"¿Qué es un algoritmo?",
      answers:["Un tipo de robot","Un conjunto de reglas para resolver problemas","Un lenguaje de programación"],
      correct:1
    },
    {
      question:"¿Cuál de estas ciudades es puntera en IA?",
      answers:["San Francisco","El Cairo","Lisboa"],
      correct:0
    },
    {
      question:"¿Qué es 'Machine Learning'?",
      answers:["Aprendizaje automático","Un sistema de chat","Base de datos de imágenes"],
      correct:0
    },
    {
      question:"¿Qué hace la 'Visión por Computador'?",
      answers:["Crea imágenes 3D","Permite a la máquina 'ver' e interpretar imágenes","Diseña páginas web"],
      correct:1
    },
    {
      question:"La ética en la IA es importante para...",
      answers:["Evitar sesgos y daños sociales","Hacer juegos divertidos","Acelerar la computación cuántica"],
      correct:0
    }
  ];
  let triviaIndex=0;
  let triviaScore=0;

  const triviaQuestionElem=document.getElementById("trivia-question");
  const triviaAnswersElem=document.getElementById("trivia-answers");
  const triviaResultElem=document.getElementById("trivia-result");
  const triviaNextBtn=document.getElementById("trivia-next");

  function mostrarPreguntaTrivia(){
    if(triviaIndex>=triviaQuestions.length)return;
    const q=triviaQuestions[triviaIndex];
    triviaQuestionElem.textContent=q.question;
    triviaAnswersElem.innerHTML="";
    q.answers.forEach((ans,i)=>{
      const div=document.createElement("div");
      div.classList.add("trivia-option");
      div.textContent=ans;
      div.addEventListener("click",()=>{
        if(i===q.correct){
          triviaScore++;
          triviaResultElem.textContent="¡Correcto!";
        } else {
          triviaResultElem.textContent="Respuesta incorrecta.";
        }
        Array.from(triviaAnswersElem.children).forEach(opt=>{
          opt.style.pointerEvents="none";
        });
      });
      triviaAnswersElem.appendChild(div);
    });
    triviaResultElem.textContent="";
  }

  if(triviaNextBtn){
    triviaNextBtn.addEventListener("click",()=>{
      triviaIndex++;
      if(triviaIndex<triviaQuestions.length){
        mostrarPreguntaTrivia();
      } else {
        triviaQuestionElem.textContent="¡Has completado la trivia!";
        triviaAnswersElem.innerHTML=`Puntuación: ${triviaScore}/${triviaQuestions.length}`;
        triviaResultElem.textContent="";
        triviaNextBtn.disabled=true;
      }
    });
    mostrarPreguntaTrivia();
  }

  /*************************************
   * 8. Nuevo Juego: CRACK THE CODE (Mejorado con símbolos)
   *************************************/
  const codeSymbols = "!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-".split("");
  const codeLength=4;
  let secretCode=[];
  // Generar código secreto
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

  // 8.1 Mostrar lista de símbolos para pinchar
  if(symbolListElem){
    let symbolsHTML="";
    codeSymbols.forEach(sym=>{
      symbolsHTML+=`<button class="symbol-btn">${sym}</button>`;
    });
    symbolListElem.innerHTML=symbolsHTML;

    // Al hacer click en un símbolo, se pone en el primer hueco vacío
    const symbolBtns=symbolListElem.querySelectorAll(".symbol-btn");
    symbolBtns.forEach(btn=>{
      btn.addEventListener("click",()=>{
        // buscar primer codeInput vacío
        for(let i=0;i<codeInputs.length;i++){
          if(!codeInputs[i].value){
            codeInputs[i].value=btn.textContent;
            break;
          }
        }
      });
    });
  }

  // 8.2 Botón “Limpiar” (code-reset)
  if(codeResetBtn){
    codeResetBtn.addEventListener("click",()=>{
      codeInputs.forEach(inp=>inp.value="");
      codeFeedback.textContent="";
    });
  }

  // 8.3 Botón “Comprobar” (code-check)
  if(codeCheckBtn){
    codeCheckBtn.addEventListener("click",()=>{
      if(codeAttempts<=0)return;
      let userCode=[];
      codeInputs.forEach(inp=>{
        userCode.push(inp.value.toUpperCase());
      });

      // Verificar que estén rellenos
      if(userCode.some(v=>!v)){
        codeFeedback.textContent="Completa los 4 símbolos antes de comprobar.";
        return;
      }

      let correctPos=0;
      let correctSym=0;

      let secretCopy=[...secretCode];
      let userCopy=[...userCode];

      // Primero correctos en posición
      for(let i=0;i<codeLength;i++){
        if(userCopy[i]===secretCopy[i]){
          correctPos++;
          secretCopy[i]=null;
          userCopy[i]=null;
        }
      }
      // Luego correctos en posición equivocada
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
          codeFeedback.textContent=`❌ Te quedaste sin intentos. El código era: ${secretCode.join("")}`;
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
   * 9. Nuevo Juego: MEMORY AI CARDS
   *************************************/
  const memoryContainer=document.getElementById("memory-container");
  const memoryMessage=document.getElementById("memory-message");
  // 6 parejas (12 cartas totales)
  const cardSymbols=["🤖","⚙️","💻","🤖","⚙️","💻","🔮","🎉","🔮","🎉","🌐","🌐"]; 
  let flippedCards=[];
  let matchedPairs=0;

  function shuffleArray(arr){
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(Math.random()* (i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }
  const shuffledSymbols=shuffleArray([...cardSymbols]);

  function createMemoryBoard(){
    if(!memoryContainer)return;
    memoryContainer.innerHTML="";
    shuffledSymbols.forEach((sym,i)=>{
      const card=document.createElement("div");
      card.classList.add("card");
      card.dataset.symbol=sym;
      card.dataset.index=i;
      card.innerHTML="?";
      card.addEventListener("click",()=>{
        flipCard(card);
      });
      memoryContainer.appendChild(card);
    });
    matchedPairs=0;
    flippedCards=[];
    if(memoryMessage) memoryMessage.textContent="";
  }

  function flipCard(card){
    if(card.classList.contains("flipped"))return; // ya está girada
    if(flippedCards.length===2)return; // ya hay 2 giradas, esperar

    card.classList.add("flipped");
    card.textContent=card.dataset.symbol;
    flippedCards.push(card);

    if(flippedCards.length===2){
      setTimeout(checkMatch,600);
    }
  }

  function checkMatch(){
    const [card1, card2]=flippedCards;
    if(card1.dataset.symbol===card2.dataset.symbol){
      // acierto
      matchedPairs++;
      card1.removeEventListener("click",()=>flipCard(card1));
      card2.removeEventListener("click",()=>flipCard(card2));
      if(matchedPairs===cardSymbols.length/2){
        if(memoryMessage) memoryMessage.textContent="¡Has encontrado todas las parejas!";
      }
    } else {
      // no coinciden
      card1.classList.remove("flipped");
      card1.textContent="?";
      card2.classList.remove("flipped");
      card2.textContent="?";
    }
    flippedCards=[];
  }

  if(memoryContainer){
    createMemoryBoard();
  }

  /*************************************
   * 10. Noticias Dinámicas (6 al azar) + Botón “Leer”
   *************************************/
  const allNews=[
    { title:"Robot educativo revoluciona las aulas", text:"Ofrece clases personalizadas con IA.", link:"#1" },
    { title:"IA médica logra un 99% de acierto", text:"Herramienta de aprendizaje profundo reduce errores.", link:"#2" },
    { title:"Coches autónomos avanzan sin conductor", text:"Ciudades aprueban taxis sin chofer.", link:"#3" },
    { title:"Hologramas con IA", text:"Reuniones casi presenciales con HoloMeet.", link:"#4" },
    { title:"Robots de limpieza en centros comerciales", text:"Sensores LIDAR y algoritmos de planificación.", link:"#5" },
    { title:"Chatbots conversacionales más humanos", text:"Modelos de lenguaje que conversan naturalmente.", link:"#6" },
    { title:"IA vence campeones de póker", text:"Especialista en decisiones inciertas.", link:"#7" },
    { title:"Redes neuronales rompen récord de traducción", text:"Calidad casi profesional en varios idiomas.", link:"#8" },
    { title:"IA en agricultura de precisión", text:"Drones detectan plagas con mayor acierto.", link:"#9" },
    { title:"Algoritmo predice terremotos", text:"Sistema IA analiza patrones geológicos.", link:"#10" }
  ];
  const newsContainer=document.getElementById("news-container");
  if(newsContainer){
    const shuffled=allNews.sort(()=>0.5-Math.random());
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
   * 11. Widgets Futuristas (Citas, Patentes, etc.)
   *************************************/
  // 11.1 Citas IA
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

  // 11.2 Contador Patentes
  let patenteContador=50000;
  function actualizarPatentes(){
    const patentCountElem=document.getElementById("patent-count");
    if(!patentCountElem)return;
    patentCountElem.textContent=`Patentes registradas en IA: ${patenteContador}`;
    patenteContador+=Math.floor(Math.random()*10);
  }
  setInterval(actualizarPatentes,5000);
  actualizarPatentes();

  // 11.3 Predicciones
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

  // 11.4 Mapa de Innovación
  const mapContainer=document.getElementById("map-container");
  if(mapContainer){
    mapContainer.textContent="Ciudades top en IA: San Francisco, Beijing, Londres, Tokio.";
  }

  // 11.5 Sorpresa Diaria
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

  // 11.6 Ranking Países
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

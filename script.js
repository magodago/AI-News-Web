document.addEventListener("DOMContentLoaded", () => {
  /*************************************
   * 1. Cargar fuente Orbitron
   *************************************/
  const linkOrbitron = document.createElement("link");
  linkOrbitron.rel = "stylesheet";
  linkOrbitron.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
  document.head.appendChild(linkOrbitron);

  /*************************************
   * 2. Título glitch
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
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = "#0ff";
      ctx.font = fontSize + "px Orbitron";

      for (let i=0; i<drops.length; i++){
        const text = letters.charAt(Math.floor(Math.random()*letters.length));
        const x = i*fontSize;
        const y = drops[i]*fontSize;
        ctx.fillText(text, x, y);
        if(y>canvas.height && Math.random()>0.975){
          drops[i]=0;
        }
        drops[i]++;
      }
    }
    setInterval(drawMatrix,50);

    window.addEventListener("resize",()=>{
      canvas.width=bar.offsetWidth;
      canvas.height=bar.offsetHeight;
    });
  }
  iniciarEfectoMatrix();

  /*************************************
   * 4. Cursor Futurista
   *************************************/
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);
  document.addEventListener("mousemove",(e)=>{
    cursor.style.transform=`translate3d(${e.pageX}px, ${e.pageY}px, 0)`;
  });

  /*************************************
   * 5. "Follow the white rabbit..."
   *************************************/
  const typingTextElem = document.getElementById("typing-text");
  const phrase = "Follow the white rabbit...";
  let idx = 0;
  let intervalTyping = null;
  function typePhrase(){
    if(!typingTextElem)return;
    typingTextElem.textContent = phrase.substring(0,idx);
    idx++;
    if(Math.random()>0.9){
      typingTextElem.classList.add("typing-glitch");
      setTimeout(()=> typingTextElem.classList.remove("typing-glitch"),100);
    }
    if(idx>phrase.length){
      clearInterval(intervalTyping);
      setTimeout(()=>{
        idx=0;
        typingTextElem.textContent="";
        intervalTyping=setInterval(typePhrase,100);
      },1500);
    }
  }
  intervalTyping=setInterval(typePhrase,100);

  /*************************************
   * 6. Desafío de la Palabra
   *************************************/
  const words=[
    { word:"robot", hint:"Máquina programada para tareas humanas." },
    { word:"red", hint:"Conjunto de nodos interconectados." },
    { word:"algoritmo", hint:"Reglas para resolver problemas." },
    { word:"datos", hint:"El combustible de la IA." }
  ];
  const randomIndex=Math.floor(Math.random()*words.length);
  const selectedWord=words[randomIndex].word;
  const hint=words[randomIndex].hint;

  const wordDisplay=document.getElementById("word-display");
  const hintElem=document.getElementById("hint");
  const messageElem=document.getElementById("message");
  const attemptsElem=document.getElementById("attempts-remaining");
  const letterInput=document.getElementById("letter-input");
  const checkBtn=document.getElementById("check-letter");

  let wordArray=Array.from(selectedWord).map(()=>"_");
  let attempts=selectedWord.length+3;

  if(hintElem) hintElem.textContent=`Pista: ${hint}`;
  if(wordDisplay) wordDisplay.textContent=wordArray.join(" ");
  if(attemptsElem) attemptsElem.textContent=`Intentos restantes: ${attempts}`;

  if(checkBtn){
    checkBtn.addEventListener("click",()=>{
      if(!letterInput)return;
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
  const triviaQuestions=[
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
    const q=triviaQuestions[triviaIndex];
    if(!q)return;
    triviaQuestionElem.textContent=q.question;
    if(triviaAnswersElem) triviaAnswersElem.innerHTML="";
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
    if(triviaResultElem) triviaResultElem.textContent="";
  }

  if(triviaNextBtn && triviaQuestionElem && triviaAnswersElem && triviaResultElem){
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
   * 8. Hora Actual
   *************************************/
  const timeInfoElem=document.getElementById("time-info");
  if(timeInfoElem){
    function actualizarHora(){
      const now=new Date();
      const hh=String(now.getHours()).padStart(2,"0");
      const mm=String(now.getMinutes()).padStart(2,"0");
      const ss=String(now.getSeconds()).padStart(2,"0");
      timeInfoElem.textContent=`${hh}:${mm}:${ss}`;
    }
    setInterval(actualizarHora,1000);
    actualizarHora();
  }

  /*************************************
   * 9. Bitcoin DEMO (CoinGecko)
   *************************************/
  const bitcoinPriceElem=document.getElementById("bitcoin-price");
  if(bitcoinPriceElem){
    function actualizarBitcoin(){
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
        .then(r=>r.json())
        .then(data=>{
          const price=data.bitcoin.usd;
          bitcoinPriceElem.textContent=`USD ${price.toLocaleString()}`;
        })
        .catch(e=>{
          bitcoinPriceElem.textContent="Error al obtener precio BTC.";
        });
    }
    actualizarBitcoin();
    setInterval(actualizarBitcoin,15000);
  }

  /*************************************
   * 10. Noticias Dinámicas (6 al azar)
   *************************************/
  const allNews=[
    {title:"Robot educativo revoluciona las aulas",text:"Ofrece clases personalizadas con IA."},
    {title:"IA de diagnóstico médico logra un 99% de acierto",text:"Herramienta de aprendizaje profundo reduce errores."},
    {title:"Coches autónomos avanzan sin conductor",text:"Ciudades aprueban taxis sin chofer."},
    {title:"Hologramas con IA para videollamadas",text:"Reuniones casi presenciales con HoloMeet."},
    {title:"Robots de limpieza inundan centros comerciales",text:"Sensores LIDAR y rutas optimizadas."},
    {title:"Chatbots conversacionales más humanos",text:"Modelos de lenguaje que conversan naturalmente."},
    {title:"IA vence campeones de póker",text:"Una IA especialista en decisiones inciertas."},
    {title:"Redes neuronales superan récord de traducción",text:"Calidad casi profesional en múltiples idiomas."},
    {title:"IA en agricultura de precisión",text:"Drones detectan plagas con mayor acierto."},
    {title:"Algoritmo predice terremotos",text:"Sistema IA analiza patrones geológicos."}
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
        </div>
      `;
    });
    newsContainer.innerHTML=newsHTML;
  }

  /*************************************
   * 11. Widgets Futuristas
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

  // 11.3 Predicciones IA
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

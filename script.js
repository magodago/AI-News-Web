document.addEventListener("DOMContentLoaded", () => {

  /*******************************************
   * 1. Fuente Orbitron
   *******************************************/
  const linkOrbitron=document.createElement("link");
  linkOrbitron.rel="stylesheet";
  linkOrbitron.href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
  document.head.appendChild(linkOrbitron);

  /*******************************************
   * 2. Título glitch
   *******************************************/
  const title=document.querySelector(".glitch");
  setInterval(()=>{
    if(title) title.classList.toggle("glitch-active");
  },2000);

  /*******************************************
   * 3. Barra Matrix (verde)
   *******************************************/
  function iniciarMatrix(){
    const bar=document.getElementById("matrix-bar");
    const canvas=document.createElement("canvas");
    canvas.width=bar.offsetWidth;
    canvas.height=bar.offsetHeight;
    canvas.style.display="block";
    canvas.style.position="absolute";
    bar.style.position="relative";
    bar.appendChild(canvas);

    const ctx=canvas.getContext("2d");
    const letters="01"; 
    const fontSize=14;
    const columns=Math.floor(canvas.width/fontSize);
    const drops=Array(columns).fill(1);

    function draw(){
      ctx.fillStyle="rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#0f0"; // verde
      ctx.font=fontSize+"px Orbitron";
      for(let i=0;i<drops.length;i++){
        const text=letters.charAt(Math.floor(Math.random()*letters.length));
        const x=i*fontSize;
        const y=drops[i]*fontSize;
        ctx.fillText(text,x,y);
        if(y>canvas.height && Math.random()>0.975){
          drops[i]=0;
        }
        drops[i]++;
      }
    }
    setInterval(draw,50);

    window.addEventListener("resize",()=>{
      canvas.width=bar.offsetWidth;
      canvas.height=bar.offsetHeight;
    });
  }
  iniciarMatrix();

  /*******************************************
   * 4. Cursor Futurista (verde)
   *******************************************/
  const cursor=document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);
  document.addEventListener("mousemove",(e)=>{
    cursor.style.transform=`translate3d(${e.pageX}px,${e.pageY}px,0)`;
  });

  /*******************************************
   * 5. "Follow the white rabbit..."
   *******************************************/
  const typingText=document.getElementById("typing-text");
  const phrase="Follow the white rabbit...";
  let idx=0;
  let typingInterval=null;
  function typePhrase(){
    if(!typingText)return;
    typingText.textContent=phrase.substring(0,idx);
    idx++;
    if(Math.random()>0.9){
      typingText.classList.add("typing-glitch");
      setTimeout(()=>typingText.classList.remove("typing-glitch"),100);
    }
    if(idx>phrase.length){
      clearInterval(typingInterval);
      setTimeout(()=>{
        idx=0;
        typingText.textContent="";
        typingInterval=setInterval(typePhrase,100);
      },1500);
    }
  }
  typingInterval=setInterval(typePhrase,100);

  /*******************************************
   * 6. Desafío de la Palabra
   *******************************************/
  // ... (Igual que antes)...

  /*******************************************
   * 7. Trivia IA
   *******************************************/
  // ... (Igual que antes)...

  /*******************************************
   * 8. Crack the Code (10 símbolos)
   *******************************************/
  // ... (Igual que antes)...

  /*******************************************
   * 9. Memory AI Cards
   *******************************************/
  // ... (Igual que antes)...

  /*******************************************
   * 10. Neon TicTacToe
   *******************************************/
  // ... (Igual que antes)...

  /*******************************************
   * 11. AI Number Guesser
   *******************************************/
  // ... (Igual que antes)...

  /*******************************************
   * 12. Noticias Dinámicas & Autorefresco
   *******************************************/
  // ... (Igual que antes)...

  /*******************************************
   * 13. Widgets Futuristas
   *******************************************/
  // ... (Igual que antes)...

  /*******************************************
   * 14. Sopa de Letras AI
   *******************************************/
  const wordsearchContainer=document.getElementById("wordsearch-container");
  const wordsearchWordsElem=document.getElementById("wordsearch-words");
  // Palabras: "ROBOT", "ALGORITMO", "RED", "DATOS", "IA"
  const wsWords=["ROBOT","ALGORITMO","RED","DATOS","IA"];

  // 10x10
  const rows=10, cols=10;
  let grid=Array.from({length:rows},()=>Array(cols).fill(null));

  // Función para poner una palabra en horizontal
  function placeWordHorizontal(word, r, c){
    if(c+word.length>cols) return false; // no cabe
    // Comprobamos si colisiona
    for(let i=0;i<word.length;i++){
      if(grid[r][c+i] && grid[r][c+i]!==word[i]) return false;
    }
    // Colocamos
    for(let i=0;i<word.length;i++){
      grid[r][c+i]=word[i];
    }
    return true;
  }
  // Función para poner una palabra en vertical
  function placeWordVertical(word, r, c){
    if(r+word.length>rows) return false;
    for(let i=0;i<word.length;i++){
      if(grid[r+i][c] && grid[r+i][c]!==word[i]) return false;
    }
    for(let i=0;i<word.length;i++){
      grid[r+i][c]=word[i];
    }
    return true;
  }
  // Insertamos cada palabra de forma aleatoria (h o v).
  function insertWord(word){
    let attempts=100;
    while(attempts>0){
      attempts--;
      const orientation=Math.random()<0.5?"H":"V";
      const rr=Math.floor(Math.random()*rows);
      const cc=Math.floor(Math.random()*cols);
      if(orientation==="H"){
        if(placeWordHorizontal(word,rr,cc)) return true;
      } else {
        if(placeWordVertical(word,rr,cc)) return true;
      }
    }
    return false; // no pudo
  }

  wsWords.forEach(w=>{
    insertWord(w);
  });

  // Rellenar huecos vacíos
  const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      if(!grid[r][c]){
        grid[r][c]=letters.charAt(Math.floor(Math.random()*letters.length));
      }
    }
  }

  // Mostrar en pantalla
  if(wordsearchContainer){
    wordsearchContainer.innerHTML="";
    for(let r=0;r<rows;r++){
      const rowDiv=document.createElement("div");
      rowDiv.classList.add("wordsearch-row");
      for(let c=0;c<cols;c++){
        const cellDiv=document.createElement("div");
        cellDiv.classList.add("wordsearch-cell");
        cellDiv.textContent=grid[r][c];
        rowDiv.appendChild(cellDiv);
      }
      wordsearchContainer.appendChild(rowDiv);
    }
  }
  if(wordsearchWordsElem){
    wordsearchWordsElem.textContent="Palabras: "+wsWords.join(", ");
  }

});


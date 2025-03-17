/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ANIMACIÓN FADE-IN EN EL BODY */
body {
  animation: fadeIn 1s ease forwards;
  opacity: 0;
}
@keyframes fadeIn {
  to { opacity: 1; }
}

/* FONDO OSCURO SIN IMAGEN */
html, body {
  height: 100%;
  background: #000; /* Fondo negro */
  font-family: "Orbitron", sans-serif;
  color: #0f0; /* Verde Matrix */
  overflow-x: hidden;
}

/* BARRA SUPERIOR MATRIX */
#matrix-bar {
  width: 100%;
  height: 60px;
  position: relative;
  overflow: hidden;
  background: rgba(0,0,0,0.7);
}

/* ENCABEZADO */
header {
  text-align: center;
  margin: 20px auto;
}

/* TÍTULO GLITCH (VERDE) */
.glitch {
  font-size: 3rem;
  text-transform: uppercase;
  text-shadow: 0 0 5px #0f0;
  animation: glitchShadow 1.5s infinite;
  margin-bottom: 15px;
  display: inline-block;
}
.glitch-active {
  text-shadow: 0px 0px 8px #0f0, 5px 0px 10px #0f0, -5px 0px 10px #0f0;
}
@keyframes glitchShadow {
  0% { text-shadow: 0px 0px 5px #0f0; }
  20% { text-shadow: 2px 0px 5px #0f0; }
  40% { text-shadow: -2px 0px 5px #0f0; }
  60% { text-shadow: 2px 0px 5px #0f0; }
  80% { text-shadow: -2px 0px 5px #0f0; }
  100% { text-shadow: 0px 0px 5px #0f0; }
}

/* FRASE TYPING */
.typing-container {
  font-size: 1.2rem;
  margin-top: 10px;
  height: 30px;
  overflow: hidden;
  color: #0f0;
}
.typing-glitch {
  text-shadow: 0 0 5px #0f0, 0 0 8px #0f0;
}

/* SECCIONES (posición, ancho) */
section {
  margin: 40px auto;
  width: 90%;
  max-width: 600px;
  text-align: center;
}

/* BOTONES ESTILO MATRIX */
button {
  background: #111;
  border: 1px solid #0f0;
  color: #0f0;
  padding: 8px 12px;
  border-radius: 5px;
  transition: 0.3s;
  font-family: inherit;
  cursor: pointer;
}
button:hover {
  background: #0f0;
  color: #000;
}

/* INPUTS TIPO TEXT */
input[type="text"] {
  background: #111;
  border: 1px solid #0f0;
  color: #0f0;
  padding: 5px 10px;
  border-radius: 5px;
  font-family: inherit;
  font-size: 1rem;
  margin: 5px;
}

/* ADIVINA PALABRA */
#word-display {
  font-size: 2rem;
  letter-spacing: 8px;
  margin: 10px 0;
}
#hint, #message, #attempts-remaining {
  color: #0f0;
}

/* TRIVIA */
#trivia-container {
  border: 1px solid #0f0;
  padding: 20px;
  border-radius: 10px;
  background: rgba(0,255,0,0.1);
  box-shadow: 0 0 10px #0f0;
}
.trivia-option {
  margin: 5px 0;
  cursor: pointer;
}

/* CRACK THE CODE */
#code-container {
  border: 1px solid #0f0;
  padding: 20px;
  border-radius: 10px;
  background: rgba(0,255,0,0.1);
  box-shadow: 0 0 10px #0f0;
}
.symbol-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  margin-bottom: 10px;
}
.symbol-btn {
  background: #111;
  border: 2px solid #0f0;
  color: #0f0;
  border-radius: 5px;
  padding: 6px 8px;
  margin: 3px;
  cursor: pointer;
}
.symbol-btn:hover {
  background: #0f0;
  color: #000;
}
#code-inputs {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 10px 0;
}
.code-char {
  width: 40px;
  padding: 10px;
  border: 2px solid #0f0;
  background: #222;
  color: #0f0;
  text-align: center;
  font-size: 1.2rem;
  border-radius: 5px;
}
#code-feedback {
  margin: 10px 0;
  font-weight: bold;
  color: #0f0;
}

/* MEMORY GAME */
#memory-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.card {
  width: 80px;
  height: 80px;
  background: #111;
  border: 2px solid #0f0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.4rem;
  color: #0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  user-select: none;
}
.card.flipped {
  background: #0f0;
  color: #000;
}
#memory-message {
  margin-top: 10px;
  font-weight: bold;
  color: #0f0;
}

/* TICTACTOE */
.neon-tictactoe {
  margin: 40px auto;
}
#tictactoe-container {
  display: grid;
  grid-template-columns: repeat(10, 100px);
  grid-gap: 0px;
  margin: 0 auto;
  text-align: center;
}
.tictactoe-cell {
  width: 100px;
  height: 100px;
  background: #111;
  border: 2px solid #0f0;
  border-radius: 5px;
  font-size: 2rem;
  color: #0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
}
.tictactoe-cell:hover {
  background: #0f0;
  color: #000;
}
#tictactoe-message {
  margin: 10px;
  font-weight: bold;
  min-height: 30px;
  color: #0f0;
}

/* AI NUMBER GUESSER */
.ai-number-guessing {
  margin: 40px auto;
}
#guesser-container {
  border: 1px solid #0f0;
  padding: 20px;
  border-radius: 10px;
  background: rgba(0,255,0,0.1);
  box-shadow: 0 0 10px #0f0;
}
#guesser-question {
  margin: 10px 0;
  font-weight: bold;
  color: #0f0;
}
#guesser-feedback {
  margin-top: 10px;
  font-weight: bold;
  color: #0f0;
  min-height: 20px;
}

/* NOTICIAS */
.noticias {
  max-width: 1200px;
}
#news-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}
.news-box {
  width: 300px;
  background: rgba(0,255,0,0.1);
  border: 1px solid #0f0;
  border-radius: 20px;
  box-shadow: 0 0 10px #0f0;
  padding: 20px;
  text-align: left;
  min-height: 180px;
  position: relative;
  transition: 0.3s;
}
.news-box:hover {
  box-shadow: 0 0 15px #0f0, 0 0 30px #0f0;
  transform: scale(1.02);
}
.news-box h3 {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #0f0;
}
.news-box p {
  color: #0f0;
  font-size: 0.9rem;
  line-height: 1.2rem;
  margin-bottom: 10px;
}

/* WIDGETS */
.widgets {
  max-width: 1200px;
}
.widget {
  width: 300px;
  background: rgba(0,255,0,0.1);
  border: 1px solid #0f0;
  border-radius: 10px;
  box-shadow: 0 0 10px #0f0;
  padding: 20px;
  margin: 10px;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  min-height: 200px;
  position: relative;
  transition: 0.3s;
}
.widget:hover {
  box-shadow: 0 0 15px #0f0, 0 0 30px #0f0;
  transform: scale(1.02);
}

/* BARRAS DE PAÍSES */
.country-bar {
  width: 100%;
  background: #111;
  margin: 8px 0;
  border: 1px solid #0f0;
  border-radius: 5px;
  height: 24px;
  position: relative;
  overflow: hidden;
}
.country-fill {
  background: #0f0;
  width: 0%;
  height: 100%;
  transition: width 1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  font-size: 0.8rem;
}

/* ANÁLISIS Y TENDENCIAS */
.analisis {
  max-width: 1000px;
}
#analisis-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
#analisis-container article {
  width: 300px;
  background: rgba(0,255,0,0.1);
  border: 1px solid #0f0;
  border-radius: 20px;
  box-shadow: 0 0 10px #0f0;
  text-align: left;
  padding: 20px;
  transition: 0.3s;
}
#analisis-container article:hover {
  box-shadow: 0 0 15px #0f0, 0 0 30px #0f0;
  transform: scale(1.02);
}

/* CURSOR FUTURISTA */
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  border: 2px solid #0f0;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: difference;
  z-index: 9999;
  transition: transform 0.2s ease;
}

/* SOPA DE LETRAS */
.word-search {
  margin: 40px auto;
}
#wordsearch-container {
  border: 1px solid #0f0;
  padding: 20px;
  border-radius: 10px;
  background: rgba(0,255,0,0.1);
  box-shadow: 0 0 10px #0f0;
  margin: 10px 0;
  display: grid;
  grid-template-columns: repeat(10, 30px);
  gap: 2px;
}
.wordsearch-cell {
  width: 30px;
  height: 30px;
  border: 1px solid #0f0;
  background: #111;
  color: #0f0;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
#wordsearch-words {
  margin-top: 10px;
  color: #0f0;
  font-weight: bold;
}
.highlighted {
  background: #0f0 !important;
  color: #000 !important;
}

/* MEDIA QUERIES */
@media (max-width: 500px) {
  #tictactoe-container {
    grid-template-columns: repeat(3,80px);
    grid-template-rows: repeat(3,80px);
  }
  .tictactoe-cell {
    width: 80px;
    height: 80px;
  }
  .card {
    width: 60px;
    height: 60px;
    font-size: 1.2rem;
  }
  .symbol-btn { width: 30px; }
  .code-char { width: 30px; }
}

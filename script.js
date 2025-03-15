/*******************************
 * 1) Citas sobre IA (rotatorias)
 *******************************/
const quotes = [
  "La IA es la nueva electricidad.",
  "Los datos son el nuevo petróleo.",
  "La creatividad sigue siendo humana.",
  "La IA sin ética es solo código.",
  "El futuro pertenece a la inteligencia artificial."
];
function cambiarCita() {
  const quoteElement = document.getElementById("ai-quote");
  if (quoteElement) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
  }
}
// Cambiar cita cada 10s
setInterval(cambiarCita, 10000);
cambiarCita();

/*******************************
 * 2) Contador Patentes de IA
 *******************************/
let patenteContador = 50000;
function actualizarPatentes() {
  const patentCountElem = document.getElementById("patent-count");
  if (patentCountElem) {
    patentCountElem.textContent = `Patentes registradas en IA: ${patenteContador}`;
    // Incremento ficticio
    patenteContador += Math.floor(Math.random() * 10);
  }
}
// Actualizar cada 5s
setInterval(actualizarPatentes, 5000);
actualizarPatentes();

/*******************************
 * 3) Predicciones de IA
 *******************************/
const predicciones = [
  "En 2030, el 60% de los trabajos incluirán IA colaborativa.",
  "La IA generará más del 50% del contenido web en 2028.",
  "Los robots humanoides convivirán con nosotros en 2050.",
  "La computación cuántica revolucionará el Deep Learning en 2040."
];
const predictionTextElem = document.getElementById("prediction-text");
if (predictionTextElem) {
  // Mostramos una aleatoria cada vez que recargamos
  predictionTextElem.textContent = 
    predicciones[Math.floor(Math.random() * predicciones.length)];
}

/*******************************
 * 4) Mapa de Innovación (Falso / Simulado)
 *******************************/
const mapContainer = document.getElementById("map-container");
if (mapContainer) {
  mapContainer.textContent = "Ciudades top en IA: San Francisco, Beijing, Londres, Tokio.";
}

/*******************************
 * 5) Sorpresa Diaria
 *******************************/
const sorpresas = [
  "En 2025, el 70% de las empresas usará IA para atención al cliente.",
  "Los coches autónomos evitarán el 90% de los accidentes viales.",
  "La IA podría superar la creatividad humana en 2045.",
  "Un nuevo avance en IA reduce el consumo energético un 40%."
];

const revealBtn = document.getElementById("reveal-surprise");
const surpriseTextElem = document.getElementById("surprise-text");

if (revealBtn && surpriseTextElem) {
  revealBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * sorpresas.length);
    surpriseTextElem.textContent = sorpresas[randomIndex];
  });
}

/*******************************
 * 6) Ranking Países con Mayor Inversión IA
 *******************************/
const countriesData = [
  { name: "USA", investment: 90 },
  { name: "China", investment: 85 },
  { name: "Alemania", investment: 70 },
  { name: "Reino Unido", investment: 65 },
  { name: "Japón", investment: 60 }
];
/* 
 investment: un número 0-100 representando la escala. 
 Lo interpretaremos como porcentaje de la barra.
*/
function mostrarPaisesInversion() {
  const countriesContainer = document.getElementById("countries-container");
  if (!countriesContainer) return;

  let html = "";
  countriesData.forEach((pais) => {
    html += `
      <div class="country-bar">
        <div class="country-label">${pais.name}</div>
        <div class="country-fill" style="width: 0%;">0%</div>
      </div>
    `;
  });
  countriesContainer.innerHTML = html;

  // Animar las barras
  const fillElems = countriesContainer.querySelectorAll(".country-fill");
  fillElems.forEach((fill, index) => {
    const inv = countriesData[index].investment;
    setTimeout(() => {
      fill.style.width = inv + "%";
      fill.textContent = inv + "%";
    }, 200); 
  });
}
mostrarPaisesInversion();


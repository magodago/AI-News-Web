document.addEventListener("DOMContentLoaded", function() {
    // Cargar Noticias en Tiempo Real desde Google News RSS
    const RSS_URL = "https://news.google.com/rss/search?q=inteligencia+artificial&hl=es&gl=ES&ceid=ES:es";
    
    async function cargarNoticias() {
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(RSS_URL)}`);
            const data = await response.json();
            const parser = new DOMParser();
            const xml = parser.parseFromString(data.contents, "text/xml");
            const items = xml.querySelectorAll("item");

            let noticiasHTML = "";
            items.forEach((item, index) => {
                if (index < 5) {
                    const title = item.querySelector("title").textContent;
                    const link = item.querySelector("link").textContent;
                    const description = item.querySelector("description").textContent;
                    
                    noticiasHTML += `
                        <article class="noticia">
                            <h3>${title}</h3>
                            <p>${description}</p>
                            <a href="${link}" target="_blank">Leer más</a>
                        </article>
                    `;
                }
            });

            document.getElementById("news-container").innerHTML = noticiasHTML;
        } catch (error) {
            console.error("Error al obtener las noticias:", error);
            document.getElementById("news-container").innerHTML = "<p>No se pudieron cargar las noticias.</p>";
        }
    }
    cargarNoticias();

    // Cargar Predicciones del Futuro de la IA
    const predicciones = [
        "En 2030, más del 50% de los trabajos estarán automatizados.",
        "La IA superará a los humanos en creatividad en menos de 20 años.",
        "Las ciudades inteligentes serán impulsadas completamente por IA en 2040.",
        "Los robots humanoides convivirán con nosotros en 2050."
    ];
    document.getElementById("prediction-text").textContent = predicciones[Math.floor(Math.random() * predicciones.length)];

    // Simulación de Tendencias en IA
    const tendencias = ["Deep Learning", "Automatización", "Redes Neuronales", "Blockchain IA", "Robótica Avanzada"];
    let tendenciaHTML = "";
    tendencias.forEach((t) => {
        tendenciaHTML += `<p>🔹 ${t}</p>`;
    });
    document.getElementById("trends-chart").innerHTML = tendenciaHTML;

    // Mapa de Innovación (Falso por ahora)
    document.getElementById("map-container").textContent = "🌍 Las principales ciudades de IA en el mundo son: San Francisco, Beijing, Londres y Tokio.";

    // Widget de Citas sobre IA
    const quotes = [
        "La inteligencia artificial no reemplazará a los humanos, sino que nos hará más eficientes.",
        "La IA es la nueva electricidad.",
        "Los datos son el nuevo petróleo.",
        "La creatividad sigue siendo humana.",
        "La IA sin ética es solo código."
    ];
    
    function cambiarCita() {
        const quoteElement = document.getElementById("ai-quote");
        if (quoteElement) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            quoteElement.textContent = quotes[randomIndex];
        }
    }
    setInterval(cambiarCita, 10000);
    cambiarCita();

    // Widget de Patentes de IA (Número Ficticio en Crecimiento)
    let patenteContador = 45000;
    function actualizarPatentes() {
        document.getElementById("patent-count").textContent = patenteContador + " registradas en 2025";
        patenteContador += Math.floor(Math.random() * 5);
    }
    setInterval(actualizarPatentes, 5000);
    actualizarPatentes();

    // Desafío Diario de IA (Palabras en Español)
    const palabras = [
        { palabra: "robot", pista: "Máquina programada para realizar tareas humanas." },
        { palabra: "red", pista: "Conjunto de nodos interconectados, clave en la IA." },
        { palabra: "algoritmo", pista: "Conjunto de reglas para resolver problemas." },
        { palabra: "datos", pista: "El combustible de la inteligencia artificial." }
    ];

    let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    let palabraOculta = Array(palabraSeleccionada.palabra.length).fill("_");
    let intentos = palabraSeleccionada.palabra.length + 3;

    document.getElementById("hint").textContent = "Pista: " + palabraSeleccionada.pista;
    document.getElementById("word-display").textContent = palabraOculta.join(" ");
    
    document.getElementById("check-letter").addEventListener("click", function() {
        const letra = document.getElementById("letter-input").value.toLowerCase();
        document.getElementById("letter-input").value = "";

        if (!letra || letra.length !== 1) return;
        
        let encontrada = false;

        for (let i = 0; i < palabraSeleccionada.palabra.length; i++) {
            if (palabraSeleccionada.palabra[i] === letra) {
                palabraOculta[i] = letra;
                encontrada = true;
            }
        }

        if (!encontrada) intentos--;

        document.getElementById("word-display").textContent = palabraOculta.join(" ");
        
        if (!palabraOculta.includes("_")) {
            document.getElementById("message").textContent = "🎉 ¡Correcto! La palabra es: " + palabraSeleccionada.palabra;
        } else if (intentos <= 0) {
            document.getElementById("message").textContent = "❌ Sin intentos. La palabra era: " + palabraSeleccionada.palabra;
        }
    });

    // Sorpresa Diaria
    document.getElementById("reveal-surprise").addEventListener("click", function() {
        const sorpresas = [
            "🔮 Predicción: En 2030, la IA escribirá el 80% del código en el mundo.",
            "🚀 Nuevo avance: Google acaba de lanzar una IA que crea música en tiempo real.",
            "🤖 Elon Musk dice que Neuralink estará listo para humanos en 2026.",
            "💡 Hoy se descubrió una nueva forma de energía basada en IA."
        ];
        document.getElementById("surprise-text").textContent = sorpresas[Math.floor(Math.random() * sorpresas.length)];
    });

});

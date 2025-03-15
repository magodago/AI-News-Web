document.addEventListener("DOMContentLoaded", function() {
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

    // Desafío Diario de IA
    const palabras = [
        { palabra: "robot", pista: "Máquina programada para realizar tareas humanas." },
        { palabra: "red", pista: "Conjunto de nodos interconectados, clave en la IA." },
        { palabra: "algoritmo", pista: "Conjunto de reglas para resolver problemas." },
        { palabra: "datos", pista: "El combustible de la inteligencia artificial." }
    ];

    let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    let palabraOculta = "_ ".repeat(palabraSeleccionada.palabra.length).trim();
    let intentos = palabraSeleccionada.palabra.length + 3;

    document.getElementById("hint").textContent = "Pista: " + palabraSeleccionada.pista;
    document.getElementById("word-display").textContent = palabraOculta;
    
    document.getElementById("check-letter").addEventListener("click", function() {
        const letra = document.getElementById("letter-input").value.toLowerCase();
        document.getElementById("letter-input").value = "";

        if (!letra || letra.length !== 1) return;
        
        let nuevaPalabraOculta = "";
        let encontrada = false;

        for (let i = 0; i < palabraSeleccionada.palabra.length; i++) {
            if (palabraSeleccionada.palabra[i] === letra) {
                nuevaPalabraOculta += letra + " ";
                encontrada = true;
            } else {
                nuevaPalabraOculta += palabraOculta[i * 2] + " ";
            }
        }

        if (!encontrada) intentos--;

        palabraOculta = nuevaPalabraOculta.trim();
        document.getElementById("word-display").textContent = palabraOculta;
        
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

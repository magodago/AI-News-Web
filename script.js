document.addEventListener("DOMContentLoaded", function() {
    // Efecto Glitch en el Título
    const title = document.querySelector(".glitch");
    setInterval(() => {
        title.classList.toggle("glitch-active");
    }, 2000);

    // Efecto Matrix en el Fondo
    const matrixCanvas = document.createElement("canvas");
    matrixCanvas.id = "matrixCanvas";
    document.body.appendChild(matrixCanvas);

    const ctx = matrixCanvas.getContext("2d");
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const letters = "0123456789AI智能人工智能未来";
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(0);

    function drawMatrixEffect() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        ctx.fillStyle = "#0ff";
        ctx.font = fontSize + "px Orbitron";

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(drawMatrixEffect, 50);

    // Cursor Futurista con Resplandor
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
    });

    // Modo "Hacker" al presionar CTRL+H
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key === "h") {
            document.body.classList.toggle("hacker-mode");
            alert("🔥 Modo Hacker Activado 🔥");
        }
    });

    // Animación de noticias al cargar
    function animarNoticias() {
        const noticias = document.querySelectorAll(".noticia");
        noticias.forEach((noticia, index) => {
            setTimeout(() => {
                noticia.style.opacity = "1";
                noticia.style.transform = "translateY(0)";
            }, index * 300);
        });
    }

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
                        <article class="noticia" style="opacity:0; transform: translateY(20px); transition: all 0.5s ease-in-out;">
                            <h3>${title}</h3>
                            <p>${description}</p>
                            <a href="${link}" target="_blank">Leer más</a>
                        </article>
                    `;
                }
            });

            document.getElementById("news-container").innerHTML = noticiasHTML;
            animarNoticias();
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

    // Mensaje de Bienvenida con IA
    setTimeout(() => {
        alert("👋 Bienvenido a AI News. ¡Explora las últimas noticias de IA con estilo futurista!");
    }, 500);

});

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

    // Animaciones y Cursor Futurista
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
    });

    // Cargar Noticias con Pop-ups para Resumen
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
                        <article class="noticia-box">
                            <h3>${title}</h3>
                            <p>${description.substring(0, 80)}...</p>
                            <button class="ver-mas" data-title="${title}" data-description="${description}" data-link="${link}">Ver más</button>
                        </article>
                    `;
                }
            });

            document.getElementById("news-container").innerHTML = noticiasHTML;

            // Agregar funcionalidad de Pop-ups para mostrar noticias completas
            document.querySelectorAll(".ver-mas").forEach(button => {
                button.addEventListener("click", function() {
                    const title = this.getAttribute("data-title");
                    const description = this.getAttribute("data-description");
                    const link = this.getAttribute("data-link");

                    document.getElementById("popup-title").textContent = title;
                    document.getElementById("popup-content").textContent = description;
                    document.getElementById("popup-link").href = link;
                    document.getElementById("news-popup").style.display = "block";
                });
            });
        } catch (error) {
            console.error("Error al obtener las noticias:", error);
            document.getElementById("news-container").innerHTML = "<p>No se pudieron cargar las noticias.</p>";
        }
    }
    cargarNoticias();

    // Cerrar Pop-up
    document.getElementById("close-popup").addEventListener("click", function() {
        document.getElementById("news-popup").style.display = "none";
    });

    // Mensaje de Bienvenida
    setTimeout(() => {
        alert("👋 Bienvenido a AI News. ¡Explora las últimas noticias de IA con estilo futurista!");
    }, 500);
});

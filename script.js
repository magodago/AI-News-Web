document.addEventListener("DOMContentLoaded", function() {
    // Efecto Glitch en el Título
    const title = document.querySelector(".glitch");
    if (title) {
        setInterval(() => {
            title.classList.toggle("glitch-active");
        }, 2000);
    }

    // Efecto Matrix en el Fondo
    function iniciarEfectoMatrix() {
        const canvas = document.createElement("canvas");
        canvas.id = "matrixCanvas";
        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = "0123456789AI智能人工智能未来";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(0);

        function drawMatrixEffect() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#0ff";
            ctx.font = fontSize + "px Orbitron";

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(drawMatrixEffect, 50);
    }
    iniciarEfectoMatrix();

    // Cursor Futurista con Resplandor
    function iniciarCursor() {
        const cursor = document.createElement("div");
        cursor.classList.add("custom-cursor");
        document.body.appendChild(cursor);

        document.addEventListener("mousemove", (e) => {
            cursor.style.left = `${e.pageX}px`;
            cursor.style.top = `${e.pageY}px`;
        });
    }
    iniciarCursor();

    // Cargar Noticias con Diseño de Cajas y Pop-ups
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

    // Cerrar Pop-up de Noticias
    document.getElementById("close-popup").addEventListener("click", function() {
        document.getElementById("news-popup").style.display = "none";
    });

    // Rellenar Sección de Análisis y Tendencias
    const analisisArticulos = [
        { titulo: "El impacto de la IA en la economía global", descripcion: "Cómo la inteligencia artificial está redefiniendo el empleo y la productividad.", link: "#" },
        { titulo: "¿Es la IA consciente? Últimos avances en AGI", descripcion: "Un análisis profundo sobre la inteligencia artificial general.", link: "#" },
        { titulo: "Redes neuronales vs. Machine Learning tradicional", descripcion: "Comparación de enfoques y aplicaciones en la industria actual.", link: "#" }
    ];

    let analisisHTML = "";
    analisisArticulos.forEach(articulo => {
        analisisHTML += `
            <article class="analisis-articulo">
                <h3>${articulo.titulo}</h3>
                <p>${articulo.descripcion}</p>
                <a href="${articulo.link}" target="_blank">Leer más</a>
            </article>
        `;
    });
    document.getElementById("analisis-container").innerHTML = analisisHTML;

    // Rellenar Sección de Comunidad
    document.getElementById("comunidad-container").innerHTML = `
        <h3>Únete a la conversación sobre IA</h3>
        <p>Participa en nuestros foros y debates en vivo sobre las últimas tendencias en IA.</p>
        <a href="https://discord.com" target="_blank">Únete a nuestro Discord</a>
        <a href="https://reddit.com/r/AI" target="_blank">Participa en Reddit</a>
    `;

    // Rellenar Sección de Contacto
    document.getElementById("contacto-container").innerHTML = `
        <h3>Contacto</h3>
        <p>¿Tienes preguntas o sugerencias? Escríbenos.</p>
        <form>
            <input type="text" placeholder="Tu nombre" required>
            <input type="email" placeholder="Tu correo" required>
            <textarea placeholder="Tu mensaje" required></textarea>
            <button type="submit">Enviar</button>
        </form>
    `;

    // Mensaje de Bienvenida
    setTimeout(() => {
        alert("👋 Bienvenido a AI News. ¡Explora las últimas noticias de IA con estilo futurista!");
    }, 500);
});

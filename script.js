document.addEventListener("DOMContentLoaded", function() {
    // Obtener noticias desde Google News RSS
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
                if (index < 5) { // Mostramos solo las 5 primeras noticias
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

            document.querySelector(".noticias").innerHTML = noticiasHTML;
        } catch (error) {
            console.error("Error al obtener las noticias:", error);
            document.querySelector(".noticias").innerHTML = "<p>No se pudieron cargar las noticias.</p>";
        }
    }

    cargarNoticias();

    // Animación de glitch en el título
    const title = document.querySelector("h1");
    setInterval(() => {
        title.classList.toggle("glitch");
    }, 2000);

    // Cursor futurista con resplandor
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

    // Mensaje de bienvenida con IA
    setTimeout(() => {
        alert("👋 Bienvenido a AI News. Noticias de IA en tiempo real.");
    }, 500);
});

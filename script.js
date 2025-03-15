document.addEventListener("DOMContentLoaded", function() {
    // Animación de entrada para las noticias con glitch
    const noticias = document.querySelectorAll(".noticia");
    noticias.forEach((noticia, index) => {
        setTimeout(() => {
            noticia.classList.add("visible");
        }, index * 300);
    });

    // Efecto de glitch en el título
    const title = document.querySelector("h1");
    setInterval(() => {
        title.classList.toggle("glitch");
    }, 2000);

    // Agregar partículas en el fondo
    const particlesContainer = document.createElement("div");
    particlesContainer.classList.add("particles");
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        let particle = document.createElement("div");
        particle.classList.add("particle");
        particlesContainer.appendChild(particle);
    }

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
        alert("👋 Bienvenido a AI News. Prepárate para explorar las últimas noticias de IA con estilo futurista.");
    }, 500);
});

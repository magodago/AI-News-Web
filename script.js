document.addEventListener("DOMContentLoaded", function() {
    // Animación de carga para las noticias
    const noticias = document.querySelectorAll(".noticia");
    noticias.forEach((noticia, index) => {
        setTimeout(() => {
            noticia.style.opacity = "1";
            noticia.style.transform = "translateY(0)";
        }, index * 300);
    });

    // Botón para cambiar entre modo oscuro y claro
    const toggleModeButton = document.createElement("button");
    toggleModeButton.textContent = "Modo Oscuro/Claro";
    toggleModeButton.style.position = "fixed";
    toggleModeButton.style.top = "20px";
    toggleModeButton.style.right = "20px";
    toggleModeButton.style.padding = "10px";
    toggleModeButton.style.background = "#0ff";
    toggleModeButton.style.border = "none";
    toggleModeButton.style.borderRadius = "5px";
    toggleModeButton.style.cursor = "pointer";
    toggleModeButton.style.fontFamily = "Orbitron, sans-serif";

    document.body.appendChild(toggleModeButton);

    toggleModeButton.addEventListener("click", function() {
        document.body.classList.toggle("light-mode");
    });

    // Mensaje de bienvenida
    setTimeout(() => {
        alert("Bienvenido a AI News. ¡Explora las últimas noticias de IA!");
    }, 500);
});

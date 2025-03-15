document.addEventListener("DOMContentLoaded", function() {
    // Efecto Matrix en el Fondo, asegurando que cubra toda la pantalla correctamente
    function iniciarEfectoMatrix() {
        const canvas = document.createElement("canvas");
        canvas.id = "matrixCanvas";
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100vw";
        canvas.style.height = "100vh";
        canvas.style.zIndex = "-1"; // Para que quede detrás del contenido
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
});

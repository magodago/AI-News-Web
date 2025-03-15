document.addEventListener("DOMContentLoaded", () => {
  // 1. Agregar la fuente Orbitron por JavaScript (opcional si prefieres <link>)
  const linkOrbitron = document.createElement("link");
  linkOrbitron.rel = "stylesheet";
  linkOrbitron.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
  document.head.appendChild(linkOrbitron);

  // 2. Efecto Glitch en el Título
  const title = document.querySelector(".glitch");
  setInterval(() => {
    title.classList.toggle("glitch-active");
  }, 2000);

  // 3. Efecto Matrix en el Fondo
  function iniciarEfectoMatrix() {
    const canvas = document.createElement("canvas");
    canvas.id = "matrixCanvas";
    // Que ocupe toda la ventana, detrás de los elementos
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "-1";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Ajustar el canvas al cambiar tamaño de ventana
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const letters = "0123456789AI智能人工智能未来";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrixEffect() {
      // Fondo semitransparente para estela
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Color de caracteres
      ctx.fillStyle = "#0ff";
      ctx.font = fontSize + "px Orbitron";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reiniciar la cascada
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    setInterval(drawMatrixEffect, 50);
  }
  iniciarEfectoMatrix();

  // 4. Cursor Futurista
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate3d(${e.pageX}px, ${e.pageY}px, 0)`;
  });
});

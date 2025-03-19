document.addEventListener("DOMContentLoaded", () => {
  // Al inicio, ocultamos todas las secciones excepto #matrix-game (si es que existe alguna sección de inicio)
  document.querySelectorAll("section").forEach(section => {
    if (section.id !== "matrix-game") {
      section.style.display = "";
    }
  });

  /* ---------------------------
     Juego de la pastilla (Matrix)
  --------------------------- */
  const redPill = document.getElementById("red-pill");
  const bluePill = document.getElementById("blue-pill");
  const matrixText = document.getElementById("matrix-text");

  // Función para revelar todas las secciones y cambiar el fondo del canvas
  function revelarPagina(modo) {
    document.querySelectorAll("section").forEach(section => {
      section.style.display = "";
    });
    const particlesCanvas = document.getElementById("particles-canvas");
    if (modo === "red-mode") {
      particlesCanvas.style.background = "#400";
    } else if (modo === "blue-mode") {
      particlesCanvas.style.background = "#004";
    } else {
      particlesCanvas.style.background = "#000";
    }
  }

  // Función de transición (efecto explosión, desenfoque y glitch)
  function transicionMatrix(modo, mensaje) {
    if (matrixText) matrixText.textContent = "Cargando...";
    const particlesCanvas = document.getElementById("particles-canvas");
    particlesCanvas.classList.add("explosion-glitch");
    setTimeout(() => {
      particlesCanvas.classList.remove("explosion-glitch");
      if (matrixText) matrixText.textContent = mensaje;
      revelarPagina(modo);
    }, 2500);
  }

  if (redPill && bluePill && matrixText) {
    redPill.addEventListener("click", () => {
      transicionMatrix("red-mode", "Has elegido la pastilla roja. Te mostraré hasta dónde llega el agujero del conejo.");
    });
    bluePill.addEventListener("click", () => {
      transicionMatrix("blue-mode", "Has elegido la pastilla azul. La historia termina, despiertas en tu cama y crees lo que quieras.");
    });
  }

  /* ---------------------------
     Acceso Secreto: Portal del Oráculo
     Activación mediante 3 toques sobre el título (elemento con clase "glitch")
  --------------------------- */
  let secretClicksTitle = 0;
  const titleElement = document.querySelector(".glitch");
  if (titleElement) {
    titleElement.addEventListener("click", () => {
      secretClicksTitle++;
      if (secretClicksTitle >= 3) {
        activarPortalSecreto();
        secretClicksTitle = 0;
      }
    });
  }

  function activarPortalSecreto() {
    let portal = document.getElementById("secret-portal");
    if (!portal) {
      portal = document.createElement("div");
      portal.id = "secret-portal";
      document.body.appendChild(portal);
    }
    portal.innerHTML = `
      <div class="portal-content">
        <h1 class="portal-title">NEO</h1>
        <p class="portal-message">Solo los elegidos ven la verdad.</p>
        <button id="enterSecret">ENTRAR</button>
      </div>
    `;
    portal.style.display = "flex";
    document.getElementById("enterSecret").addEventListener("click", () => {
      window.location.href = "oraculo-game.html";
    });
  }

  /* ---------------------------
     Efecto de partículas con líneas conectadas
  --------------------------- */
  function iniciarParticles() {
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const numParticles = 100;
    const maxDistance = 100;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        direction: Math.random() * Math.PI * 2
      });
    }

    function updateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += Math.cos(p.direction) * p.speed;
        p.y += Math.sin(p.direction) * p.speed;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0f0";
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(0,255,0,${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(updateParticles);
    }
    updateParticles();
  }
  iniciarParticles();

  /* ---------------------------
     Cargar fuente Orbitron
  --------------------------- */
  const linkOrbitron = document.createElement("link");
  linkOrbitron.rel = "stylesheet";
  linkOrbitron.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
  document.head.appendChild(linkOrbitron);

  /* ---------------------------
     Efecto Glitch en el Título
  --------------------------- */
  setInterval(() => {
    if (titleElement) titleElement.classList.toggle("glitch-active");
  }, 2000);

  /* ---------------------------
     Barra Matrix
  --------------------------- */
  function iniciarMatrix() {
    const bar = document.getElementById("matrix-bar");
    const canvas = document.createElement("canvas");
    canvas.width = bar.offsetWidth;
    canvas.height = bar.offsetHeight;
    canvas.style.display = "block";
    canvas.style.position = "absolute";
    bar.style.position = "relative";
    bar.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const letters = "01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = fontSize + "px Orbitron";
      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    setInterval(draw, 50);
    window.addEventListener("resize", () => {
      canvas.width = bar.offsetWidth;
      canvas.height = bar.offsetHeight;
    });
  }
  iniciarMatrix();

  /* ---------------------------
     Cursor Futurista
  --------------------------- */
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);
  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate3d(${e.pageX}px, ${e.pageY}px, 0)`;
  });

  /* ---------------------------
     Texto "Follow the white rabbit..."
  --------------------------- */
  const typingText = document.getElementById("typing-text");
  const phrase = "Follow the white rabbit...";
  let idx = 0;
  let typingInterval = null;
  function typePhrase() {
    if (!typingText) return;
    typingText.textContent = phrase.substring(0, idx);
    idx++;
    if (Math.random() > 0.9) {
      typingText.classList.add("typing-glitch");
      setTimeout(() => {
        typingText.classList.remove("typing-glitch");
      }, 100);
    }
    if (idx > phrase.length) {
      clearInterval(typingInterval);
      setTimeout(() => {
        idx = 0;
        typingText.textContent = "";
        typingInterval = setInterval(typePhrase, 100);
      }, 1500);
    }
  }
  typingInterval = setInterval(typePhrase, 100);

  /* ---------------------------
     (El resto de funcionalidades de los juegos y secciones se integran aquí)
     Por cuestiones de extensión, se asume que el código de: Desafío: Adivina la Palabra, Trivia, Crack the Code, Memory AI Cards, Sopa de Letras, etc. se mantiene tal como en la versión anterior.
  --------------------------- */

  /* ---------------------------
     Botón: Volver Arriba
  --------------------------- */
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.style.display = window.pageYOffset > 200 ? "block" : "none";
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

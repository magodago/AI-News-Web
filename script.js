document.addEventListener("DOMContentLoaded", () => {

  /*******************************************
   * 1. Efecto de partículas en el fondo
   *******************************************/
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
      ctx.fillStyle = "#0f0";
      particles.forEach(p => {
        p.x += Math.cos(p.direction) * p.speed;
        p.y += Math.sin(p.direction) * p.speed;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(updateParticles);
    }
    updateParticles();
  }
  iniciarParticles();

  /*******************************************
   * 2. Fuente Orbitron
   *******************************************/
  const linkOrbitron = document.createElement("link");
  linkOrbitron.rel = "stylesheet";
  linkOrbitron.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
  document.head.appendChild(linkOrbitron);

  /*******************************************
   * 3. Efecto Glitch en el Título
   *******************************************/
  const title = document.querySelector(".glitch");
  setInterval(() => {
    if (title) title.classList.toggle("glitch-active");
  }, 2000);

  /*******************************************
   * 4. Barra Matrix
   *******************************************/
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

  /*******************************************
   * 5. Cursor Futurista
   *******************************************/
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate3d(${e.pageX}px, ${e.pageY}px, 0)`;
  });

  /*******************************************
   * 6. Texto "Follow the white rabbit..."
   *******************************************/
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

  /*******************************************
   * 7. Adivina la Palabra
   *******************************************/
  // ... (Sección de "Adivina la Palabra" - sin cambios)

  /*******************************************
   * 8. Trivia IA
   *******************************************/
  // ... (Sección de "Trivia IA" - sin cambios)

  /*******************************************
   * 9. Crack the Code
   *******************************************/
  // ... (Sección de "Crack the Code" - sin cambios, con emoticonos futuristas)

  /*******************************************
   * 10. Memory AI Cards
   *******************************************/
  // ... (Sección de "Memory AI Cards" - sin cambios)

  /*******************************************
   * 11. Sopa de Letras AI
   *******************************************/
  // ... (Sección de "Sopa de Letras AI" - sin cambios)

  /*******************************************
   * 12. Navegación suave al hacer clic en anclas
   *******************************************/
  document.querySelectorAll('#futuristic-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  /*******************************************
   * 13. Toggle Dropdown para "Juegos"
   *******************************************/
  const juegosBtn = document.getElementById("menu-juegos");
  const dropdown = document.getElementById("menu-juegos-dropdown");

  juegosBtn.addEventListener("click", function(e) {
    e.preventDefault();
    dropdown.classList.toggle("show");
  });
});

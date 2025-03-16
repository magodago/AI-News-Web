document.addEventListener("DOMContentLoaded", () => {
  /* MATRIX BAR ANIMATION */
  function iniciarMatrix() {
    const bar = document.getElementById("matrix-bar");
    bar.innerHTML = "MATRIX DATA LOADING...";
  }
  iniciarMatrix();

  /* EFECTO TYPING "FOLLOW THE WHITE RABBIT..." */
  const typingText = document.getElementById("typing-text");
  const phrase = "Follow the white rabbit...";
  let idx = 0;
  function typePhrase() {
    if (typingText) typingText.textContent = phrase.substring(0, idx);
    idx++;
    if (idx > phrase.length) {
      setTimeout(() => {
        idx = 0;
        typingText.textContent = "";
        typePhrase();
      }, 1500);
    } else {
      setTimeout(typePhrase, 100);
    }
  }
  typePhrase();

  /* NOTICIAS CON API */
  const apiKey = 'api_live_QjyerYEi61p2aHyQldFOwQiYX3sXvuk9k8QTF8lz6ZbMbRFJ9Ov';
  async function fetchNews() {
    try {
      const response = await fetch(`https://api.apitube.io/v1/news?apiKey=${apiKey}&language=es`);
      const data = await response.json();
      displayNews(data.articles);
    } catch (error) {
      console.error('Error obteniendo noticias:', error);
    }
  }
  function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");
    if (!newsContainer) return;
    newsContainer.innerHTML = "";
    articles.slice(0, 6).forEach(article => {
      const newsBox = document.createElement("div");
      newsBox.className = "news-box";
      newsBox.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description || "Descripción no disponible."}</p>
        <a href="${article.url}" target="_blank">Leer más</a>
      `;
      newsContainer.appendChild(newsBox);
    });
  }
  fetchNews();
  setInterval(fetchNews, 1800000);

  /* JUEGO TIC-TAC-TOE */
  const tictactoeBoard = document.getElementById("tictactoe-board");
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  function renderBoard() {
    tictactoeBoard.innerHTML = "";
    board.forEach((cell, i) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("tictactoe-cell");
      cellDiv.textContent = cell;
      cellDiv.addEventListener("click", () => makeMove(i));
      tictactoeBoard.appendChild(cellDiv);
    });
  }
  function makeMove(index) {
    if (board[index] === "") {
      board[index] = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      renderBoard();
    }
  }
  renderBoard();

  /* RANKING PAÍSES */
  function mostrarPaisesInversion() {
    const countriesData = [
      { name: "USA", investment: 90 },
      { name: "China", investment: 85 },
      { name: "Alemania", investment: 70 },
      { name: "Reino Unido", investment: 65 },
      { name: "Japón", investment: 60 }
    ];
    const countriesContainer = document.getElementById("countries-container");
    if (!countriesContainer) return;
    countriesContainer.innerHTML = "";
    countriesData.forEach(p => {
      const countryDiv = document.createElement("div");
      countryDiv.classList.add("country-bar");
      countryDiv.innerHTML = `
        <div class="country-fill" style="width: ${p.investment}%;">
          ${p.name}: ${p.investment}%
        </div>
      `;
      countriesContainer.appendChild(countryDiv);
    });
  }
  mostrarPaisesInversion();
});


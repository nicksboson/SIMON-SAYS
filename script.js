let gameSeq = [];
let userSeq = [];
let btnColors = ["bt1", "bt2", "bt3", "bt4"];
let started = false;
let level = 0;

const heading = document.querySelector("h1");
const startBtn = document.getElementById("startBtn");
const rulesBtn = document.getElementById("rulesBtn");
const rulesModal = document.getElementById("rulesModal");
const gameOverModal = document.getElementById("gameOverModal");
const finalScore = document.getElementById("finalScore");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const closeBtn = document.querySelector(".close-btn");

// Function to start the game
function startGame() {
  if (!started) {
    started = true;
    startBtn.disabled = true;
    startBtn.textContent = "Game in Progress";
    levelUp();
  }
}

// Modal functionality
rulesBtn.addEventListener("click", () => {
  rulesModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  rulesModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === rulesModal) {
    rulesModal.style.display = "none";
  }
});

// Try Again button functionality
tryAgainBtn.addEventListener("click", () => {
  gameOverModal.style.display = "none";
  startBtn.disabled = false;
  startBtn.textContent = "Start Game";
  restartGame();
});

// Add event listener for start button
startBtn.addEventListener("click", startGame);

function levelUp() {
  userSeq = [];
  level++;
  heading.innerText = `Simon Says - Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randBtnId = btnColors[randIdx];
  let btnEl = document.querySelector(`.${randBtnId}`);

  flashButton(btnEl);
  gameSeq.push(randBtnId);
}

function flashButton(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 300);
}

function btnPressed() {
  let btn = this;
  userFlash(btn);
  let userChosen = btn.getAttribute("id");
  userSeq.push(userChosen);
  checkAnswer(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", btnPressed);
  btn.addEventListener("touchstart", function(e) {
    e.preventDefault(); // Prevent default touch behavior
    btnPressed.call(this);
  });
});

function checkAnswer(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    heading.innerText = "Simon Says";
    finalScore.textContent = level;
    gameOverModal.style.display = "block";
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "#0e0e52";
    }, 1000);
    restartGame();
  }
}

function restartGame() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  started = false;
}

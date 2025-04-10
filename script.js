let gameSeq = [];
let userSeq = [];
let btnColors = ["bt1", "bt2", "bt3", "bt4"];
let started = false;
let level = 0;

const heading = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  heading.innerText = `Level ${level}`;

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
});

function checkAnswer(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    heading.innerText = `GAME OVER!! Your Score: ${level} — Press any key to restart.`;
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

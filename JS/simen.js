let gameSeq = [];
let userSeq = [];

let started = false;
let lev = 0;

let btns = ["red", "blue", "green", "yellow"];
let level = document.querySelector("#level");

function checkAns(idx) {
  //   console.log(current level ${lev});

  if (gameSeq[idx] === userSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    // console.log("Game Over! Please Start the new Game");
    level.innerText = `Game Over! Your score is ${lev} please Start the new Game `;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 2000);
    reset();
  }
}

function levelup() {
  userSeq = [];
  lev++;
  level.innerText = ` Level ${lev}`;

  let randIndx = Math.floor(Math.random() * 4);
  let randColor = btns[randIndx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  // console.log(`Game seq ${gameSeq}`);
  gameFlash(randBtn);
}
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 100);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 100);
}

function btnPress() {
  //   console.log(this);
  let btn = this;
  let userColor = btn.getAttribute("id");
  if (!started) {
    started = true;
    gameSeq.push(userColor);
    userSeq = [];
    lev = 1;
    level.innerText = `Level ${lev}`;
    gameFlash(btn);
    return;
  }
  userSeq.push(userColor);
  // console.log(`User seq ${userSeq}`);
  userFlash(btn);

  checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  lev = 0;
}

//making the modal(rule of the game) to display
const modalBtn = document.querySelector(".btn");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector("#modal-close-btn");
function modalToggle() {
  modalBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });
  modalCloseBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}
modalToggle();

//getting elements for the game
const getEachIcon = Array.from(document.querySelectorAll(".icon-symbol-wrap"));
const iconsWrap = document.querySelector(".icon-wrap");
const compSelectionWrap = document.querySelector(".computer-selection");
const playerSelectionWrap = document.querySelector(".player-selection");
const iconShowAfterSelect = document.querySelector(".game-show-selection");
const winLoseTextElem = document.querySelector(".win");
const replay = document.querySelector(".replay");
let scoreElement = document.querySelector(".score");
let playerComPickedText = document.querySelector(".playerComPicked");

//variables for processing game
let iconState = false;
let playerSelection;
let anySelected = [];
let compSelection;
let WinText;
let score = 0;

// getting computer selection
function compSelectedIcon() {
  let iconsLength = getEachIcon.length;
  compSelection =
    getEachIcon[Math.floor(Math.random() * iconsLength)].dataset.player;
  return compSelection;
}

function game() {
  getEachIcon.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      //getting player selection
      playerSelection = e.currentTarget.dataset.player;

      console.log(playerSelection);

      compSelection = compSelectedIcon();

      console.log(compSelection);
      displayItems();
      determineWinner();
    });
  });
}
let playerImage = document.createElement("img");
let playerImageWrap = document.createElement("div");
let compImage = document.createElement("img");
let compImageWrap = document.createElement("div");
function displayItems() {
  playerImageWrap.classList.add("image-wrap");
  playerImage.classList.add(`icon-${playerSelection}`);
  playerImage.src = `./images/icon-${playerSelection}.svg`;
  compImageWrap.classList.add("image-wrap");
  compImage.classList.add(`icon-${compSelection}`);
  compImage.src = `./images/icon-${compSelection}.svg`;
  playerSelectionWrap.classList.add(playerSelection, "icon-symbol-wrap");
  playerSelectionWrap.appendChild(playerImageWrap);
  playerImageWrap.appendChild(playerImage);
  compSelectionWrap.classList.add(compSelection, "icon-symbol-wrap");
  compSelectionWrap.appendChild(compImageWrap);
  compImageWrap.appendChild(compImage);

  iconsWrap.style.display = "none";
  iconShowAfterSelect.style.display = "flex";
  playerComPickedText.style.display = "flex";
}
function determineWinner() {
  if (playerSelection === "paper") {
    if (compSelection === "rock") {
      WinText = "YOU WIN";
    } else if (compSelection === "scissors") {
      WinText = " YOU LOSE";
    } else {
      WinText = "DRAW GAME";
    }
  } else if (playerSelection === "scissors") {
    if (compSelection === "paper") {
      WinText = "YOU WIN";
    } else if (compSelection === "rock") {
      WinText = "YOU LOSE";
    } else {
      WinText = "DRAW GAME";
    }
  } else if (playerSelection === "rock") {
    if (compSelection === "scissors") {
      WinText = "YOU WIN";
    } else if (compSelection === "paper") {
      WinText = "YOU LOSE";
    } else {
      WinText = "DRAW GAME";
    }
  }
  switch (WinText.toLowerCase()) {
    case "you win":
      score++;
      break;
    case "you lose":
      score--;
      break;
    case "draw game":
      score = score;
  }
  scoreElement.textContent = score;
  winLoseTextElem.textContent = `${WinText}`;
}
function replayGame() {
  iconsWrap.style.display = "block";
  iconShowAfterSelect.style.display = "none";
  playerComPickedText.style.display = "none";
  playerSelectionWrap.classList.remove(playerSelection);
  compSelectionWrap.classList.remove(compSelection);
  compSelection = "";
  playerSelection = "";
}
replay.addEventListener("click", replayGame);

game();

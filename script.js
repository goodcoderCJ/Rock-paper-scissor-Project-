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
const beforeMainComp = document.querySelector(".computer-container");

//variables for processing game
let iconState = false;
let playerSelection;
let compSelection;
let WinText;
let score = 0;

let playerCount = 0;
let computerCount = 0;

// getting computer selection
function compSelectedIcon() {
  let iconsLength = getEachIcon.length;
  compSelection =
    getEachIcon[Math.floor(Math.random() * iconsLength)].dataset.player;
  return compSelection;
}

function getResult(e) {
  //getting player selection
  playerSelection = e.currentTarget.dataset.player;
  iconState = true;

  console.log(playerSelection);

  compSelection = compSelectedIcon();

  console.log(compSelection);
  displayItems();
}
//variables for showing selected item
let playerImage = document.createElement("img");
let playerImageWrap = document.createElement("div");
let compImage = document.createElement("img");
let compImageWrap = document.createElement("div");

// displayGameOver message element

let newGameOverElement = document.createElement("div");
newGameOverElement.classList.add("newElementWrap");
let newElement = document.createElement("div");
newElement.classList.add("new-element");
//show selected item function
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
  beforeMainComp.style.display = "flex";
  compSelectionWrap.style.display = "none";
  iconShowAfterSelect.style.display = "flex";
  playerComPickedText.style.display = "flex";
  let gameFeedback = document.querySelector(".game-feedback");
  gameFeedback.style.display = "none";
  setTimeout(() => {
    compSelectionWrap.style.display = "flex";
    beforeMainComp.style.display = "none";
    gameFeedback.style.display = "block";
    let exactWinner = determineWinner;
    exactWinner();
  }, 3000);
}

//variables for circle animation
const firstCircle = document.querySelector(".first-circle");
const secondCircle = document.querySelector(".second-circle");
const thirdCircle = document.querySelector(".third-circle");
const animateContainer = document.querySelector(".animate");
let winningSound = new Audio(
  "./audio/mixkit-huge-crowd-cheering-victory-462.wav"
);
// function to determine winner
function determineWinner() {
  if (playerSelection === "paper") {
    if (compSelection === "rock") {
      WinText = "YOU WIN";
    } else if (compSelection === "scissors") {
      WinText = "YOU LOSE";
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
  function interval() {
    setInterval(() => {
      firstCircle.style.transform = `scale(1)`;
      secondCircle.style.transform = `scale(1.2)`;
      thirdCircle.style.transform = `scale(1.5)`;
      setInterval(() => {
        firstCircle.style.transform = `scale(1.2)`;
        secondCircle.style.transform = `scale(1.5)`;
        thirdCircle.style.transform = `scale(1.7)`;
      }, 1000);
    }, 2000);
  }
  switch (WinText.toLowerCase()) {
    case "you win":
      score++;
      winningSound.play();
      animateContainer.style.display = "block";
      interval();
      break;
    case "you lose":
      score--;
      animateContainer.style.display = "none";
      clearInterval(interval);
      break;
    case "draw game":
      score = score;
      animateContainer.style.display = "none";
      clearInterval(interval);
  }

  scoreElement.textContent = score;
  winLoseTextElem.textContent = `${WinText}`;
  WinText.toLowerCase() === "you win"
    ? playerCount++
    : WinText.toLowerCase() === "you lose"
    ? computerCount++
    : (playerCount = playerCount),
    (computerCount = computerCount);
  console.log(playerCount);
  console.log(computerCount);
  if (playerCount === 5 || computerCount === 5) {
    let resultEnclose = document.querySelector(".result-enclose");

    newElement.textContent = `Game Over, You scored ${score} point${
      score !== 1 ? "s" : ""
    }`;
    newElement.appendChild(newGameOverElement);
    resultEnclose.insertAdjacentElement("afterend", newElement);
    newElement.style.display = "flex";
    let gameFeedback = document.querySelector(".game-feedback");
    gameFeedback.style.bottom = "-0.3em";
  }
}
function replayGame() {
  if (winningSound.play()) {
    winningSound.pause();
  } else {
    winningSound.pause();
  }
  animateContainer.style.display = "none";
  iconsWrap.style.display = "block";
  iconShowAfterSelect.style.display = "none";
  playerComPickedText.style.display = "none";
  playerSelectionWrap.classList.remove(playerSelection);
  compSelectionWrap.classList.remove(compSelection);
  compSelection = "";
  playerSelection = "";
  if (playerCount === 5 || computerCount === 5) {
    newElement.style.display = "none";
    score = 0;
    playerCount = 0;
    computerCount = 0;
  }
}

getEachIcon.forEach((icon) => {
  icon.addEventListener("click", getResult);
});

replay.addEventListener("click", replayGame);

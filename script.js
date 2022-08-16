// Case: generate rock,paper, scissor items randomly for the computer partner to play with.
function computerPlay(){
var items=['rock', 'paper', 'scissors'];
 var item= items[Math.floor(Math.random()*items*length)];

}

 function computerPlay(){
     let items=['rock', 'paper', 'scissors'];
     return items[Math.floor(Math.random()* items.length)];
 }
    
    let computerSelection = computerPlay();
   let playerSelection =  prompt("please type in 'rock' 'paper' or 'scissors'");

   function roundPlay(computerSelection, playerSelection){
       if(computerSelection==playerSelection){
           console.log("Selection is same");
    }else if(computerSelection == 'rock' && playerSelection == 'scissors'){
       console.log("Computer won: rock beats scissors");
   }else if(computerSelection == 'paper' && playerSelection == 'scissors'){
       console.log("Player won: scissors beats paper");
  }else if(computerSelection == 'scissors' && playerSelection == 'paper'){
    console.log("Computer won: scissors beats paper");
 }else if(playerSelection == 'rock' && computerSelection == 'paper'){
      console.log("Computer won: rock beats paper");
  }else if(playerSelection == 'scissors' && computerSelection == 'paper'){
    console.log("Player won: scissors beats paper");
 }else if(playerSelection == 'rock' && computerSelection == "scissors"){
    console.log("Player won: rock beats scissors");
 }
 }

 const game = function(){
    for(let i = 0; i < 5; i++ ){
        console.log(roundPlay(computerSelection, playerSelection));
   }
}
 game();

const btn = document.querySelector(".btn");
const modal = document.querySelector(".modal");
const closeBtn =document.querySelector("#modal-close-btn");

window.addEventListener("click",function(e){
  if(e.target === modal){
    modal.style.display ="none";
  }
 })

btn.addEventListener("click",function(){
  modal.style.display ="block";
})
closeBtn.addEventListener("click",function() {
  modal.style.display ="none";
})


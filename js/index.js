'use strict';

/*referencje do HTML*/

var paperButton = document.getElementById('paper-button');
var stoneButton = document.getElementById('stone-button');
var scissorButton = document.getElementById('sciss-button');

var output = document.getElementById('output');
var newGameBtn = document.getElementById('newgame-button');

/*przypisanie przycisków */

paperButton.addEventListener('click', function() {
  playerMove('paper');
});

stoneButton.addEventListener('click', function() {
  playerMove('stone');
});

scissorButton.addEventListener('click', function() {
  playerMove('sccisors');
});

/* zmienne globalne */

var player = { score: 0, choice: '' }
var computer = { score: 0, choice: '' }
var roundResult = ''
var rounds = 0
var presentRound = 0
var gameStatus = 0

/*funkcja przycisku START*/

newGameBtn.addEventListener('click' , function(){
  player.choice = ''
  computer.choice = ''
  player.score = 0
  computer.score = 0
  gameLimits();
});

/*Funkcja zapytania o liczbę rund*/

function gameLimits(){
  rounds = window.prompt('Ile rund chciałbyś zagrać?');
  if(!rounds || isNaN(rounds)) displayRoundError();
  else {
    rounds = parseInt(rounds)
    displayRound()
    gameStatus = 1
   }
};

/*Funkcja Losowanie*/

function randComputerMove () {
  var choices = ['paper','stone','scissors']
  return choices[Math.floor(Math.random() * 3)];
};

/*Funkcja playerMove*/

function playerMove (playerChoice) {
  if(gameStatus === 1) {
    presentRound++;
    player.choice = playerChoice
    computer.choice = randComputerMove()
    checkRoundWinner()
    renderOutput()
    checkEndGame()
  }
};

/* Funkcja sprawdzenia kto wygrał */

function checkRoundWinner() {
  if(player.choice === computer.choice) { roundResult = 'Remis' }
  else if((player.choice === "paper" && computer.choice === "stone") || 
          (player.choice === "scissors" && computer.choice === "paper") || 
          (player.choice === "stone" && computer.choice === "scissors")) {
           player.score++;
           roundResult = 'Zwycięstwo'
  } else {
    computer.score++
    roundResult = 'Przegrana'
  }
}

/* funckja wypisująca wyniki */

function renderOutput () {
  output.innerHTML = roundResult + ", " + player.score + ":" + computer.score;
}

/*funkcja wyświetlająca rundy*/

function displayRound () {
  output.innerHTML = '<br> Wygraj ' + rounds + ' razy aby zakończyć grę!'; 
}

/* funkcja wyświetlająca błąd w przypisaniu ilości rund */

function displayRoundError () {
  output.innerHTML = 'Proszę wpisać prawidłową liczbę rund';
}

/* funkcja sprawdzająca koniec gry */

function checkEndGame () {
  if(presentRound === rounds) {
    gameStatus = 0
    if(player.score > computer.score) output.innerHTML = 'Wygrałeś!'
    else if(player.score < computer.score) output.innerHTML = 'Przegrałeś!'
    else output.innerHTML = 'Remis'
  }
}
// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let equationsArray = [];
let questionAmount = 0;

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];



// Display Game
function showGame() {
  gamePage.hidden = false;
  countdownPage.hidden = true;
}

function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

// Create Correct/Incorrect Random Equations
function createEquations() {

  const correctEquations = getRandomInt(questionAmount);
  console.log('Correct equations: ',correctEquations);

  const wrongEquations = questionAmount - correctEquations;
  console.log('Wrong equations: ', wrongEquations);

  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }

  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomInt(3);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray);
  
}

function equationsToDOM() {
  equationsArray.forEach((equation) => {
    const item = document.createElement('div');
    item.classList.add('item');
    //equation text
    const equationText = document.createElement('h1');
    equationText.textContent = equation.value;
    // append equation to container
    item.appendChild(equationText);
    itemContainer.appendChild(item);

  });
}

function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
    createEquations();
    equationsToDOM();
  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}



function countdownStart(){
  countdown.textContent = "3";
  setTimeout( () => {
    countdown.textContent = "2";
  }, 1000);
  setTimeout( () => {
    countdown.textContent = "1";
  }, 2000);
  setTimeout( () => {
    countdown.textContent = "GO";
  }, 3000);
}

// switch pages from splash to countdown
function showCountdown(){
  countdownPage.hidden = false;
  splashPage.hidden = true;
  countdownStart();
  populateGamePage();
  setTimeout(showGame, 400);

}


// Get value from selected radio button
function getRadioValue(){
  let radioValue;
  radioInputs.forEach((radioInput)=>{
      if(radioInput.checked){
        radioValue = radioInput.value;
      }
  });
  return radioValue;
}

//Form to choose Questions Amount
function selectQuesionAmount(e){
  e.preventDefault();
  questionAmount = getRadioValue();
  console.log('question amount:', questionAmount);
  if(questionAmount){
    showCountdown();
  }
}

// Event Listeners

startForm.addEventListener('click',() => {
  radioContainers.forEach((radioEl)=> {
    radioEl.classList.remove('selected-label');
    if(radioEl.children[1].checked){
      radioEl.classList.add('selected-label');
    }
  });
});

startForm.addEventListener('submit', selectQuesionAmount);
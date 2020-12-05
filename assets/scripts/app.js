////////// timer //////////

////////// getting DOM elements

const secondSpan = document.querySelector('#second');
const minuteSpan = document.querySelector('#minute');
const progressTimeBar = document.getElementById('progress-time-bar');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');

////////// initializing global variables & constants
let isTimerRunning = false;
let intervalId;
let secondNumber = 0;
let minuteNumber = 0;
let hourNumber = 0;
let enteredDuration = null;

////////// starting timer

class AddEventToStartButton {
  constructor() {
    startButton.addEventListener('click', this.startTimer);
  }

  startTimer() {
    if (!enteredDuration) {
      return;
    }
    isTimerRunning = true;
    minuteNumber = enteredDuration;
    secondNumber = 60;
    minuteNumber--;
    intervalId = setInterval(() => {
      secondNumber--;
      if (secondNumber === 0  && minuteNumber !== 0) {
        secondNumber = 59;
        minuteNumber--;
      }
      secondSpan.textContent = ('0' + secondNumber).slice(-2);
      minuteSpan.textContent = minuteNumber;
      const barPersentage = parseInt((minuteNumber * 60 + secondNumber) / enteredDuration / 60 * 100);
      console.log(secondNumber);
      progressTimeBar.style.width = `${barPersentage}%`;
      if (secondNumber === 0 && minuteNumber === 0 ) {
        clearInterval(intervalId);
        secondNumber = 0;
        minuteNumber = 0;
        secondSpan.textContent = ('0' + secondNumber).slice(-2);
        minuteSpan.textContent = ('0' + minuteNumber).slice(-2);
        progressTimeBar.style.width = '100%';
      }
    }, 1000);
  }
}

////////// reseting timer

class AddEventToResetButton {
  constructor() {
    resetButton.addEventListener('click', this.resetTimer);
  }

  resetTimer() {
    clearInterval(intervalId);
    secondNumber = 0;
    minuteNumber = 0;
    secondSpan.textContent = ('0' + secondNumber).slice(-2);
    minuteSpan.textContent = ('0' + minuteNumber).slice(-2);
    progressTimeBar.style.width = '100%';
  }
}

////////// adding eventlistener to some DOM elements

class AddEventToOtherElements {
  constructor() {
    this.addEventToTitle();
    this.addEventToTimerBody();
  }

  addEventToTitle() {
    this.titleBox = document.getElementById('title-box');
    this.title = this.titleBox.querySelector('h3');
    this.titleBox.addEventListener('click', () => {
      const enteredTitle = prompt('やる種類を入力');
      this.title.textContent = enteredTitle;
    });
  }

  addEventToTimerBody() {
    this.timerBody = document.querySelector('.timer-body');
    this.timerBody.addEventListener('click', () => {
      enteredDuration = parseInt(prompt('何分やる'));
      minuteSpan.textContent = ('0' + enteredDuration).slice(-2);
    })
  }
}

new AddEventToStartButton();
new AddEventToResetButton();
new AddEventToOtherElements();

////////// timer //////////

////////// getting DOM elements

const secondSpan = document.querySelector('#second');
const minuteSpan = document.querySelector('#minute');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const progressChart = document.getElementById('timer-chart');

////////// initializing global variables & constants
let intervalId;
let secondNumber = 0;
let minuteNumber = 0;
let hourNumber = 0;
let enteredDuration = 3;

////////// starting timer

class AddEventToStartButton {
  constructor() {
    startButton.addEventListener('click', this.startTimer);
  }

  startTimer() {
    if (!enteredDuration) {
      return;
    }
    let progressChart = new EasyPieChart(document.getElementById('timer-chart'), {
      barColor: '#9c27b0',
      scaleColor: false,
      trackColor: 'rgba(0, 0, 0, 0)',
      lineWidth: 5,
      size: 350,
    });
    minuteNumber = enteredDuration;
    secondNumber = 60;
    minuteNumber--;
    intervalId = setInterval(() => {
      secondNumber--;
      if (secondNumber === 0 && minuteNumber !== 0) {
        secondNumber = 59;
        minuteNumber--;
      }
      secondSpan.textContent = ('0' + secondNumber).slice(-2);
      minuteSpan.textContent = minuteNumber;
      const barPersentage = (minuteNumber * 60 + secondNumber) / enteredDuration / 60 * 100;
      progressChart.update(barPersentage);
      if (secondNumber === 0 && minuteNumber === 0) {
        clearInterval(intervalId);
        secondNumber = 0;
        minuteNumber = 0;
        secondSpan.textContent = ('0' + secondNumber).slice(-2);
        minuteSpan.textContent = ('0' + minuteNumber).slice(-2);
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
    location.reload();
  }
}

////////// adding eventlistener to some DOM elements

class AddEventToOtherElements {
  constructor() {
    this.addEventToTimerBody();
  }

  addEventToTimerBody() {
    this.timerBody = document.querySelector('.timer-body');
    this.timerBody.addEventListener('click', () => {
      enteredDuration = parseInt(prompt('何分やる'));
      if (isNaN(enteredDuration)) {
        alert('取り消しました');
        return;
      }
      minuteSpan.textContent = ('0' + enteredDuration).slice(-2);
    });
  }
}


new AddEventToStartButton();
new AddEventToResetButton();
new AddEventToOtherElements();

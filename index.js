
let sessionLength = 25;
let breakLength = 5; 
let isSessionRunning = false;
let isBreakRunning = false;
let isPaused = false;
let timeLeft = sessionLength * 60;

function updateTimerDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  document.getElementById('time-left').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startStopTimer() {
  if (!isSessionRunning && !isBreakRunning) {
    isSessionRunning = true;
    isPaused = false;
    runTimer();
  } else if (isPaused) {
    isPaused = false;
    runTimer();
  } else {
    isPaused = true;
  }
}

function runTimer() {
  let timer = setInterval(function() {
    if (!isPaused) {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timer);
        if (isSessionRunning) {
          isSessionRunning = false;
          timeLeft = breakLength * 60;
          document.getElementById('timer-label').innerText = 'Ruptura';
          runTimer();
        } else {
          isBreakRunning = false;
          timeLeft = sessionLength * 60;
          document.getElementById('timer-label').innerText = 'Sesión';
          runTimer();
        }
      }
    }
  }, 1500);
}

document.getElementById('start_stop').addEventListener('click', startStopTimer);

document.getElementById('reset').addEventListener('click', function() {
  clearInterval(timer);
  isSessionRunning = false;
  isBreakRunning = false;
  isPaused = false;
  sessionLength = 25;
  breakLength = 5;
  timeLeft = sessionLength * 60;
  document.getElementById('break-length').innerText = breakLength;
  document.getElementById('session-length').innerText = sessionLength;
  document.getElementById('timer-label').innerText = 'Sesión';
  updateTimerDisplay();
});

document.getElementById('break-decrement').addEventListener('click', function() {
  if (breakLength > 1) {
    breakLength--;
    document.getElementById('break-length').innerText = breakLength;
  }
});

document.getElementById('break-increment').addEventListener('click', function() {
  if (breakLength < 60) {
    breakLength++;
    document.getElementById('break-length').innerText = breakLength;
  }
});

document.getElementById('session-decrement').addEventListener('click', function() {
  if (sessionLength > 1) {
    sessionLength--;
    document.getElementById('session-length').innerText = sessionLength;
    if (!isSessionRunning && !isBreakRunning) {
      let minutes = sessionLength.toString().padStart(2, '0');
      document.getElementById('time-left').innerText = `${minutes}:00`;
    }
  }
});

document.getElementById('session-increment').addEventListener('click', function() {
  if (sessionLength < 60) {
    sessionLength++;
    document.getElementById('session-length').innerText = sessionLength;
    if (!isSessionRunning && !isBreakRunning) {
      let minutes = sessionLength.toString().padStart(2, '0');
      document.getElementById('time-left').innerText = `${minutes}:00`;
    }
}});

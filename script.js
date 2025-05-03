// CLOCK FUNCTIONALITY
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let ampm = "AM";
  
    if (hours >= 12) {
      ampm = "PM";
      hours = hours % 12 || 12;
    }
  
    document.getElementById("hour").textContent = String(hours).padStart(2, "0");
    document.getElementById("min").textContent = String(now.getMinutes()).padStart(2, "0");
    document.getElementById("sec").textContent = String(now.getSeconds()).padStart(2, "0");
    document.getElementById("ampm").textContent = ampm;
    document.getElementById("other-ampm").textContent = ampm === "AM" ? "PM" : "AM";
  }
  setInterval(updateClock, 1000);
  updateClock();
  
  // VIEW TOGGLE
  const clockSection = document.querySelector(".clock");
  const stopwatchSection = document.querySelector(".stopwatch");
  const timerSection = document.querySelector(".timer");
  
  // SOUNDS
  const tickSound = new Audio("sound/wink sound.mp3");
  const clickSound = new Audio("sound/wink sound.mp3");
  const successSound = new Audio("sound/wink sound.mp3");
  
  tickSound.volume = 0.2;
  clickSound.volume = 0.3;
  successSound.volume = 0.5;
  
  document.getElementById("stopwatch-btn").onclick = () => {
    clickSound.play();
    clockSection.classList.add("hidden");
    stopwatchSection.classList.remove("hidden");
  };
  
  document.getElementById("timer-btn").onclick = () => {
    clickSound.play();
    clockSection.classList.add("hidden");
    timerSection.classList.remove("hidden");
  };
  
  document.querySelectorAll(".back-btn").forEach(btn => {
    btn.onclick = () => {
      clickSound.play();
      stopwatchSection.classList.add("hidden");
      timerSection.classList.add("hidden");
      clockSection.classList.remove("hidden");
    };
  });
  
  // STOPWATCH FUNCTIONALITY
  let stopwatchInterval;
  let swMs = 0, swSec = 0, swMin = 0, swHour = 0;
  
  function updateStopwatch() {
    swMs++;
    if (swMs >= 100) {
      swMs = 0;
      swSec++;
    }
    if (swSec >= 60) {
      swSec = 0;
      swMin++;
    }
    if (swMin >= 60) {
      swMin = 0;
      swHour++;
    }
  
    document.getElementById("stopwatch-hour").textContent = String(swHour).padStart(2, '0');
    document.getElementById("stopwatch-min").textContent = String(swMin).padStart(2, '0');
    document.getElementById("stopwatch-sec").textContent = String(swSec).padStart(2, '0');
    document.getElementById("stopwatch-ms").textContent = String(swMs).padStart(2, '0');
  }
  
  document.querySelector(".start-stopwatch").onclick = function () {
    clickSound.play();
    if (!stopwatchInterval) {
      stopwatchInterval = setInterval(updateStopwatch, 10);
      this.textContent = "Pause";
      document.querySelector(".lap-stopwatch").classList.remove("hidden");
    } else {
      clearInterval(stopwatchInterval);
      stopwatchInterval = null;
      this.textContent = "Start";
    }
  };
  
  document.querySelector(".lap-stopwatch").onclick = function () {
    clickSound.play();
    const lap = document.createElement("div");
    lap.className = "lap active";
    lap.innerHTML = `<p>Lap</p><p>${String(swHour).padStart(2, '0')}:${String(swMin).padStart(2, '0')}:${String(swSec).padStart(2, '0')}:${String(swMs).padStart(2, '0')}</p>`;
    document.querySelector(".laps").prepend(lap);
  };
  
  document.querySelector(".reset-stopwatch").onclick = function () {
    clickSound.play();
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    swMs = swSec = swMin = swHour = 0;
    document.querySelector(".start-stopwatch").textContent = "Start";
    document.getElementById("stopwatch-hour").textContent = "00";
    document.getElementById("stopwatch-min").textContent = "00";
    document.getElementById("stopwatch-sec").textContent = "00";
    document.getElementById("stopwatch-ms").textContent = "00";
    document.querySelector(".lap-stopwatch").classList.add("hidden");
    document.querySelector(".laps").innerHTML = "";
  };
  
  // TIMER FUNCTIONALITY
  let timerInterval;
  let tMs = 0, tSec = 0, tMin = 0, tHour = 0;
  
  function updateTimer() {
    if (tMs === 0 && tSec === 0 && tMin === 0 && tHour === 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      successSound.play();
      alert("⏰ Timer finished!");
      return;
    }
  
    if (tMs === 0) {
      tMs = 99;
      if (tSec === 0) {
        tSec = 59;
        if (tMin === 0) {
          tMin = 59;
          tHour--;
        } else {
          tMin--;
        }
      } else {
        tSec--;
      }
    } else {
      tMs--;
    }
  
    document.getElementById("timer-hour").textContent = String(tHour).padStart(2, '0');
    document.getElementById("timer-min").textContent = String(tMin).padStart(2, '0');
    document.getElementById("timer-sec").textContent = String(tSec).padStart(2, '0');
    document.getElementById("timer-ms").textContent = String(tMs).padStart(2, '0');
  }
  
  document.querySelector(".start-timer").onclick = function () {
    clickSound.play();
    let input = prompt("Enter time in format HH:MM:SS (e.g., 01:02:03)");
    if (input) {
      let [h, m, s] = input.split(":").map(Number);
      tHour = h || 0;
      tMin = m || 0;
      tSec = s || 0;
      tMs = 0;
  
      document.getElementById("timer-hour").textContent = String(tHour).padStart(2, '0');
      document.getElementById("timer-min").textContent = String(tMin).padStart(2, '0');
      document.getElementById("timer-sec").textContent = String(tSec).padStart(2, '0');
      document.getElementById("timer-ms").textContent = "00";
  
      if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 10);
        document.querySelector(".stop-timer").classList.remove("hidden");
        this.classList.add("hidden");
      }
    }
  };
  
  document.querySelector(".stop-timer").onclick = function () {
    clickSound.play();
    clearInterval(timerInterval);
    timerInterval = null;
    this.classList.add("hidden");
    document.querySelector(".start-timer").classList.remove("hidden");
  };
  
  document.querySelector(".reset-timer").onclick = function () {
    clickSound.play();
    clearInterval(timerInterval);
    timerInterval = null;
    tMs = tSec = tMin = tHour = 0;
    document.getElementById("timer-hour").textContent = "00";
    document.getElementById("timer-min").textContent = "00";
    document.getElementById("timer-sec").textContent = "00";
    document.getElementById("timer-ms").textContent = "00";
    document.querySelector(".stop-timer").classList.add("hidden");
    document.querySelector(".start-timer").classList.remove("hidden");
  };
  
  // THEME TOGGLE
  const themeToggle = document.getElementById("theme-toggle");
  
  themeToggle.onclick = () => {
    clickSound.play();
    document.body.classList.toggle("night");
    themeToggle.textContent = document.body.classList.contains("night")
      ? "Switch to Day 🌞"
      : "Switch to Night 🌙";
  };
  
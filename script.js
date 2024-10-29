// script.js

let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let timerInterval;
const display = document.getElementById("time-display");
const startPauseBtn = document.getElementById("start-pause-btn");
const lapBtn = document.getElementById("lap-btn");
const resetBtn = document.getElementById("reset-btn");
const lapsContainer = document.getElementById("laps");

// Format time to mm:ss:ms
function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);

    return (
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + ":" +
        (milliseconds < 10 ? "0" : "") + milliseconds
    );
}

// Update the display time
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

// Start/Pause the stopwatch
startPauseBtn.addEventListener("click", () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startPauseBtn.textContent = "Pause";
        lapBtn.disabled = false;
        resetBtn.disabled = false;
    } else {
        clearInterval(timerInterval);
        startPauseBtn.textContent = "Start";
    }
    isRunning = !isRunning;
});

// Reset the stopwatch
resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    startPauseBtn.textContent = "Start";
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapsContainer.innerHTML = ""; // Clear laps
    updateDisplay();
});

// Record a lap
lapBtn.addEventListener("click", () => {
    const lapTime = document.createElement("div");
    lapTime.classList.add("lap-time");
    lapTime.textContent = `Lap ${lapsContainer.children.length + 1}: ${formatTime(elapsedTime)}`;
    lapsContainer.appendChild(lapTime);
});

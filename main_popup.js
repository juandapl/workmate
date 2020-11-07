
const remainingWorkTime = document.getElementById('remainingWorkTime')

let timer;

function displayWorkTimeLeft(timeLeft) {
    hours = parseInt(timeLeft / 60, 10);
    minutes = parseInt(timeLeft % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    remainingWorkTime.textContent = hours + ":" + minutes;
}

function timerToDecrementTimeLeft(timeLeft, delay) {
    if (timeLeft > 0) { 
        timer = setTimeout(() => {
            displayWorkTimeLeft(timeLeft)
            timeLeft -= 1;

            timerToDecrementTimeLeft(timeLeft, 1000)
        }, delay)
    }
}

function setRemainingWorkTime(duration) {
    let timeLeft = duration;
    let tickDuration = (duration % 1) * 1000 // grab the seconds part of the duration
    displayWorkTimeLeft(timeLeft)

    clearTimeout(timer)
    timerToDecrementTimeLeft(timeLeft, tickDuration)
}

chrome.runtime.sendMessage({ message: 'GET_REMAINING_TIME' }, 
    remainingTime => {
        if (remainingTime) setRemainingWorkTime(remainingTime)
    }
)

document.getElementById('start_workshift').addEventListener('click', function() {
    chrome.runtime.sendMessage({ message: 'START_TIMER', timerDuration: 90 })
    setRemainingWorkTime(90)
})
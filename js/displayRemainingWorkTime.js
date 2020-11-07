
const remainingWorkTime = document.getElementById('remainingWorkTime')

let timer;

function displayWorkTimeLeft(timeLeft) {
    let hours = parseInt(timeLeft / 60, 10);
    let minutes = parseInt(timeLeft % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    remainingWorkTime.textContent = hours + ":" + minutes;
}

function timerToDecrementTimeLeft(timeLeft, delay) {
    if (timeLeft > 0) { 
        timer = setTimeout(() => {
            displayWorkTimeLeft(timeLeft)
            timeLeft -= 1;

            timerToDecrementTimeLeft(timeLeft, 1000 * 60)
        }, delay)
    }
}

function setRemainingWorkTime(duration) {
    let timeLeft = duration;
    let tickDuration = (duration % 1) * 1000 * 60 // grab the seconds part of the duration
    displayWorkTimeLeft(timeLeft)

    clearTimeout(timer)
    timerToDecrementTimeLeft(timeLeft, tickDuration)
}

export default setRemainingWorkTime;
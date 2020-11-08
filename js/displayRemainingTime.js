
const remainingWorkTime = document.getElementById('remainingWorkTime')
const remainingTimeToBreak = document.getElementById('remainingTimeToBreak')

let workTimeTimer;
let nextBreakTimer;

function getHoursAndMinutes(timeLeft) {
    let hours = parseInt(timeLeft / 60, 10);
    let minutes = parseInt(timeLeft % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return { hours, minutes }
}

function displayWorkTimeLeft(timeLeft) {
    const { hours, minutes } = getHoursAndMinutes(timeLeft)
    remainingWorkTime.textContent = hours + ":" + minutes;
}

function displayTimeLeftToBreak(timeLeft) {
    const { hours, minutes } = getHoursAndMinutes(timeLeft)
    remainingTimeToBreak.textContent = hours + ":" + minutes;
}

// calls a provided function {fnc} with params {time} every minute with an initial delay of {firstTickDelay}
// for duration {time}
// used to update the work/break time left shown to users
function callFunctionOncePerMinuteFor({ fnc, time, firstTickDelay }) {
    if (time > 0) { 
        workTimeTimer = setTimeout(() => {
            fnc(time)
            time -= 1;

            callFunctionOncePerMinuteFor({ fnc, time, firstTickDelay: 1000 * 60 })
        }, firstTickDelay)
    }
}

function displayRemainingWorkTime(duration) {
    let time = duration;
    let firstTickDelay = (duration % 1) * 1000 * 60 // grab the seconds part of the duration
    displayWorkTimeLeft(time)

    clearTimeout(workTimeTimer)
    callFunctionOncePerMinuteFor({ fnc: displayWorkTimeLeft, time, firstTickDelay })
}

function displayRemainingTimeToBreak(duration) {
    let time = duration;
    let firstTickDelay = (duration % 1) * 1000 * 60 // grab the seconds part of the duration
    displayTimeLeftToBreak(time)

    clearTimeout(nextBreakTimer)
    callFunctionOncePerMinuteFor({ fnc: displayTimeLeftToBreak, time, firstTickDelay })
}


export { 
    displayRemainingWorkTime,
    displayRemainingTimeToBreak,
}
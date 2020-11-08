
const remainingWorkTime = document.getElementById('remainingWorkTime')
const remainingTimeToBreak = document.getElementById('remainingTimeToBreak')
const remainingBreakTime = document.getElementById('remainingBreakTime')

let workTimeTimer;
let nextBreakTimer;
let breakTimer;

function getHoursAndMinutes(timeLeft) {
    let hours = parseInt(timeLeft / (60 * 60 * 1000))
    let minutes = Math.ceil((parseInt(timeLeft) % (60 * 60 * 1000)) / (60 * 1000))

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

function displayBreakTimeLeft(timeLeft) {
    const { hours, minutes } = getHoursAndMinutes(timeLeft)
    remainingBreakTime.textContent = hours + ":" + minutes;
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
    if (duration < 0) {
        duration = 0
    }
    let time = duration;
    let firstTickDelay = (duration % (60 * 1000)) // grab the seconds part of the duration
    displayWorkTimeLeft(time)

    clearTimeout(workTimeTimer)
    callFunctionOncePerMinuteFor({ fnc: displayWorkTimeLeft, time, firstTickDelay })
}

function displayRemainingTimeToBreak(duration) {
    if (duration < 0) {
        duration = 0
    }
    let time = duration;
    let firstTickDelay = (duration % (60 * 1000)) // grab the seconds part of the duration
    displayTimeLeftToBreak(time)

    clearTimeout(nextBreakTimer)
    callFunctionOncePerMinuteFor({ fnc: displayTimeLeftToBreak, time, firstTickDelay })
}

function displayRemainingBreakTime(duration) {
    if (duration < 0) {
        duration = 0
    }
    let time = duration;
    let firstTickDelay = (duration % (60 * 1000)) // grab the seconds part of the duration
    displayBreakTimeLeft(time)

    clearTimeout(nextBreakTimer)
    callFunctionOncePerMinuteFor({ fnc: displayBreakTimeLeft, time, firstTickDelay })
}


export { 
    displayRemainingWorkTime,
    displayRemainingTimeToBreak,
    displayRemainingBreakTime,
}
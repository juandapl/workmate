
const remainingWorkTime = document.getElementById('remainingWorkTime')
const remainingTimeToBreak = document.getElementById('remainingTimeToBreak')
const remainingBreakTime = document.getElementById('remainingBreakTime')

let workTimeTimer;
let nextBreakTimer;
let breakTimer;

// alot of duplicated code here... meh

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

// -------------------------

function updateWorkTimeOncePerMinute({ time, firstTickDelay }) {
    if (time > 0) { 
        workTimeTimer = setTimeout(() => {
            displayWorkTimeLeft(time)
            time -= 60 * 1000;

            updateWorkTimeOncePerMinute({ time, firstTickDelay: 1000 * 60 })
        }, firstTickDelay)
    }
}

function updateTimeLeftToBreakOncePerMinute({ time, firstTickDelay }) {
    if (time > 0) { 
        nextBreakTimer = setTimeout(() => {
            displayTimeLeftToBreak(time)
            time -= 60 * 1000;

            updateTimeLeftToBreakOncePerMinute({ time, firstTickDelay: 1000 * 60 })
        }, firstTickDelay)
    }
}

function updateBreakTimeLeftOncePerMinute({ time, firstTickDelay }) {
    if (time > 0) { 
        breakTimer = setTimeout(() => {
            displayBreakTimeLeft(time)
            time -= 60 * 1000;

            updateBreakTimeLeftOncePerMinute({ time, firstTickDelay: 1000 * 60 })
        }, firstTickDelay)
    }
}


// ------------------ 
function displayRemainingWorkTime(duration) {
    if (duration < 0) {
        duration = 0
    }
    let time = duration;
    let firstTickDelay = (duration % (60 * 1000)) // grab the seconds part of the duration
    displayWorkTimeLeft(time)

    clearTimeout(workTimeTimer)
    updateWorkTimeOncePerMinute({ time, firstTickDelay })
}

function displayRemainingTimeToBreak(duration) {
    if (duration < 0) {
        duration = 0
    }
    let time = duration;
    let firstTickDelay = (duration % (60 * 1000)) // grab the seconds part of the duration
    displayTimeLeftToBreak(time)

    clearTimeout(nextBreakTimer)
    updateTimeLeftToBreakOncePerMinute ({ time, firstTickDelay })
}

function displayRemainingBreakTime(duration) {
    if (duration < 0) {
        duration = 0
    }
    let time = duration;
    let firstTickDelay = (duration % (60 * 1000)) // grab the seconds part of the duration
    displayBreakTimeLeft(time)

    clearTimeout(breakTimer)
    updateBreakTimeLeftOncePerMinute({ time, firstTickDelay })
}


export { 
    displayRemainingWorkTime,
    displayRemainingTimeToBreak,
    displayRemainingBreakTime,
}
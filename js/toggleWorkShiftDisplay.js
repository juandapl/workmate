
import { displayRemainingWorkTime, displayRemainingBreakTime, displayRemainingTimeToBreak } from './displayRemainingTime.js'

const newWorkshiftContainer = document.getElementsByClassName('new_workshift')[0]
const workShiftStatusContainer = document.getElementsByClassName('workshift_running')[0]
const breakTimeContainer = document.getElementsByClassName('break_time')[0]

// Default
function displayNewWorkShiftMenu() {
    newWorkshiftContainer.classList.remove('hide')
    workShiftStatusContainer.classList.add('hide')
    breakTimeContainer.classList.add('hide')
}

// State when in a WorkShift
function displayRunningWorkShift({ workTimeLeft, timeLeftToBreak }) {
    newWorkshiftContainer.classList.add('hide')
    workShiftStatusContainer.classList.remove('hide')
    breakTimeContainer.classList.add('hide')

    if (workTimeLeft) displayRemainingWorkTime(workTimeLeft)
    if (timeLeftToBreak) displayRemainingTimeToBreak(timeLeftToBreak)
}

// State when in a break
function displayBreakTime({ timeLeftToBreak }) {
    newWorkshiftContainer.classList.add('hide')
    workShiftStatusContainer.classList.add('hide')
    breakTimeContainer.classList.remove('hide')

    if (timeLeftToBreak) displayRemainingBreakTime(timeLeftToBreak)
}



export {
    displayNewWorkShiftMenu,
    displayRunningWorkShift,
    displayBreakTime
}
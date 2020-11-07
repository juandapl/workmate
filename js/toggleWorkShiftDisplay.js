
const newWorkshiftContainer = document.getElementsByClassName('new_workshift')[0]
const workShiftStatusContainer = document.getElementsByClassName('workshift_running')[0]
const breakTimeContainer = document.getElementsByClassName('break_time')[0]

function displayNewWorkShiftMenu() {
    newWorkshiftContainer.classList.remove('hide')
    workShiftStatusContainer.classList.add('hide')
    breakTimeContainer.classList.add('hide')
}

function displayRunningWorkShift() {
    newWorkshiftContainer.classList.add('hide')
    workShiftStatusContainer.classList.remove('hide')
    breakTimeContainer.classList.add('hide')
}

function displayBreakTime() {
    newWorkshiftContainer.classList.add('hide')
    workShiftStatusContainer.classList.add('hide')
    breakTimeContainer.classList.remove('hide')
}



export {
    displayNewWorkShiftMenu,
    displayRunningWorkShift,
    displayBreakTime
}
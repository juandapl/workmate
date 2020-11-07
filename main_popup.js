
import displayRemainingWorkTime from './js/displayRemainingWorkTime.js'
import { displayNewWorkShiftMenu, displayRunningWorkShift } from './js/toggleWorkShiftDisplay.js'

// whenever popup is opened, request time left of current WorkShift ( if any, otherwise returns False )
chrome.storage.local.get(['inWorkShift', 'workShiftEndDateJSON'], res => {
    if (res.inWorkShift === true) {
        displayRunningWorkShift()
        
        const remainingTime = new Date(res.workShiftEndDateJSON).getTime() - Date.now()
        const remainingTimeInSeconds = remainingTime / (60 * 1000)

        if (remainingTimeInSeconds < 0) remainingTimeInSeconds = 0;
        displayRemainingWorkTime(remainingTimeInSeconds)
    } else {
        displayNewWorkShiftMenu()
    }
})

// when user clicks 'Start Workshift'
document.getElementById('start_workshift').addEventListener('click', function() {
    const workShiftHours = document.getElementById('total_hours').value
    const workShiftMinutes =  document.getElementById('total_minutes').value

    let workShiftDurationInMinutes = 0;
    if (workShiftHours) workShiftDurationInMinutes += 60 * workShiftHours
    if (workShiftMinutes) workShiftDurationInMinutes += workShiftMinutes

    if (workShiftDurationInMinutes > 0) {
        chrome.runtime.sendMessage({ message: 'START_WORKSHIFT', timerDuration: workShiftDurationInMinutes })
        displayRemainingWorkTime(workShiftDurationInMinutes)
        displayRunningWorkShift()
    } else { // user left the fields blank, show error 
        // todo
        alert('error!! enter a workshift duration please')
    }
})

// when user clicks 'End Workshift'
document.getElementById('end_workshift').addEventListener('click', function() {
    chrome.runtime.sendMessage({ message: 'END_WORKSHIFT' })
    displayRemainingWorkTime(0)
    displayNewWorkShiftMenu()
})
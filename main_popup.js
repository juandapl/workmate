
import displayRemainingWorkTime from './js/displayRemainingWorkTime.js'

// whenever popup is opened, request time left of current WorkShift ( if any, otherwise returns False )
chrome.runtime.sendMessage({ message: 'GET_REMAINING_TIME' }, 
    remainingTime => {
        if (remainingTime) displayRemainingWorkTime(remainingTime)
    }
)


// when user clicks 'Start Workshift'
document.getElementById('start_workshift').addEventListener('click', function() {
    const workShiftHours = document.getElementById('total_hours').value
    const workShiftMinutes =  document.getElementById('total_minutes').value

    let workShiftDurationInMinutes = 0;
    if (workShiftHours) workShiftDurationInMinutes += 60 * workShiftHours
    if (workShiftMinutes) workShiftDurationInMinutes += workShiftMinutes

    if (workShiftDurationInMinutes > 0) {
        chrome.runtime.sendMessage({ message: 'START_TIMER', timerDuration: workShiftDurationInMinutes })
        displayRemainingWorkTime(workShiftDurationInMinutes)
    } else { // user left the fields blank, show error 
        // todo
        alert('error!!')
    }
})
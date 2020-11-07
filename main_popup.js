
import displayRemainingWorkTime from './js/displayRemainingWorkTime.js'

// whenever popup is opened, request time left of current WorkShift ( if any, otherwise returns False )
chrome.runtime.sendMessage({ message: 'GET_REMAINING_TIME' }, 
    remainingTime => {
        if (remainingTime) displayRemainingWorkTime(remainingTime)
    }
)




// when user clicks 'Start Workshift'
document.getElementById('start_workshift').addEventListener('click', function() {
    chrome.runtime.sendMessage({ message: 'START_TIMER', timerDuration: 90 })
    displayRemainingWorkTime(90)
})
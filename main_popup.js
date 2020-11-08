
import { displayRemainingWorkTime, displayRemainingTimeToBreak } from './js/displayRemainingTime.js'
import { displayNewWorkShiftMenu, displayBreakTime, displayRunningWorkShift } from './js/toggleWorkShiftDisplay.js'
import { setBreakOption, isBreakEnabled } from './js/popup_break_input.js'
import showAlert from './js/showAlert.js'

// whenever popup is opened, get state of app from chrome storage
chrome.storage.local.get(['inWorkShift', 'workShiftEndDateJSON', 'nextBreakDateJSON', 'inBreak'], res => {
    if (res.inWorkShift === true) {
        if (res.inBreak === true) {
            displayBreakTime()
            return
        }
        displayRunningWorkShift()

        if (res.nextBreakDateJSON) {
            const remainingTimeToBreak = new Date(res.nextBreakDateJSON).getTime() - Date.now()
            let remainingTimeToBreakInMinutes = remainingTimeToBreak / (60 * 1000)
    
            if (remainingTimeToBreakInMinutes < 0) remainingTimeToBreakInMinutes = 0;
            displayRemainingTimeToBreak(remainingTimeToBreakInMinutes)
        }
        
        const remainingTime = new Date(res.workShiftEndDateJSON).getTime() - Date.now()
        let remainingTimeInMinutes = remainingTime / (60 * 1000)

        if (remainingTimeInMinutes < 0) remainingTimeInMinutes = 0;
        displayRemainingWorkTime(remainingTimeInMinutes)

        
    } else {
        displayNewWorkShiftMenu()
    }
})

const saveWorkShiftSettings = () => {

}

const playSound = (soundURL) => {
    var audio = new Audio(chrome.runtime.getURL(soundURL));
    audio.play();
}

// when user clicks 'Start Workshift'
document.getElementById('start_workshift').addEventListener('click', function() {
    const workShiftHours = document.getElementById('total_hours').value
    const workShiftMinutes =  document.getElementById('total_minutes').value

    const breakDuration = document.getElementById('break_minutes').value
    const breakHours = document.getElementById('gap_hours').value
    const breakMinutes = document.getElementById('gap_minutes').value

    let workShiftDurationInMinutes = 0;
    if (workShiftHours) workShiftDurationInMinutes += 60 * parseInt(workShiftHours)
    if (workShiftMinutes) workShiftDurationInMinutes += parseInt(workShiftMinutes)

    let timeLeftToBreak = 0;
    if (breakHours) timeLeftToBreak += 60 * parseInt(breakHours)
    if (breakMinutes) timeLeftToBreak += parseInt(breakMinutes)

    if (workShiftDurationInMinutes > 0) {
        playSound("./sounds/workshift_start.mp3")
        
        if (isBreakEnabled()) {
            chrome.runtime.sendMessage({ 
                message: 'START_WORKSHIFT',
                workShiftDuration: workShiftDurationInMinutes,
                isBreakEnabled: true,
                breakDuration,
                breakGap: timeLeftToBreak,
            })
        } else {
            chrome.runtime.sendMessage({ 
                message: 'START_WORKSHIFT',
                workShiftDuration: workShiftDurationInMinutes,
                isBreakEnabled: false
            })
        }
    
        displayRemainingWorkTime(workShiftDurationInMinutes)
        displayRunningWorkShift()
    } else { // user left the fields blank, show error 
        // todo
        showAlert({ text: 'Please enter a workshift duration.', title: 'Error!' })
    }
})

// when user clicks 'End Workshift'
document.getElementById('end_workshift').addEventListener('click', function() {
    chrome.runtime.sendMessage({ message: 'END_WORKSHIFT' })
    displayRemainingWorkTime(0)
    displayNewWorkShiftMenu()
})

// when user clicks 'Edit Blocked Pages'
document.getElementById('edit_blocked_pages').addEventListener('click', function() {
    chrome.runtime.openOptionsPage()
})

// when user clicks 'Block this page'
document.getElementById('blacklist_page').addEventListener('click', function() {
    chrome.runtime.sendMessage({ message: 'BLOCK_CURRENT_SITE'})
})

// when user clicks yes/no to the breaks
document.getElementById('yes_breaks').addEventListener('click', () => setBreakOption('enable'))
document.getElementById('no_breaks').addEventListener('click', () => setBreakOption('disable'))
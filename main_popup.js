
import { displayNewWorkShiftMenu, displayBreakTime, displayRunningWorkShift } from './js/toggleWorkShiftDisplay.js'
import { setBreakOption, isBreakEnabled } from './js/popup_break_input.js'

// whenever popup is opened, get state of app from chrome storage
chrome.storage.local.get(['inWorkShift', 'workShiftEndDateJSON', 'afkAlarm', 'nextBreakDateJSON', 'breakEndDateJSON', 'inBreak'], res => {
    if (res.inWorkShift === true) {
        let remainingTimeToBreak
        const remainingTime = new Date(res.workShiftEndDateJSON).getTime() - Date.now()

        if (res.nextBreakDateJSON) {
            remainingTimeToBreak = new Date(res.nextBreakDateJSON).getTime() - Date.now()
        }

        displayRunningWorkShift({ workTimeLeft: remainingTime, timeLeftToBreak: remainingTimeToBreak})
    } else if (res.inBreak === true) {
        const remainingBreakTime = new Date(res.breakEndDateJSON).getTime() - Date.now()
        displayBreakTime({ timeLeftToBreak: remainingBreakTime })
    }
    else {
        displayNewWorkShiftMenu()
    }

    // misc settings
    if (res.afkAlarm === true) {
        document.getElementById('afk').checked = true
    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'START_BREAK') {
        displayBreakTime({ timeLeftToBreak: request.duration })
    }
    if (request.message === 'END_BREAK') {
        displayRunningWorkShift({ timeLeftToBreak: request.timeLeftToBreak })
    }
    if (request.message === 'END_WORKSHIFT') {
        displayNewWorkShiftMenu()
    }
})

// when user clicks 'Start Workshift'
document.getElementById('start_workshift').addEventListener('click', function() {
    let workShiftHours = document.getElementById('total_hours').value || 0
    let workShiftMinutes =  document.getElementById('total_minutes').value || 0

    // only use placaeholder values if both inputs are not filled
    if (!workShiftHours && !workShiftMinutes) {
        if (!workShiftHours) workShiftHours = 1
        if (!workShiftMinutes) workShiftMinutes = 30
    }

    const breakDuration = document.getElementById('break_minutes').value || 5
    let breakHours = document.getElementById('gap_hours').value || 0
    let breakMinutes = document.getElementById('gap_minutes').value || 0

    if (!breakHours && !breakMinutes) {
        if (!breakHours) breakHours = 0
        if (!breakMinutes) breakMinutes = 25
    }

    let workShiftDurationInMilliseconds = 0;
    workShiftDurationInMilliseconds += 60 * 60 * 1000 * parseFloat(workShiftHours)
    workShiftDurationInMilliseconds += 60 * 1000 * parseFloat(workShiftMinutes)

    let timeLeftToBreak = 0;
    const breakDurationInMilliseconds = breakDuration * 60 * 1000
    if (isBreakEnabled()) {
        timeLeftToBreak += 60 * 60 * 1000 * parseFloat(breakHours)
        timeLeftToBreak += 60 * 1000 * parseFloat(breakMinutes)
    }

    if (workShiftDurationInMilliseconds > 0) {
        if (isBreakEnabled()) {
            chrome.runtime.sendMessage({ 
                message: 'START_WORKSHIFT',
                workShiftDuration: workShiftDurationInMilliseconds,
                isBreakEnabled: true,
                breakDuration: breakDurationInMilliseconds,
                breakGap: timeLeftToBreak,
            })
        } else {
            chrome.runtime.sendMessage({ 
                message: 'START_WORKSHIFT',
                workShiftDuration: workShiftDurationInMilliseconds,
                isBreakEnabled: false
            })
        }
    
        displayRunningWorkShift({ workTimeLeft: workShiftDurationInMilliseconds, timeLeftToBreak })
    } else {
        showAlert({ text: 'Please enter a valid workshift duration.', title: 'Error!', buttonText: 'Try again' })
    }
})

// when user clicks 'End Workshift'
document.getElementById('end_workshift').addEventListener('click', function() {
    chrome.runtime.sendMessage({ message: 'END_WORKSHIFT' })
    displayNewWorkShiftMenu()
})

// when user clicks 'End Break'
document.getElementById('end_break').addEventListener('click', function() {
    chrome.runtime.sendMessage({ message: 'END_BREAK' })
})

// when user clicks 'Break Now'
document.getElementById('break_now').addEventListener('click', function() {
    chrome.runtime.sendMessage({ message: 'START_BREAK' })
})

// when user clicks 'Edit Blocked Pages'
document.getElementById('edit_blocked_pages').addEventListener('click', function() {
    chrome.runtime.openOptionsPage()
})

// when user clicks 'Block this page'
document.getElementById('blacklist_page').addEventListener('click', function() {
    chrome.runtime.sendMessage({ message: 'BLOCK_CURRENT_SITE'})
})

document.getElementById('afk').addEventListener('change', (e) => {
    const value = e.target.checked
    chrome.storage.local.set({ afkAlarm: value })
})

// when user clicks yes/no to the breaks
document.getElementById('yes_breaks').addEventListener('click', () => setBreakOption('enable'))
document.getElementById('no_breaks').addEventListener('click', () => setBreakOption('disable'))

import displayRemainingWorkTime from './js/displayRemainingWorkTime.js'
import { displayNewWorkShiftMenu, displayRunningWorkShift } from './js/toggleWorkShiftDisplay.js'

// whenever popup is opened, request time left of current WorkShift ( if any, otherwise returns False )
chrome.storage.local.get(['inWorkShift', 'workShiftEndDateJSON'], res => {
    if (res.inWorkShift === true) {
        displayRunningWorkShift()
        
        const remainingTime = new Date(res.workShiftEndDateJSON).getTime() - Date.now()
        let remainingTimeInMinutes = remainingTime / (60 * 1000)

        if (remainingTimeInMinutes < 0) remainingTimeInMinutes = 0;
        displayRemainingWorkTime(remainingTimeInMinutes)
    } else {
        displayNewWorkShiftMenu()
    }
})

// when user clicks 'Start Workshift'
document.getElementById('start_workshift').addEventListener('click', function() {
    const workShiftHours = document.getElementById('total_hours').value
    const workShiftMinutes =  document.getElementById('total_minutes').value

    let workShiftDurationInMinutes = 0;
    if (workShiftHours) workShiftDurationInMinutes += 60 * parseInt(workShiftHours)
    if (workShiftMinutes) workShiftDurationInMinutes += parseInt(workShiftMinutes)

    if (workShiftDurationInMinutes > 0) {
        chrome.runtime.sendMessage({ message: 'START_WORKSHIFT', timerDuration: workShiftDurationInMinutes })
        displayRemainingWorkTime(workShiftDurationInMinutes)
        displayRunningWorkShift()
    } else { // user left the fields blank, show error 
        // todo
        showAlert("Please enter a workshift duration.")
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

function showAlert(AlertText) {
    const modal = document.createElement('div');
    modal.setAttribute("style", "visibility: visible; z-index: 9999; background: white; width: 200px; left: 50px; top: 200px; position: absolute; padding-left: 15px; border-radius: 4px; border-style: solid; border-width: 1px; border-color: rgba(45,15,66,1);");
    modal.id = 'Alert'

    const title = document.createElement('p');
    title.setAttribute("style", "color: rgba(45,15,66,1); font-family: 'Glacial Indifference', sans-serif; font-size: 30px; line-height: 0px;");
    title.innerHTML = "Alert"

    const text = document.createElement('span');
    text.setAttribute("style", "font-family: 'Glacial Indifference', sans-serif; font-size: 14px; color: black;");
    text.innerHTML = AlertText + "<br> <br>"; //I know this is dirty, shut up.

    const closebutton = document.createElement("button");
    closebutton.setAttribute("style", "background-color:  rgba(39,145,100,1); color: white; padding: 10px 14px; font-family: 'Glacial Indifference', sans-serif; font-size: 14px; border-radius: 4px; border: none; margin: auto; margin-bottom: 10px;");
    closebutton.textContent = "Try again";

    modal.appendChild(title);
    modal.appendChild(text);
    modal.appendChild(closebutton);
    document.body.appendChild(modal) ;

    //action when clicking
    closebutton.addEventListener('click', function(){
        document.body.removeChild(modal);
    })
}
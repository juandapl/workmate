
let workShiftEndDate;
let workShiftTimer;

function onWorkShiftEnd() {
    if (!workShiftEndDate) { // No current workshift
        return false
    }
    chrome.storage.local.set({ inWorkShift: false })
    chrome.storage.local.remove('workShiftEndDateJSON')

    workShiftEndDate = null;
    clearTimeout(workShiftTimer)
    workShiftTimer = null;

    return true
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'START_WORKSHIFT') {
        workShiftEndDate = new Date(Date.now() + request.timerDuration * 60 * 1000);
        workShiftTimer = setTimeout(() => {
            onWorkShiftEnd()
            alert('Workshift over!!! Yay!')
        }, workShiftEndDate.getTime() - Date.now());

        chrome.storage.local.set({ inWorkShift: true, workShiftEndDateJSON: workShiftEndDate.toJSON() })

        sendResponse(true)
    } 
    else if (request.message === 'END_WORKSHIFT') {
        sendResponse(onWorkShiftEnd())
        }

        chrome.storage.local.set({ inWorkShift: false })

        workShiftEndDate = null;
        clearTimeout(workShiftTimer)
        workShiftTimer = null;
    }
});

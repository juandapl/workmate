
let workShiftEndDate;
let workShiftTimer;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'START_WORKSHIFT') {
        workShiftEndDate = new Date(Date.now() + request.timerDuration * 60 * 1000);
        workShiftTimer = setTimeout(() => {
            alert('time up')
        }, workShiftEndDate.getTime() - Date.now());

        sendResponse(true)
    } 
    else if (request.message === 'GET_REMAINING_TIME') {
        if (!workShiftEndDate) { // No current workshift
            sendResponse(null); 
            return
        }

        const remainingTime = workShiftEndDate.getTime() - Date.now()
        const remainingTimeInSeconds = remainingTime / (60 * 1000)

        if (remainingTimeInSeconds < 0) remainingTimeInSeconds = 0;

        sendResponse(remainingTimeInSeconds)
    }
    else if (request.message === 'END_WORKSHIFT') {
        if (!workShiftEndDate) { // No current workshift
            sendResponse(null); 
            return
        }

        workShiftEndDate = null;
        clearTimeout(workShiftTimer)
        workShiftTimer = null;
    }
});

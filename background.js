
let workShiftEndDate;
let workShiftTimer;

function onWorkShiftEnd() {
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
        onWorkShiftEnd()
    }
    else if (request.message === 'CLOSE_CURRENT_TAB') {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.tabs.remove(tabs[0].id, function() { });
        });
    }
    else if (request.message === 'BLOCK_CURRENT_SITE') {
        chrome.tabs.query({ active: true, currentWindow: true }, curTab => {
            let currentSite = new URL(curTab[0].url)
            let domainName = currentSite.hostname
            if (domainName.split('.').length == 2) {
                domainName = 'www.' + domainName
            }
            chrome.tabs.sendMessage(curTab[0].id, { message: 'BLOCK_CURRENT_SITE' })

            chrome.storage.local.get('blockList', res => {
                if (res.blockList.includes(domainName)) return; // site already blacklisted...
                newBlockList = res.blockList
                newBlockList.push(domainName)
                chrome.storage.local.set({ blockList: newBlockList })
            })
        });
    }
});

// on load, check if there were any prior workshifts ( scenario: user accidently closed their browser/crashed ) 
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get(['inWorkShift', 'workShiftEndDateJSON'], res => {
        if (res.inWorkShift !== true) return; // no previous workshift
        
        if (new Date(res.workShiftEndDateJSON).getTime() - Date.now() < 0) { // previous workshift already ended
            onWorkShiftEnd() 
        } else { // resume workshift
            workShiftEndDate = new Date(res.workShiftEndDateJSON)
            workShiftTimer = setTimeout(() => {
                onWorkShiftEnd()
            }, workShiftEndDate.getTime() - Date.now());
        }
    })
});

// when the extension is first installed, we put the default blocklist into storage
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ blockList: defaultBlockList })
})
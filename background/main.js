
let workShiftEndDate;
let workShiftTimer;

let nextBreakDate;
let nextBreakTimer;

let breakEndDate;
let breakEndTimer;

const alertUser = ({ text, title, buttonText }) => {
    chrome.tabs.query({ active: true, currentWindow: true }, curTab => {
        chrome.tabs.sendMessage(curTab[0].id, { message: 'ALERT_USER', text, title, buttonText })
    })
}

const playSound = (soundURL) => {
    var audio = new Audio(chrome.runtime.getURL(soundURL));
    audio.play();
}

function onWorkShiftEnd() {
    chrome.storage.local.set({ inWorkShift: false })
    chrome.storage.local.remove(['workShiftEndDateJSON', 'nextBreakDateJSON', 'inBreak'])
    chrome.runtime.sendMessage({ message: 'END_WORKSHIFT '})
    clearAllTimers()

    return true
}

function onBreakStart({ duration, gap }) {
    playSound("./sounds/break_start_end.mp3")
    chrome.runtime.sendMessage({ message: 'START_BREAK', duration })
    clearNextBreakTimer()

    breakEndDate = new Date(Date.now() + duration);
    breakEndTimer = setTimeout(() => {
        onBreakEnd({ duration: duration, gap: gap })
        alertUser({ text: 'Back to work', title: 'Break Ended', buttonText: 'Okay' })
    }, breakEndDate.getTime() - Date.now());

    chrome.storage.local.set({ inWorkShift: false, inBreak: true , breakEndDateJSON: breakEndDate.toJSON() })
    chrome.storage.local.remove('nextBreakDateJSON')
}

function onBreakEnd({ duration, gap }) {
    playSound("./sounds/break_start_end.mp3")
    chrome.runtime.sendMessage({ message: 'END_BREAK', timeLeftToBreak: gap })
    clearBreakEndTimer()

    nextBreakDate = new Date(Date.now() + gap);
    nextBreakTimer = setTimeout(() => {
        onBreakStart({ duration: duration, gap: gap })
        alertUser({ text: 'Take a breather', title: 'Break Time!', buttonText: 'Okay' })
    }, nextBreakDate.getTime() - Date.now());

    chrome.storage.local.set({ inWorkShift: true, inBreak: false , nextBreakDateJSON: nextBreakDate.toJSON() })
    chrome.storage.local.remove('breakEndDateJSON')
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'START_WORKSHIFT') {
        workShiftEndDate = new Date(Date.now() + request.workShiftDuration);
        workShiftTimer = setTimeout(() => {
            onWorkShiftEnd()
            alertUser({ text: 'Good job!', title: 'Workshift Over', buttonText: 'Awesome!' })
        }, workShiftEndDate.getTime() - Date.now());

        if (request.isBreakEnabled) {
            nextBreakDate = new Date(Date.now() + request.breakGap);
            nextBreakTimer = setTimeout(() => {
                onBreakStart({ duration: request.breakDuration, gap: request.breakGap })
                alertUser({ text: 'Take a breather', title: 'Break Time!', buttonText: 'Okay' })
            }, nextBreakDate.getTime() - Date.now());

            chrome.storage.local.set({ nextBreakDateJSON: nextBreakDate.toJSON() })
        }

        playSound("./sounds/workshift_start.mp3")
        chrome.storage.local.set({ 
            inWorkShift: true, 
            workShiftEndDateJSON: workShiftEndDate.toJSON() 
        })

        sendResponse(true)
    } 
    else if (request.message === 'END_WORKSHIFT') {
        onWorkShiftEnd()
    }
    else if (request.message === 'END_BREAK') {
        onBreakEnd()
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

// on chrome startup, check if there were any prior workshifts ( scenario: user accidently closed their browser/crashed ) 
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
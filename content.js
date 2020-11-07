
chrome.storage.local.get(['inWorkShift', 'blockList'], res => {
    if (res.inWorkShift !== true) return; // not in workshift mode

    let curDomainName = window.location.hostname
    if (curDomainName.split('.').length == 2) {
        curDomainName = 'www.' + curDomainName
    }
    if (res.blockList.includes(curDomainName)) { // is this site blocked?
        blockSite()
    }
})


//todo here add the listener to execute timealert? maybe?


chrome.runtime.onMessage.addListener((request) => {
    if (request.message === 'BLOCK_CURRENT_SITE') blockSite();
})

function blockSite() {
    var newFont = document.createElement('style');
        newFont.appendChild(document.createTextNode("\
        @font-face {\
            font-family: 'Glacial Indifference', bold, sans-serif;\
            src: url(fonts/GlacialIndifference-Bold.otf);\
        }\
        ")
    );

    const modal = document.createElement('div');
    modal.setAttribute("style", "visibility: visible; z-index: 9999; background: linear-gradient(180deg,rgba(45,15,66,1) 45%, rgba(39,145,100,1) 100%); width: 100vw; height: 100vh; left: 0; top: 0; right: 0; bottom: 0; position: absolute;");
    modal.id = 'workMateBlocked'

    const alertContainer = document.createElement('div');
    alertContainer.setAttribute("style", "max-height: 100%; padding-top: 10%; text-align: center")

    const img = document.createElement('img');
    img.src = chrome.runtime.getURL("icons/angry_workmate_small.png");
    img.setAttribute("style", "width: 250px; height: 250px")

    const alert = document.createElement('p');
    alert.innerHTML = '<b>Workmate blocked this website. Go back to work!</b>'
    alert.setAttribute("style", "font-family: 'Glacial Indifference', bold, sans-serif; font-size: 36px; color:white; text-align: center;")

    const closeSiteButton = document.createElement('button');
    closeSiteButton.textContent = 'Close this page'
    closeSiteButton.setAttribute("style", `background-color: rgba(45,15,66,1);color: white; padding: 16px 32px;font-family: "Glacial Indifference", sans-serif;font-size: 20px;border-radius: 4px;border: none;margin: auto; display: inline-block; width: 30%;`)

    const accessButton = document.createElement('button');
    accessButton.textContent = 'I really need to access. Let me in once.'
    accessButton.setAttribute("style", `background: none; color: white;padding: 16px 32px;font-family: "Glacial Indifference", sans-serif;font-size: 14px;border: none;margin: auto; display: inline-block;text-decoration: underline;`)    
    

    closeSiteButton.addEventListener('click', (e) => {
        chrome.runtime.sendMessage({ message: 'CLOSE_CURRENT_TAB'})
    })

    accessButton.addEventListener('click', () => {
        unblockSite()
    })

    
    alertContainer.appendChild(img)
    alertContainer.appendChild(alert)
    alertContainer.appendChild(closeSiteButton)
    alertContainer.appendChild(accessButton)
    modal.appendChild(alertContainer)

    document.body.appendChild(modal)
    document.body.setAttribute("style", "visibility: hidden; width: 100vw; height: 100vh; overflow: hidden")
    document.head.appendChild(newFont)
}

function unblockSite() {
    const modal = document.getElementById('workMateBlocked')

    document.body.removeChild(modal)

    document.body.style.visibility = 'visible'
    document.body.style.height = ''
    document.body.style.overflow = 'visible'
}


//@dweggyness can you connect these to background.js, so that the alerts are displayed on the tab itself and not just the popup?

//This is the function that displays the break started/ended alerts, and the workshift ended alert.
function TimeAlert(AlertType) { //alertType can be breakEnded, breakStarted, workshiftEnded.
    const modal = document.createElement('div');
    modal.setAttribute("style", "visibility: visible; z-index: 9999; background: linear-gradient(180deg,rgba(45,15,66,1) 45%, rgba(39,145,100,1) 100%); width: 40vw; left: 20vw; top: 30vh; position: absolute; padding: 5vh;");
    modal.id = 'TimeAlert'

    const img = document.createElement('img');
    img.src = chrome.runtime.getURL("icons/angry_workmate_small.png");
    img.setAttribute("style", "display: inline-block; width: 50px; height: 50px");

    const title = document.createElement('h1');
    title.setAttribute("style", "color: white; font-family: 'Glacial Indifference', sans-serif; font-size: 40px; line-height: 0px; display: inline-block; vertical-align: super;");

    const text = document.createElement('p');
    text.setAttribute("style", "padding: 10px; font-family: 'Glacial Indifference', sans-serif; font-size: 18px; color: white;")

    const action = document.createElement("button");
    action.setAttribute("style", "background-color: rgba(45,15,66,1); color: white; padding: 20px 36px; font-family: 'Glacial Indifference', sans-serif; font-size: 18px; border-radius: 4px; border: none; margin: auto; margin-bottom: 10px;")

    modal.appendChild(img);
    modal.appendChild(title);
    modal.appendChild(text);
    modal.appendChild(action);

    if (AlertType=="workshiftEnded")
    {
        title.innerHTML = "Workshift is over!";
        text.innerHTML = "Well done! All sites will be unlocked. Thank you for using Workmate!";
        action.textContent = "Goodbye!";
    }

    if (AlertType=="breakStarted")
    {
        title.innerHTML = "It's break time!";
        text.innerHTML = "Good job keeping focused! All blocked sites will be reopened for a while.";
        action.textContent = "Continue"
    }

    if (AlertType=="breakEnded")
    {
        title.innerHTML = "Break time is over!";
        text.innerHTML = "It's time to get back at it. Unproductive sites will be blocked again.";
        action.textContent = "Get back to work";

        const secondaryAction = document.createElement("button");
        secondaryAction.setAttribute("style", "background: none; color: white;padding: 16px 32px;font-family: 'Glacial Indifference', sans-serif;font-size: 12px;border: none;margin: auto; display: inline-block;text-decoration: underline;")
        secondaryAction.textContent = "Two more minutes, please!"
    }
        

}

function dismissTimeAlert() { //yes Jun, I stole this code from you.
    const modal = document.getElementById('TimeAlert')

    document.body.removeChild(modal)
    document.body.style.visibility = 'visible'
    document.body.style.height = ''
    document.body.style.overflow = 'visible'

    document.body.setAttribute("style", "visibility: visible; height: ''; overflow: visible")

}
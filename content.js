
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
    document.body.setAttribute("style", "visibility: visible; height: ''; overflow: visible")
}
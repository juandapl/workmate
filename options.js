
const blockList = document.getElementById('blocklist_textarea')

// On page load, load the blockList from chrome storage
chrome.storage.local.get('blockList', res => {
    let blockListValues = ''
    if (!res.blockList) { // somehow the blocklist is not in the storage, we use the default then
        blockListValues = defaultBlockList.join('\n')
    } else {
        blockListValues = res.blockList.join('\n')
    }

    blockList.textContent = blockListValues
})

// User clicks 'Save' button
document.getElementById('save_button').addEventListener('click', () => {
    const blocklistValues = blockList.value
    const blockListArray = blocklistValues.split('\n') // split by newline

    chrome.storage.local.set({ blockList: blockListArray })

    const savedStatus = document.getElementById('saved_text_container')
    savedStatus.textContent = 'Saved!'
    setTimeout(() => savedStatus.textContent = '', 1500)
})

// User clicks 'Restore Defaults' button
document.getElementById('restore_defaults_button').addEventListener('click', () => {
    const blockListValues = defaultBlockList.join('\n')

    chrome.storage.local.set({ blockList: defaultBlockList})
    
    blockList.value = blockListValues
})
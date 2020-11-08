
// Hides the break forms if 'No' is selected for breaks

let breakOption = false
const breakSettings = document.getElementsByClassName('break_duration_settings')[0]

const enableBreak = () => {
    breakSettings.classList.remove('hide')
    breakOption = true
}

const disableBreak = () => {
    breakSettings.classList.add('hide')
    breakOption = false
}

function setBreakOption(option) {
    if (option === 'enable') enableBreak()
    else disableBreak()
}

function isBreakEnabled() {
    return breakOption
}

export {
    setBreakOption,
    isBreakEnabled
}

function clearWorkShiftTimer() {
    workShiftEndDate = null;
    clearTimeout(workShiftTimer)
    workShiftTimer = null;
}

function clearNextBreakTimer() {
    nextBreakDate = null;
    clearTimeout(nextBreakTimer)
    nextBreakTimer = null;
}

function clearBreakEndTimer() {
    breakEndDate = null;
    clearTimeout(breakEndTimer)
    breakEndTimer = null;
}

function clearAllTimers() {
    clearWorkShiftTimer()
    clearNextBreakTimer()
    clearBreakEndTimer()
}
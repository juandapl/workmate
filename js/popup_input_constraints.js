
// Limit the input range for 'hour' inputs to 0-23
// and 'minute' inputs to 0-59

document.getElementById('total_hours').addEventListener('input', limitInputHours)
document.getElementById('total_minutes').addEventListener('input', limitInputMinutes)
document.getElementById('break_minutes').addEventListener('input', limitInputMinutes)
document.getElementById('gap_hours').addEventListener('input', limitInputHours)
document.getElementById('gap_minutes').addEventListener('input', limitInputMinutes)

function limitInputHours() {
    var value = this.value;

    if (value) {
        value = parseFloat(value)

        if (value < 0) this.value = 0;
        else if (value > 23) this.value = 23;
    }
}

function limitInputMinutes() {
    var value = this.value;

    if (value) {
        value = parseFloat(value)

        if (value < 0) this.value = 0;
        else if (value > 59) this.value = 59;
    }
}
const showError = function(err, message) {
    runWindow('C/System/Apps/error.exe', [err, message]);
}

const exit = function() {
    closeWindow(p_id);
}

const bsod = function() {
    window.location = '/res/bsod.html';
}
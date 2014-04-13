function save_options() {
    var wpm = document.getElementById('wpm').value;
    chrome.storage.sync.set({
        'WordsPerMin': wpm
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options Saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 2000);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        WordsPerMin: wpm
    }, function(items) {
        document.getElementById('wpm').value = items.WordsPerMin;
    })
}

window.onload = function() {
    document.addEventListener('DOMContentLoaded', restore_options);
    document.getElementById('save').addEventListener('click',
        save_options);
};


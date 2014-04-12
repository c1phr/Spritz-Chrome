var hash = window.location.hash;
var origin = window.location.protocol + "//" + window.location.host;

// postMessage does not work reliably in IE, pass the value through localStorage
if (typeof(localStorage) !== 'undefined') {
    try {
        chrome.storage.sync.set({'spritz.authResponse': hash}, null);
    }
    catch(e) {
        if(console) {
            console.log(e, 'Can\'t write to localStorage');
        }
    }
}

if (window.opener) {
    window.opener.postMessage(hash, origin);
}

window.close();
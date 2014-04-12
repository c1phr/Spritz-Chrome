/**
 * Created by ryanbatchelder on 4/12/14.
 */

var hash = window.location.hash;
var origin = window.location.protocol + "//" + window.location.host;

// postMessage does not work reliably in IE, pass the value through localStorage

if (typeof(localStorage) !== 'undefined') {
    try {
    localStorage.setItem("spritz.authResponse", hash);
    }
    catch(e) {
    if(console) {
    alert(e, 'Can\'t write to localStorage');
    }
    }
    }

if (window.opener) {
    window.opener.postMessage(hash, origin);
    }

'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install")
    {
        window.location = "chrome-extension://@@extension_id/firstRun.html"
    }
    console.log('previousVersion', details.previousVersion);
});


chrome.browserAction.onClicked.addListener(function(tab) {
    //alert("Extension button clicked");
    chrome.tabs.create({url: '../firstRun.html'}, null);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

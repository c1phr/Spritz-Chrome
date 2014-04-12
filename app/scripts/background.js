'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install")
    {
        var myid = chrome.i18n.getMessage("@@extension_id");
        window.location = "chrome-extension://" + myid + "/firstRun.html"
    }
    console.log('previousVersion', details.previousVersion);
});


chrome.browserAction.onClicked.addListener(function(tab) {
    //alert("Extension button clicked");
    chrome.tabs.create({url: '../firstRun.html'}, null);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

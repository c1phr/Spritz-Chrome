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

chrome.browserAction.setBadgeText({text: '\'spritz'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

chrome.commands.onCommand.addListener(function(command){
	alert("Command: " + command.name);
});

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
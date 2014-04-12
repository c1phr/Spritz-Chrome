'use strict';

chrome.runtime.onInstalled.addListener(function (details) { //Listener for new installs and updates
    if (details.reason == "install") //This branch handles new installs
    {
        chrome.tabs.create({url: chrome.extension.getURL("/firstRun.html")}); //Open a new tab to the firstRun page
    }
    else
    {
        //Log the previous version of the extension that was installed, until we have something better to do with updates.
        console.log('previousVersion', details.previousVersion);
    }
});


chrome.browserAction.onClicked.addListener(function(tab) {
    //alert("Extension button clicked");
    chrome.tabs.create({url: '../firstRun.html'}, null);
});

chrome.commands.onCommand.addListener(function(command){
	alert("Command: " + command.name);
    chrome.tabs.executeScript({
        code: ''},
        function()
        {
            displayRedicle();
        }
    )
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

function displayRedicle() {
    alert("Redicle Display Called");
    $("html").prepend("<div class='backdrop overlay'>");
    $("html").append("</div><div class='reader-wrapper'><div data-role='spritzer' id='spritzer'></div></div>");
}
'use strict';
$(document).ready(function() {
    var myuri = chrome.extension.getURL("/login_success.html")
    var SpritzSettings = {
        clientId: "4739145546ba944ad",
        redirectUri: myuri
    };
    $.getScript("https://sdk.spritzinc.com/js/1.0/js/spritz.min.js", function () {
        alert("DocumentReady got SDK file");
        window.SpritzClient = new SPRITZ.client.SpritzClient(SpritzSettings.clientId, 'https://api.spritzinc.com/api-server/v1/', myuri);
    })
});

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
	if (command == "spritzify_selection") {
        console.log(window.getSelection().toString());

        console.log("Command: " + command.name);
        chrome.tabs.executeScript({
                code: ''},
            function () {
                displayRedicle();
            }
        )
    }
});

chrome.contextMenus.create({
	"id": "SpritzMenu"
	,"title": "Spritz it!"
	,"contexts": [
		"selection"
	]
});

chrome.contextMenus.onClicked.addListener(function(data) {
  if (data.menuItemId == 'SpritzMenu') {
  	getSelectionText();
  }
});


function startSpritzing(text) {
    var locale = "en_us";
    var successHandler = function(text){
        //spritzController.setSpritzText(text);
        alert("Spritz fetched the text!");
    };
    var failureHandler = function(text){
        alert("Spritz failed to fetch the text...")
    };
    SpritzClient.spritzify(text, locale, successHandler, failureHandler);

}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    startSpritzing(text);
}

function displayRedicle() {
    alert("Redicle Display Called");
    getSelectionText();
    $("html").prepend("<div class='backdrop overlay'>");
    $("html").append("</div><div class='reader-wrapper'><div data-role='spritzer' id='spritzer'></div></div>");
}
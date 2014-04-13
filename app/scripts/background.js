//'use strict';

var spritzerController = null;

$(document).ready(function(tab) {
    var myuri = chrome.extension.getURL("/login_success.html")

    var SpritzSettings = {
        clientId: "4739145546ba944ad",
        redirectUri: myuri
    };
    var customOptions = {
        "redicleWidth" : 	434,	// Specify Redicle width
        "redicleHeight" : 	76		// Specify Redicle height
    };
    //$("body").prepend('<div class="backdrop overlay">');

    //chrome.tabs.executeScript(null, { code: code });

    //document.body.appendChild(stuff);

    $.getScript("https://sdk.spritzinc.com/js/1.0/js/spritz.min.js", function () {
        console.log("DocumentReady got SDK file");
        window.SpritzClient = new SPRITZ.client.SpritzClient(SpritzSettings.clientId, 'https://api.spritzinc.com/api-server/v1/', myuri);
		window.spritz_sdk_root = "https://sdk.spritzinc.com/js/1.0";
		//var head  = document.getElementsByTagName('head')[0];
	    //var link  = document.createElement('link');
	    //link.id   = 'spritz-css';
	    //link.rel  = 'stylesheet';
	    //link.type = 'text/css';
	    window.link.href = window.spritz_sdk_root + '/css/spritz.min.css';
	    //link.media = 'all';
	    window.head.appendChild(window.link);
        spritzerController = new SPRITZ.spritzinc.SpritzerController(customOptions);
        //spritzerController.spritzClient = SpritzClient;


    });
	//$.getScript("https://sdk.spritzinc.com/js/1.0/css/spritz.min.css", function(){console.log("got the Spritz CSS")});
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
    console.log("Extension button clicked");
    chrome.tabs.create({url: '../firstRun.html'}, null);
    chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="red"'
    });
});

chrome.commands.onCommand.addListener(function(command){
    chrome.tabs.executeScript(null, { code: "$('body').prepend('<div class=\"backdrop overlay\">');"});
    chrome.tabs.executeScript(null, { code: "$('body').append('</div><div class=\"reader-wrapper\"><div data-role=\"spritzer\" id=\"spritzer\"></div></div>');"});

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
        spritzerController.startSpritzing(text);
        console.log("Spritz fetched the text!");
    };
    var failureHandler = function(text){
        console.log("Spritz failed to fetch the text...")
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
    console.log("Redicle Display Called");
    spritzerController.attach($('#spritzer'));
    getSelectionText();
}
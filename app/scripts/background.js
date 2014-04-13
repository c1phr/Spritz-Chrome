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
});

chrome.commands.onCommand.addListener(function(command){
    chrome.tabs.executeScript(null, { code: "$('body').prepend('<div class=\"backdrop overlay\">');"});
    chrome.tabs.executeScript(null, { code: "$('body').append('</div><div class=\"reader-wrapper\"><div data-role=\"spritzer\" id=\"spritzer\" style=\"z-index: 1000; height: 1000px; width: 1000px;\"></div></div>');"});

	if (command == "spritzify_selection") {
        alert(window.getSelection().toString());

        console.log("Command: " + command.name);
        chrome.runtime.sendMessage({messgae: 'spritz'});
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
    alert("Redicle Display Called");
    chrome.tabs.sendMessage(tab.id, { text: "spritz"}, null);
    //spritzerController.attach($('#spritzer'));
    //getSelectionText();
}

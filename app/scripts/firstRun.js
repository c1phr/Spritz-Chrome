/**
 * Created by ryanbatchelder on 4/12/14.
 */

var customOptions = {
    "redicleWidth" : 434,
    "redicleHeight" : 76
};

function init(){
	//initialize the controller from the API
	spritzController = new SPRITZ.spritzinc.SpritzerController(customOptions);
	//attach the controller div
	spritzController.attach.$("#spritzer");
}

function startSpritzing(text) {
	var locale = "en_us";
	spritzClient.spritzify(text, locale, onSpritzifySuccess, onSpritzifyFailure);
	
}

function onSpritzifySuccess(){
	console.log("Spritz fetched the text!");
}

function onSpritzifyFailure(){
	console.log("Spritz failed... Sorry about that.");
}


$(document).ready(function() {
	init();
	
	//feed the text to spritzify
	var spritzText = "You've successfully installed Spritz for Chrome!";
	startSpritzing(spritzText);
	
})

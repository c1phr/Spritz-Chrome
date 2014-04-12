/**
 * Created by ryanbatchelder on 4/12/14.
 */



function startSpritzing(text) {
    //initialize the controller from the API
    var spritzController = $("#spritzer").data("controller");

    var locale = "en_us";
    var successHandler = function onSpritzifySuccess(text){
        //alert("spritzify success!" + text);
        spritzController.setSpritzText(text);
        console.log("Spritz fetched the text!");
    };
    SpritzClient.spritzify(text, locale, successHandler, onSpritzifyFailure);

}

function onSpritzifyFailure(e){

    console.log("Spritz failed... Sorry about that.", e);
}


$(document).ready(function() {
	setTimeout(function(){
		var spritzText = "You've successfully installed Spritz for Chrome!";
		startSpritzing(spritzText);
	},1);
});
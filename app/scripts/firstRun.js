/**
 * Created by ryanbatchelder on 4/12/14.
 */
var spritzText = "You've successfully installed Spritz for Chrome!";
var onFetchSucessController = function(spritzText) {
    startSpritzing(spritzText);
}

function startSpritzing(spritzText) {
    $("#spritzer").data("controller").startSpritzing(spritzText);
}

$(document).ready(function() {
    SpritzClient.fetchContents(info.url, onFetchSuccessController, onFetchError);
})

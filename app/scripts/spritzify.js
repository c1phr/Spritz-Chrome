/**
 * Created by ryanbatchelder on 4/12/14.
 */

//jQuery.noConflict();

var myuri = chrome.extension.getURL("/login_success.html");

var SpritzSettings = {
    clientId: "4739145546ba944ad",
    redirectUri: myuri
};
var customOptions = {
    "redicleWidth" : 	434,	// Specify Redicle width
    "redicleHeight" : 	76		// Specify Redicle height
};

var text = "Spritz is now working!";
var spritzerController = null;

//jQuery.(document).ready(function($) {
//    $.getScript("https://sdk.spritzinc.com/js/1.0/js/spritz.min.js", function () {
//
//        console.log("DocumentReady got SDK file");
//        var myuri = chrome.extension.getURL("/login_success.html");
//
//        var SpritzSettings = {
//            clientId: "4739145546ba944ad",
//            redirectUri: myuri
//        };
//        var customOptions = {
//            "redicleWidth" : 	434,	// Specify Redicle width
//            "redicleHeight" : 	76		// Specify Redicle height
//        };
//        window.SpritzClient = new SPRITZ.client.SpritzClient(SpritzSettings.clientId, 'https://api.spritzinc.com/api-server/v1/', myuri);
//        window.spritz_sdk_root = "https://sdk.spritzinc.com/js/1.0";
//        //var head  = document.getElementsByTagName('head')[0];
//        //var link  = document.createElement('link');
//        //link.id   = 'spritz-css';
//        //link.rel  = 'stylesheet';
//        //link.type = 'text/css';
//        window.link.href = window.spritz_sdk_root + '/css/spritz.min.css';
//        //link.media = 'all';
//        window.head.appendChild(window.link);
//        spritzerController = new SPRITZ.spritzinc.SpritzerController(customOptions);
//        //spritzerController.spritzClient = SpritzClient;
//        var spritzer = $('#spritzer');
//
//
//
//    });
//    //$.getScript("https://sdk.spritzinc.com/js/1.0/css/spritz.min.css", function(){console.log("got the Spritz CSS")});
//});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    (function($) {
        $.getScript("https://sdk.spritzinc.com/js/1.0/js/spritz.min.js", function () {

            console.log("DocumentReady got SDK file");
            var myuri = chrome.extension.getURL("/login_success.html");

            var SpritzSettings = {
                clientId: "4739145546ba944ad",
                redirectUri: myuri
            };
            var customOptions = {
                "redicleWidth" : 	434,	// Specify Redicle width
                "redicleHeight" : 	76		// Specify Redicle height
            };
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
            //spritzerController = new SPRITZ.spritzinc.SpritzerController(customOptions);
            //spritzerController.spritzClient = SpritzClient;

        });
        //$('body').prepend('<div class=\"backdrop overlay\">');
        //$('body').append('</div><div class=\"reader-wrapper\"><div data-role=\"spritzer\" id=\"spritzer\"></div></div>');

        var spritzer = $('#spritzer');
        "use strict";
        var headTag = document.getElementsByTagName('head')[0];
        var scriptTag = document.createElement('script');
        scriptTag.src = 'https://sdk.spritzinc.com/js/1.0/js/spritz.min.js';
        scriptTag.async = true;
        scriptTag.onload = initSpritz;
        scriptTag.onreadystatechange = function() {
            if (this.readyState == 'complete') {
                initSpritz();
            }
        };

        headTag.appendChild(scriptTag);

        var spritzerController = null;



        function initSpritz() {
            var spritzController = $("#spritzer").data("controller");

            var container = $("#spritzer");
            var locale = "en_us";
            var successHandler = function onSpritzifySuccess(text){
                alert("spritzify success!" + text);

                spritzController.setSpritzText(text);
                console.log("Spritz fetched the text!");
            };
            var onSpritzifyFailure = function onSpritizfyFailure() {
                alert("Fail");
            }

            SpritzClient.spritzify(text, locale, successHandler, onSpritzifyFailure);
        }

    })(jQuery);

    sendResponse('done');
})
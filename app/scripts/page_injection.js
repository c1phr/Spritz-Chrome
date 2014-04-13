/**
 * Created by ryanbatchelder on 4/12/14.
 */
alert("Injected!");
$("body").prepend("<div class='backdrop overlay'>");
$("body").append("</div><div class='reader-wrapper'><div data-role='spritzer' id='spritzer'></div></div>");
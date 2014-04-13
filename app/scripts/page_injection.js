function (tab) {
    alert("injecting");
    $("body").prepend("<div class='backdrop overlay'>");
    $("body").append("</div><div class='reader-wrapper'><div data-role='spritzer' id='spritzer'></div></div>");
};
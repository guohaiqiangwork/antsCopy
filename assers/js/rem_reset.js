(function (doc, win) {
    var docEle = doc.documentElement,
        resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
        recale = function () {
            var clientWidth = docEle.clientWidth;
            if (!clientWidth) return;
            if (clientWidth < 750) {
                docEle.style.fontSize = clientWidth / 7.5 + "px";
            } else {
                docEle.style.fontSize = "100px";
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recale, false);
    recale();
})(document, window);
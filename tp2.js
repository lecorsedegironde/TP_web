var startCarre = 1;
var intervalId1, intervalId2;

startFunction = function () {
    clearInterval(intervalId1);
    intervalId1 = setInterval(intervalFunction, 10);
    intervalId2 = setInterval(startCarreFunc, 1000);
};

startCarreFunc = function () {
    startCarre++;
    if (startCarre === document.getElementsByClassName("carre").length) {
        clearInterval(intervalId2);
    }
};

intervalFunction = function () {
    var carres = document.getElementsByClassName("carre");

    for (var i = 0; i < startCarre; i++) {
        carres[i].style.left = (parseInt(carres[i].style.left.split("px")[0]) + 10) + "px";
    }
};

function load(nbCarre) {
    var node = document.getElementById("canvas");

    for (var i = 0; i < nbCarre; i++) {
        var redDiv = document.createElement("div");
        redDiv.className = "carre";
        redDiv.style.left = "10px";
        redDiv.style.top = (i*110 + 10) + "px";
        node.appendChild(redDiv);
    }

    //TP 2
    // intervalId1 = setInterval(intervalFunction, 10);
    //TP 3
    // intervalId1 = setInterval(startFunction, 2000);
    //TP 4
    intervalId1 = setInterval(startFunction, 4000);
}
var disp = 0;
var intervalId;

startFunction = function () {
    clearInterval(intervalId);
    intervalId = setInterval(intervalFunction, 10);
};

intervalFunction = function () {
    var carres = document.getElementsByClassName("carre");

    disp += 10;

    for (var i = 0; i < carres.length; i++) {
        carres[i].style.left = disp + "px";
    }
};

function load() {
    var node = document.getElementById("canvas");

    var redDiv = document.createElement("div");
    redDiv.className = "carre";
    redDiv.style.left = "0px";

    node.appendChild(redDiv);

    //TP 2
    // intervalId = setInterval(intervalFunction, 10);
    //TP 3
    intervalId = setInterval(startFunction, 2000);
}
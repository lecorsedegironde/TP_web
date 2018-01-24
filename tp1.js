var cpt;
var intervalId;

var intervalFunction = function () {
    document.getElementById("my_p").innerText = cpt;
    if (cpt === 0) {
        clearInterval(intervalId)
    } else {
        cpt--;
    }
};

function load() {
    cpt = 10;
    var node = document.getElementById("cpt");

    var pText = document.createElement("p");
    var countText = document.createTextNode("");
    pText.appendChild(countText);
    pText.id = "my_p";
    node.appendChild(pText);

    intervalId = setInterval(intervalFunction, 1000);
}


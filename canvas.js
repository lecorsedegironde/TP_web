var posX = 0, posY = 0, offsetX = 0, offsetY = 0;
var disp = false;

window.onload = function () {
    //On récupère le canvas pour pouvoir dessiner dedans
    var canvas = document.getElementById("canvas");

    if (!canvas) {
        alert("Impossible de récupérer le canvas");
        return;
    }

    //On récupère maintenant le contexte 2d du canvas
    var context = canvas.getContext('2d');

    if (!context) {
        alert("Impossible de récupérer le context du canvas");
        return;
    }

    //Taille canvas
    canvas.width = 800;
    canvas.height = 365;

    //Chargement de l'image
    var coinImage = new Image();
    coinImage.src = "coin-sprite-animation.png";

    var coinSprite = sprite({
        context: context,
        width: 100,
        height: 100,
        image: coinImage,
        ticksPerFrame: 2,
        numberOfFrames: 10
    });

    function updateGame() {
        //Mise à jour du sprite
        coinSprite.update();
    }

    function drawGame() {
        //On vide l'écran
        context.clearRect(0, 0, canvas.width, canvas.height);
        //On rend l'image
        coinSprite.render();
    }

    var mainloop = function () {
        updateGame();
        drawGame();
    };

    var animFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        null;

    var recursiveAnim = function () {
        mainloop();
        animFrame(recursiveAnim);
    };

    canvas.onmousedown = function (e) {
        if ((e.clientX >= posX && e.clientX <= posX + coinSprite.width)
            && (e.clientY >= posY && e.clientY <= posY + coinSprite.height)) {
            disp = true;
            offsetX = posX - e.clientX;
            offsetY = posY - e.clientY;
        }
    };

    canvas.onmouseup = function () {
        disp = false;
    };

    canvas.onmousemove = function (e) {
        if (disp === true) {
            posX = e.clientX;
            posY = e.clientY;

            posX += offsetX;
            posY += offsetY;

            if (posX <= 0) posX = 0;
            if (posY <= 0) posY = 0;
            if (posX >= canvas.width - coinSprite.width) posX = canvas.width - coinSprite.width;
            if (posY >= canvas.height - coinSprite.height) posY = canvas.height - coinSprite.height;

        }
    };

    canvas.onmouseleave = function () {
        disp = false;
    };

    // start the mainloop
    animFrame(recursiveAnim);
};

function sprite(options) {
    var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    //Mettre à jour le sprite
    that.update = function () {

        //On augmente le compteur de mises à jour
        tickCount += 1;

        //Si on doit passer à la frame suivante
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            //Si on est pas arrivé au bout de l'animation
            if (frameIndex < numberOfFrames - 1) {
                frameIndex += 1;
            } else {
                //Sinon on reboucle
                frameIndex = 0;
            }
        }
    };

    //Dessiner la bonne image
    that.render = function () {
        that.context.drawImage(
            that.image,
            frameIndex * that.width,
            0,
            that.width,
            that.height,
            posX,
            posY,
            that.width,
            that.height);
    };

    return that;
}
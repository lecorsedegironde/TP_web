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
    canvas.width = 500;
    canvas.height = 300;

    //Keys
    var keys = {
        UP: 38,
        DOWN: 40,
        SPACE: 32,
        ENTER: 13
    };

    var keyStatus = {};

    function keyDownHandler(event) {
        var keycode = event.keyCode,
            key;
        for (key in keys) {
            if (keys[key] == keycode) {
                keyStatus[keycode] = true;
                event.preventDefault();
            }
        }
    }

    function keyUpHandler(event) {
        var keycode = event.keyCode,
            key;
        for (key in keys)
            if (keys[key] == keycode) {
                keyStatus[keycode] = false;
            }

    }

    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);

    /*** Chargement des assets ***/
        //Background
    var imgBackground;
    var xBackgroundOffset = 0;
    var xBackgroundSpeed = 1;
    var backgroundWidth = 1782;
    var backgroundHeight = 600;

    // Hero Player
    var imgPlayer = new Image();
    imgPlayer.src = "assets/Ship/Spritesheet_64x29.png";

    var spritePlayer = sprite({
        context: context,
        width: 64,
        height: 29,
        image: imgPlayer,
        x: 20,
        y: 100,
        ySpeed: 10,
        ticksPerFrame: 2,
        numberOfFrames: 4
    });


    function updateGame() {
        updateScene();
        updateItems();
    }

    function updateScene() {
        xBackgroundOffset = (xBackgroundOffset - xBackgroundSpeed) % backgroundWidth;
    }

    function updateItems() {
        spritePlayer.clearScreen();
        var keycode;
        for (keycode in keyStatus) {
            if (keyStatus[keycode] == true) {
                if (keycode == keys.UP) {
                    spritePlayer.up();
                }
                if (keycode == keys.DOWN) {
                    spritePlayer.down();
                }
                if (keycode == keys.SPACE) {
                    //shoot
                }
            }
            keyStatus[keycode] = false;
        }
        spritePlayer.update();
    }

    function drawGame() {
        //On rend le background
        canvas.style.backgroundPosition = xBackgroundOffset + "px 0px";
        spritePlayer.render();
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
    that.x = options.x || 0;
    that.y = options.y || 0;
    that.ySpeed = options.ySpeed || 10;

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

    //Fonctions de déplacement
    that.up = function () {
        that.y -= that.ySpeed;

        //Tests pour pas sortir de l'écran
        if (that.y <= 0) {
            that.y = 0;
        }
    };

    that.down = function () {
        that.y += that.ySpeed;

        //Tests pour pas sortir de l'écran
        if (that.y + that.height >= 300) {
            that.y = 300 - that.height;
        }
    };

    //Dessiner la bonne image
    that.render = function () {
        that.context.drawImage(
            that.image,
            0,
            frameIndex * that.height,
            that.width,
            that.height,
            that.x,
            that.y,
            that.width,
            that.height);
    };

    //Efface l'écran
    that.clearScreen = function () {
        that.context.clearRect(
            that.x,
            that.y,
            that.width,
            that.height);
    };

    return that;
}

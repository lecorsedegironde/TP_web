var posX = 0, posY = 0, destX = 0, destY = 0;

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
    var heroImage = new Image();
    heroImage.src = "hero_walk_cycle_spritesheet_by_mrnoobtastic-d3defej.png";

    var heroSprite = sprite({
        context: context,
        width: 128,
        height: 128,
        image: heroImage,
        ticksPerFrame: 4,
        numberOfFrames: 4
    });
    heroSprite.setIdle();

    function updateGame() {
        //Mise à jour du sprite
        heroSprite.update();
    }

    function drawGame() {
        //On vide l'écran
        context.clearRect(0, 0, canvas.width, canvas.height);
        //On rend l'image
        heroSprite.render();
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
        destX = e.clientX;
        destY = e.clientY;
        heroSprite.setMovement();
    };

    // start the mainloop
    animFrame(recursiveAnim);
};

function sprite(options) {
    var that = {},
        frameIndex = 0,
        tickCount = 0,
        direction = 2,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1,
        idle = true;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    //Mettre à jour le sprite
    that.update = function () {

        if (!idle) {
            //Mise à jour du mouvement
            if (posY + that.height < destY + 10 && posY + that.height > destY - 10) {
                if (posX + that.width / 2 < destX + 10 && posX + that.width / 2 > destX - 10) {
                    that.setIdle();
                } else if (posX + that.width / 2 > destX - 10) {
                    posX -= 10;
                    direction = 0;
                } else if (posX + that.width / 2 < destX + 10) {
                    posX += 10;
                    direction = 1;
                }
            } else if (posY + that.height > destY - 10) {
                posY -= 10;
                direction = 3;
            } else if (posY + that.height < destY + 10) {
                posY += 10;
                direction = 2;
            }

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
        }
    };

    that.setIdle = function () {
        idle = true;
        direction = 2;
        frameIndex = 3;
    };

    that.setMovement = function () {
        idle = false;
    };

    //Dessiner la bonne image
    that.render = function () {
        that.context.drawImage(
            that.image,
            frameIndex * that.width,
            direction * that.height,
            that.width,
            that.height,
            posX,
            posY,
            that.width,
            that.height);
    };

    return that;
}
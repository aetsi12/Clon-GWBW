var GWBW = {};

GWBW.Preload = function(){};

GWBW.Preload.prototype = {
    init: function(){
        this.input.maxPointers = 1; //Solo un puntero activo en cada momento
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true; //Alineado horizontal
        this.scale.pageAlignVertically = true; //Alineado vertical

        this.time.desiredFps = 60; //Molaría e.e
    },

    preload: function(){
        this.load.path = "media/fonts/";
        this.load.bitmapFont("fipps");
        this.load.bitmapFont("minecraft");

        this.load.path = "media/sounds/";
        this.load.audio("wind", ["wind1.ogg", "wind1.mp3"]);
        this.load.audio("bso", ["watching4.ogg", "watching4.mp3"]);
        this.load.audio("campfireSnd", ["hoguera.ogg", "hoguera.mp3"]);
        this.load.audio("stepsSnd", ["snow_steps.ogg", "snow_steps.mp3"]);
        this.load.audio("keyboard", ["keyboard.ogg", "keyboard.mp3"]);

        this.load.path = "media/";
        this.load.images(["fondo", "titulo"]);
        this.load.spritesheet("crosshair", "white_crosshair_16.png", 16, 16);
        this.load.spritesheet("cursor", "cursor.png", 10, 13);
        this.load.spritesheet("water", "agua-302x58-6x84.png", 302, 58);
        this.load.spritesheet("planet1", null, 14, 13);
        this.load.spritesheet("planet2", null, 9, 9);
        this.load.spritesheet("campfire", "hoguera-70x57-146x129.png", 70, 57);
        this.load.spritesheet("radio", "radio-75x57-245x127.png", 75, 57);
        this.load.spritesheet("meat", "carne-57x48-9x159.png", 57, 48);
        this.load.spritesheet("burden", "prota-57x69.png", 57, 69);
        this.load.spritesheet("doctor", "doctor-54x54-76x123.png", 54, 54);
        this.load.spritesheet("soldier", "soldado-68x75-7x109.png", 68, 75);
        this.load.spritesheet("scientist", "ingeniero-52x68-234x105.png", 52, 68);
        this.load.spritesheet("girl", "chica-61x48-102x114.png", 61, 48);
        this.load.spritesheet("dog", "perrito-31x34.-9x142.png", 31, 34);
        this.load.spritesheet("robot", "robot-65x81-247x113.png", 65, 81);

        this.load.path = "js/data/";
        this.load.json("entities"); //Aqui se guardan las entidades del juego -> El eje "z" es la prioridad de pintado.

    },

    create: function(){
        this.state.start("GWBW.Introduction");
    }
}

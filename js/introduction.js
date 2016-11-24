GWBW.Introduction = function(){};

GWBW.Introduction.txtArray = [
    '2257 dC\n',
    'El Sargento lidera un equipo de investigación para la EC-UD\n',
    '(Everdusk Company for Universe Discovery).\n',
    'Su equipo estaba recopilando información sobre el virus Medusea, \n',
    'una plaga originaria del planeta Sineicos, \n',
    'cuando fue atacados por un grupo de bioterroristas \n',
    'autodenominados "comando XENOLIFER". \n \n',
    'Los datos de su investigacion fueron robados. \n',
    'En las manos equivocadas esto podria suponer el fin de \n',
    'la II Ciberguerra y el inicio de la era del terror espacial. \n \n',
    'Para evitar que esto suceda, su equipo deberá sobrevivir \n',
    'en los inhospitos yermos de Sineicos; \n',
    'luchar contra el hambre, el frío y la locura; \n',
    'combatir -además- los posibles brotes del virus Medusea, \n',
    'conocido por paralizar el cuerpo de sus víctimas; \n',
    'y reparar su Estacion de Radio para enviar un mensaje \n',
    'al Convoy Orbital que cruzará el cielo de Sineicos en 40 días: \n',
    'se trata de su ÚNICA vía de escape. \n',
    '\n \n',
    'Usted es el Sargento . \n \n',
    'Recuerde... \n',
    '\n'
];

GWBW.Introduction.prototype = {
    create: function(){
        var txt = "";
        for(var i=0; i<GWBW.Introduction.txtArray.length; i++){
            txt += GWBW.Introduction.txtArray[i];
        }

        //EMPEZAMOS
        //(x, y, tipografia, texto, tamaño)
        this.introTxt = this.add.bitmapText(this.world.centerX, 4, "minecraft", txt, 7.5);
        this.introTxt.anchor.x=0.5;
        this.introTxt.smoothed = false;
        this.introTxt.tint = 0xffffff;
        this.introTxt.align = "center";

        //añadimos "wind" a music(nombre, volumen, repetirse en bucle)
        this.music = this.add.audio("wind", 0, true);
        //Cuando la cancion haya sido decodificada (es decir, que haya cargado) llamamos a startMusic.
        this.music.onDecoded.add(this.startMusic, this);

        //Al presionar el puntero de entrada una única vez se ejecuta showTitle
        this.input.onDown.addOnce(this.showTitle, this);
    },

    //SHOW TITLE
    showTitle: function(){
        //Eliminamos el texto introductorio
        this.introTxt.kill();

        //Mostramos el subtítulo del juego
        this.introTxt = this.add.bitmapText(this.world.centerX, 150, "minecraft", "(Los dioses estarán viginaldo)", 10);
        this.introTxt.anchor.x = 0.5;
        this.introTxt.smoothed = false;
        this.introTxt.tint = 0xffffff;
        this.introTxt.align = "center";

        //Mostramos el logo del juego
        var title = this.add.image(this.world.centerX, this.world.centerY -20, "titulo");
        title.anchor.set(0.5);

        //Mostramos las instrucciones para empezar la partida
        this.startTxt = this.add.bitmapText(this.world.centerX, 190, "fipps", "Click para jugar", 8);
        this.startTxt.anchor.x = 0.5;
        this.startTxt.smoothed = false;
        this.startTxt.tint = 0xffff00;

        //El texto se mostrará y se ocultará continuamente cada 750 milisegundos gracias al timer, a la función toggleStartText y a la propiedad visible
        this.startTxt.visible = false;

        //Creamos una instancia de la clase Timer
        var timerTxt = this.time.create();
        //Llamará a la funcón toggleStartTxt cada 750 milisegundos
        timerTxt.loop(750, this.toggleStartTxt, this);
        timerTxt.start();

        //Al presionar el puntero de entrada una única vez se ejecuta startGame
        this.input.onDown.addOnce(this.startGame, this);
    },

    //START GAME
    startGame: function(){
        this.state.start("GWBW.Game", true, false, this.music);
    },

    //START MUSIC
    startMusic: function(){
        this.music.play(); //Empieza la música!
        //(fade) Elevación progresiva y suave del volumen
        //(tiempo(milisegundos), volumen final) -> 0.25 = 25% del volumen total
        this.music.fadeTo(8000, 0.25);
    },

    //TOGGLE START TEXT
    toggleStartTxt: function(){
        this.startTxt.visible = this.startTxt.visible ? false : true;
    }


}

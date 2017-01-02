GWBW.Game = function(){};

GWBW.Game.prototype = {
    init: function(wind){
        this.wind = wind;
        this.fadeAlpha = { value: 1 };

        this.entities = [] //Array de entidades!

        this.game.canvas.style.cursor = "none"; //Ocultamos cursor del sistema

        this.SOLDIER_ID = 0;
        this.DOCTOR_ID = 1;
        this.SCIENTIST_ID = 2;
        this.GIRL_ID = 3;
        this.BURDEN_ID = 5;
        this.ROBOT_ID = 6;

        this.STATE_CALM = 1;
        this.STATE_NERVOUS = 2;
        this.STATE_STRESSED = 3;

        this.countdown = "Faltan 40 días.";
        this.day = 0;
        this.fireAmount = 3;
        this.foodAmount = 30;
        this.radioStatus = 0;
        this.radioMax = 50;

        this.infected = [false, false, false, false]; //Soldier - doctor - scientist - girl
        this.infectionLevel = [0, 0, 0, 0];
        this.sanity = [14, 9, 7, 6]; //Soldier - doctor - scientist - girl
        this.sanityMax = [15, 10, 8, 7]; //Soldier - doctor - scientist - girl
    },

    create: function(){
        //Fade object
        /*La variable fade es una instancia de la clase Graphics23 de Phaser, la cual nos da acceso al
        pintado de formas primitivas tales como círculos o rectángulos, casi como si estuviéramos
        haciéndolo directamente desde JavaScript. De esta forma podemos pintar un recuadro
        negro que cubra todo el escenario, independientemente de cuál sea su tamaño.*/
        this.fade = this.game.add.graphics(0,0);
        this.fade.z = 500;
        this.fade.beginFill(0x000000, this.fadeAlpha.value);
        this.fade.drawRect(0,0, this.world.width, this.world.heigth);
        this.fade.endFill();

        //countdown bitmap text
        this.countdownTxt = this.add.bitmapText(this.world.centerX, this.world.centerY/2, "minecraft", this.countdown,10);
        this.countdownTxt.anchor.x = 0.5;
        this.countdownTxt.smoothed = false;
        this.countdownTxt.tint = 0xffffff;
        this.countdownTxt.align = "center";
        this.countdownTxt.z = 501;

        //Background
        this.add.image(0,0, "fondo");

        //Música
        this.wind.fadeOut(4000); //Para que el sonido vaya fundiendose con la música del juego
        this.music = this.add.audio("bso", 0, true);
        this.music.onDecoded.add(this.startMusic, this); //Al cargar la música llama a startMusic (que la reproduce);

        //Sonidos
        this.stepsSnd = this.add.audio("stepsSnd", 0.1, true);
        this.campfireSnd = this.add.audio("campfireSnd", 0.2, true);

        //GENERACIÓN DINÁMICA DE ENTIDADES
        var entities = this.cache.getJSON("entities").entities; //Guardamos el Array de objetos entities en la variable
        for(var q=0, i=entities.length; q<i; q++){
            var e = entities[q];
            this[e.name] = this.add.sprite(e.x, e.y, e.name); //Añade instancia de clase sprite (en su posición y todo e.e)
            this[e.name].z = e.z; //Prioridad de pintado
            for(var j=0, k=e.anims.length; j<k; j++){ //Añadimos todas las animaciones definidas
                this[e.name].animations.add(e.anims[j].name, e.anims[j].frames, e.anims[j].rate, e.anims[j].loop);
            }
            this[e.name].play(e.start); //La animación que debe reproducirse inicialmente, o por defecto
            this[e.name].gameLink = this.game.state.getCurrentState(); //Creamos un puntero enlazado con nuestro estado actual
            //Comprobamos que la configuración de la entidad contenga alguna propiedad llamada init, update  onclick
            //y, si es así, le asignamos el elemento correspondiente.
            //->Los nuevos metodos se jecutaran en el ambito ("scope") de cada entidad (de ahí el uso del bind y, en el caso de onclick,
            // lo vinculamos al evento (Signal) onDown del puntero: cuando el usuario haga "click" en la pantalla alguna entidades se
            //daran cuenta de ella, solo las que estamos configurando para que "escuchen" el evento);
            if(e.init)  this[e.name].custom_init = GWBW.entities_methods[e.init].bind(this[e.name]); //WHAAAT?
            if(e.update) this[e.name].custom_update = GWBW.entities_methods[e.update].bind(this[e.name]);
            if(e.onclick){
                this[e.name].custom_onclick = GWBW.entities_methods[e.onclick].bind(this[e.name]);
                this.input.onDown.add(this[e.name].custom_onclick, this[e.name]);
            }
            this.entities.push(this[e.name]); //Añadimos la entidad al array
            if(this[e.name].custom_init) this[e.name].custom_init(); //Lanzamos su metodo de inicio, si lo tiene.
        }
        this.add.tween(this.fadeAlpha).to({value:0},2500,Phaser.Easing.Quadratic.InOut, true).onComplete.add(function(){
            this.countdownTxt.text = "";
        },this); /*Una instancia de la clase Tween admite, entre otros, el método to21, al cual pasamos como
        parámetros las propiedades que queremos modificar (“value”), el tiempo de duración de la
        animación, el tipo de suavizado (“easing”) de la misma, y si debe arrancar automáticamente
        o no.*/

    },

    startMusic: function(){
        this.music.play();
        this.music.fadeTo(6000, 0.25);
    },

    update: function(){
        //CURSOR
        this.crosshair.x = Math.floor(this.input.mousePointer.x - 8);
        this.crosshair.y = Math.floor(this.input.mousePointer.y - 8);

        for(var q=0, i=this.entities.length; q<i; q++){ //Llamamos a la función update de cada entidad (si la tiene) cada frame
            if(this.entities[q].custom_update) this.entities[q].custom_update();
        }

        this.world.sort("z", Phaser.Group.SORT_ASCENDING); //Todo se pinta en la pantalla de forma ordenada según Z(prioridad).
    },

    render: function(){
        if(this.fadeAlpha.value){
            this.fade.clear();
            this.fade.beginFill(0x000000, this.fadeAlpha.value);
            this.fade.drawRect(0, 0, this.world.width, this.world.height);
            this.fade.endFill();
        }
    }
};

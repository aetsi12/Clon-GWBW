GWBW.entities_methods = {
    //La posición de los planetas varía en función del día en el que se desarrolle la partida actual
    //Es decir, que veremos como se desplazan en el horizonte mientras pasan las jornadas en el juego.
    //Aquí hay un pequeño fallo, ya que esto va a activarse una vez por día y los estamos comprobando 60 veces por segundo...
    planet1_update: function() {
        this.x = 170 + this.game.state.getCurrentState().day;
    },
    planet2_update: function() {
        this.x = 150 + this.game.state.getCurrentState().day * 2;
    },
    campfire_update: function() {
        var game = this.game.state.getCurrentState();
        this.play("fire" + game.fireAmount);
        if (!game.fireAmount) game.campfireSnd.stop();
    },
    radio_update: function() {
        var game = this.game.state.getCurrentState();
        if (game.radioStatus >= game.radioMax)        this.play("radio3");
        if (game.radioStatus < game.radioMax)         this.play("radio2");
        if (game.radioStatus <= game.radioMax / 3)    this.play("radio1");
    },
    meat_update: function() {
        var game = this.game.state.getCurrentState();
        if (game.foodAmount > 30)    this.play("meat4");
        if (game.foodAmount <= 30)   this.play("meat3");
        if (game.foodAmount <= 16)   this.play("meat2");
        if (game.foodAmount <= 6)    this.play("meat1");
    },
    burden_init: function() {
        //Valores iniciales
        this.speed = 45;
        this.target = 0;
        this.isWalking = false;
        this.flip = false;

        this.anchor.x = 0.5; //Ancla el grafico en la mitad de su eje x
        this.y = this.gameLink.world.height - this.height - 15; //ancla en grafico en la posición inicial en el eje y
        this.gameLink.physics.arcade.enable(this); //Activa motor de fisicas para el (gracias al puntero que almacena el estado [gameLink])
    },
    burden_update: function() {
        //Si Burden no está disparando, comprobamos si ha rebasado el objetivo asignado y, en ese caso, lo detenemos.
        if (this.animations.currentAnim != this.animations.shoot) {
            if (this.body.velocity.x > 0 && this.x > this.target) {
                this.body.velocity.x = 0;
            }
            if (this.body.velocity.x < 0 && this.x < this.target) {
                this.body.velocity.x = 0;
            }

            //No nos interesa que rebase hacia la izquierda la pos 39px pues ahí va a estar un objeto con el que tropezará
            if (this.x < 39) {
                this.body.velocity.x = 0;
                this.x = 39;
            }
            if (!this.body.velocity.x) { //Si está parado (porque un numero positivo es true)
                this.play("idle"); //animación de quieto
            }
        } else {
            //Si está disparando no puede moverse. D
            this.body.velocity.x = 0;
            //Lo ponemos en idle cuando termine la animación.
            if (this.frame >= 9) this.play("idle");
        }
        //Lo volteamos si es necesario para que mire a la dirección adecuada
        //Comenta esto si quieres un prota que baile el moonwalking e.e
        var flipX = this.flip ? -1 : 1;
        this.scale.set(flipX, 1);

        //Activar y desactivar el sonido de los pasos al andar
        if (this.body.velocity.x && !this.isWalking) {
            this.gameLink.stepsSnd.play();
            this.isWalking = true;
        } else if (!this.body.velocity.x) {
            this.gameLink.stepsSnd.stop();
            this.isWalking = false;
        }
    },
    burden_onclick: function() {
        //MOdificamos el objetivo (target) al que se dirige Burden tomando la posición del puntero en el eje x
        //Velocidad positiva o negativa en función de si anda hacia la izquierda o a la derecha
        //Volteamos (con flip) la imagen hacia donde camina
        this.target = this.gameLink.input.x;
        if (this.x > this.target) {
            this.body.velocity.x = -this.speed;
            this.flip = false;
        } else {
            this.body.velocity.x = this.speed;
            this.flip = true;
        }
        this.play("walk"); //la animación
    },
    doctor_update: function() {
        if (this.animations.currentAnim != this.animations.die) {
            if (this.gameLink.infected[this.gameLink.DOCTOR_ID]) {
                this.play("infected");
            } else {
                if (this.gameLink.sanity[this.gameLink.DOCTOR_ID] > 7)  this.state = this.gameLink.STATE_CALM;
                if (this.gameLink.sanity[this.gameLink.DOCTOR_ID] <= 7) this.state = this.gameLink.STATE_NERVOUS;
                if (this.gameLink.sanity[this.gameLink.DOCTOR_ID] <= 4) this.state = this.gameLink.STATE_STRESSED;
                this.play('idle' + this.state);
            }
        }
    },
    soldier_update: function() {
        if (this.animations.currentAnim != this.animations.die) {
            if (this.gameLink.infected[this.gameLink.SOLDIER_ID]) {
                 this.play("infected");
            } else {
                if (this.gameLink.sanity[this.gameLink.SOLDIER_ID] > 9)  this.state = this.gameLink.STATE_CALM;
                if (this.gameLink.sanity[this.gameLink.SOLDIER_ID] <= 9) this.state = this.gameLink.STATE_NERVOUS;
                if (this.gameLink.sanity[this.gameLink.SOLDIER_ID] <= 5) this.state = this.gameLink.STATE_STRESSED;
                this.play('idle' + this.state);
            }
        }
    },
    scientist_update: function() {
        if (this.animations.currentAnim != this.animations.die) {
            if (this.gameLink.infected[this.gameLink.SCIENTIST_ID]) {
                 this.play("infected");
            } else {
                if (this.gameLink.sanity[this.gameLink.SCIENTIST_ID] > 6)  this.state = this.gameLink.STATE_CALM;
                if (this.gameLink.sanity[this.gameLink.SCIENTIST_ID] <= 5) this.state = this.gameLink.STATE_NERVOUS;
                if (this.gameLink.sanity[this.gameLink.SCIENTIST_ID] <= 3) this.state = this.gameLink.STATE_STRESSED;
                this.play('idle' + this.state);
            }
        }
    },
    girl_update: function() {
        if (this.animations.currentAnim != this.animations.die) {
            if (this.gameLink.infected[this.gameLink.GIRL_ID]) {
                 this.play("infected");
            } else {
                if (this.gameLink.sanity[this.gameLink.GIRL_ID] > 5)  this.state = this.gameLink.STATE_CALM;
                if (this.gameLink.sanity[this.gameLink.GIRL_ID] <= 5) this.state = this.gameLink.STATE_NERVOUS;
                if (this.gameLink.sanity[this.gameLink.GIRL_ID] <= 3) this.state = this.gameLink.STATE_STRESSED;
                this.play('idle' + this.state);
            }
        }
    }
};

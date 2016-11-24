//(ancho, alto, modo de renderizado, contenedor o elemento "padre" del DOM, objeto por defecto, transpariencia, suavizado o "antialias");
var game = new Phaser.Game(320, 215, Phaser.CANVAS, "screen", GWBW.Preload, false, false);

game.state.add("GWBW.Preload", GWBW.Preload);
game.state.add("GWBW.Introduction", GWBW.Introduction);
game.state.add("GWBW.Game", GWBW.Game);

game.state.start("GWBW.Preload");

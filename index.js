
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://localhost:8000/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'flappy.png');
    game.load.image('platform', 'pipe.png');

}
var player;
var platforms;
var cursors;
var jumpButton;
var velocity=100;
var timer;

function create() {

    player = game.add.sprite(100, 200, 'player');

    game.physics.arcade.enable(player);

    //  Create our Timer
    timer = game.time.create(false);
    queuePlatform();
    timer.start();

    player.body.collideWorldBounds = true;
    player.body.gravity.y  = 500;
    player.body.velocity.x = 100;

    platforms = game.add.physicsGroup();

    //platforms.create( 500, 150, 'platform');
    //platforms.create(-200, 300, 'platform');
    //platforms.create( 400, 450, 'platform');

    //platforms.setAll('body.gravity', );
    //platforms.setAll('body.immovable', true);
    //platforms.setAll('body.velocity.x', velocity);
    newPlatform();
    //platforms.setAll('body.immovable.y', true);

    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}
function queuePlatform() {
    game.time.events.add(Phaser.Timer.SECOND*10/velocity, newPlatform, this);
}

function newPlatform() {
  var randomNum1 = 600-Math.floor(Math.random() * 250);
  var randomNum2 = -200-Math.floor(Math.random() * 250);
  //var randomNum2 = 600-Math.floor(Math.random() * 150);
  velocity = velocity + 10;
  platforms.create(750, randomNum1, 'platform');
  platforms.create(750, randomNum2, 'platform');
  platforms.setAll('body.immovable', true);
  platforms.setAll('body.velocity.x', -velocity);
  queuePlatform();
}

function update () {

    game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;

    if (jumpButton.isDown)
    {
        player.body.velocity.y = -400;
    }

    if (player.body.onFloor() || player.body.touching.down) {
      var text = "YOU DIED! TLDR";
      var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
      var t = game.add.text(game.world.centerX-300, 0, text, style);
      setTimeout(function(){history.go(0); }, 1000)
    }
}

function render () {

}


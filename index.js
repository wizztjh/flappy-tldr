
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

function create() {

    player = game.add.sprite(100, 200, 'player');

    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;
    player.body.gravity.y  = 500;
    player.body.velocity.x = 100;

    platforms = game.add.physicsGroup();

    platforms.create( 500, 150, 'platform');
    platforms.create(-200, 300, 'platform');
    platforms.create( 400, 450, 'platform');
    newPlatform();

    //platforms.setAll('body.gravity', );
    platforms.setAll('body.immovable', true);
    platforms.setAll('body.gravity.x', -30);
    //platforms.setAll('body.immovable.y', true);

    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function newPlatform() {
  var randomNum = Math.floor(Math.random() * 500);
  platforms.create(750, randomNum, 'platform');
}

function update () {

    game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;

    if (jumpButton.isDown)
    {
        player.body.velocity.y = -400;
    }
}

function render () {

}


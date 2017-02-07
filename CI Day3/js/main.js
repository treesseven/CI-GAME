var Nakama = {};
Nakama.configs = {
  bulletSpeed : 1000,
  shipSpeed   : 500,
  enemySpeed  : 500
};

window.onload = function(){
  Nakama.game = new Phaser.Game(640,960,Phaser.AUTO,'',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    }, false, false
  );
}

// preparations before game starts
var preload = function(){
  Nakama.game.scale.minWidth = 320;
  Nakama.game.scale.minHeight = 480;
  Nakama.game.scale.maxWidth = 640;
  Nakama.game.scale.maxHeight = 960;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Nakama.game.time.advancedTiming = true;

  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.image('background', 'Assets/Map1.png');
}

// initialize the game
var create = function(){
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;
  Nakama.playerBulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyBulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();

  //Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  //Nakama.playerGroup = Nakama.game.add.physicsGroup();

  Nakama.players = [];
  Nakama.players.push(new ShipControllerType1(400, 200, {
    up : Phaser.Keyboard.UP,
    down : Phaser.Keyboard.DOWN,
    left : Phaser.Keyboard.LEFT,
    right : Phaser.Keyboard.RIGHT,
    fire : Phaser.Keyboard.ENTER,
    cooldown : 0.2
  }));

  Nakama.players.push(new ShipControllerType2(200, 200,  {
    up : Phaser.Keyboard.W,
    down : Phaser.Keyboard.S,
    left : Phaser.Keyboard.A,
    right : Phaser.Keyboard.D,
    fire : Phaser.Keyboard.SPACEBAR,
    cooldown : 0.2
  }));

  Nakama.enemies = [];
  Nakama.enemies.push(new EnemyController(300, 50, "EnemyType1.png", {
    minX : 100,
    maxX : 540,
    tweenTime : 3,
    health : 10
  }))
}

// update game state each frame
var update = function(){
  for (var i=0; i < Nakama.players.length; i++){
    Nakama.players[i].update()
  }
  Nakama.enemies[0].update()

  Nakama.game.physics.arcade.overlap(Nakama.playerBulletGroup, Nakama.enemyGroup, onBulletHitEnemy)
}

// before camera render (mostly for debug)
var render = function(){}

var onBulletHitEnemy = function(bulletSprite, enemySprite){
  enemySprite.damage(1);
  bulletSprite.kill();
}

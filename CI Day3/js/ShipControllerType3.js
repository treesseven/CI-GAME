class ShipControllerType3 {
  constructor(x, y, configs){
    this.sprite = Nakama.playerGroup.create(
      x,
      y,
      "assets",
      "Spaceship3-Player.png"
    );
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.collideWorldBounds = true;
    this.configs = configs;
    this.timeSinceLastFire = 0
  };

  update(){
    if (Nakama.keyboard.isDown(this.configs.up)){
      this.sprite.body.velocity.y = -Nakama.configs.shipSpeed;
    }
    else if (Nakama.keyboard.isDown(this.configs.down)){
      this.sprite.body.velocity.y = Nakama.configs.shipSpeed;
    }
    else {
      this.sprite.body.velocity.y = 0
    }

    if (Nakama.keyboard.isDown(this.configs.left)){
      this.sprite.body.velocity.x = -Nakama.configs.shipSpeed;
      this.sprite.frameName = "Spaceship3Left-Player.png";
    }
    else if (Nakama.keyboard.isDown(this.configs.right)){
      this.sprite.body.velocity.x = Nakama.configs.shipSpeed;
      this.sprite.frameName = "Spaceship3Right-Player.png";
    }
    else {
      this.sprite.body.velocity.x = 0;
      this.sprite.frameName = "Spaceship3-Player.png";
    }

    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;

    if (Nakama.keyboard.isDown(this.configs.fire)
    && this.timeSinceLastFire > this.configs.cooldown){
      this.fire({ x : -1,
                  y :-1});
      this.fire({ x :  1,
                  y :-1});
      this.fire({ x :  0,
                  y :-1});
      this.fire({ x : -0.5,
                  y : -1})
      this.fire({ x : 0.5,
                  y : -1})
      this.timeSinceLastFire = 0;
    };

  };
  fire(direction){
    new BulletType1Controller(
      this.sprite.position,
      "BulletType1.png",
      new Phaser.Point(direction.x, direction.y)

    )
  }
}

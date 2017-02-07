class EnemyController {
  constructor(x, y, spriteName, configs){
    this.sprite = Nakama.enemyGroup.create(
      x,
      y,
      "assets",
      spriteName
    )
    this.configs = configs;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    //this.sprite.body.collideWorldBounds = true;
    //this.sprite.body.velocity.x = Nakama.configs.enemySpeed;
    this.timeSinceSpawn = 0;
    this.sprite.health = this.configs.health;
  }

  update(){
    //console.log(this.sprite.body.blocked.right)
    //console.log(this.sprite.body.velocity.x)
    this.timeSinceSpawn += Nakama.game.time.physicsElapsed;
    this.sprite.position.x = (this.configs.minX + this.configs.maxX)/2
    + (this.configs.maxX - this.configs.minX)/2
    * Math.sin((this.timeSinceSpawn/this.configs.tweenTime) * Math.PI * 2)

  }
}

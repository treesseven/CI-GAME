class EnemyController {
  constructor(x, y, spriteName, configs){
    this.sprite = Nakama.enemyGroup.create(
      x,
      y,
      "assets",
      spriteName
    )
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.velocity.x = Nakama.configs.enemySpeed;
  }

  update(){
    //console.log(this.sprite.body.blocked.right)
    //console.log(this.sprite.body.velocity.x)
    if (this.sprite.body.blocked.left == true){
      //console.log(this.sprite.body.velocity.x)
      this.sprite.body.velocity.x = Nakama.configs.enemySpeed;
      //console.log(this.sprite.body.velocity.x)
    }

    if (this.sprite.body.blocked.right == true){
      this.sprite.body.velocity.x = -Nakama.configs.enemySpeed;
    }
  }

}

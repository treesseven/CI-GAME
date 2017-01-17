class BulletController{
  constructor(position, spriteName, direction){
    this.sprite = Nakama.bulletGroup.create(
      position.x,
      position.y,
      "assets",
      spriteName
    );
    this.sprite.anchor = new Phaser.Point(0.5, 0.5)
    this.sprite.body.checkWorldBounds = true;
    this.sprite.body.outOfBoundsKill = true;

    this.sprite.body.velocity = direction.setMagnitude(Nakama.configs.bulletSpeed);
  }
}

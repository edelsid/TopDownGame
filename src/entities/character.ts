import { Entity } from './entity';

export class Character extends Entity {
  textureKey: string;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, 'player');

    const anims = this.scene.anims;
    const frameRate = 8;
    this.textureKey = texture;

    anims.create({
      key: 'down',
      frameRate,
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 0,
        end: 3,
      }),
      repeat: -1,
    });

    anims.create({
      key: 'up',
      frameRate,
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 12,
        end: 15,
      }),
      repeat: -1,
    });

    anims.create({
      key: 'left',
      frameRate,
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 4,
        end: 7,
      }),
      repeat: -1,
    });

    anims.create({
      key: 'right',
      frameRate,
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 8,
        end: 11,
      }),
      repeat: -1,
    });
  }

  update() {
    const controls = this.scene.input.keyboard?.createCursorKeys();
    if (controls?.up.isDown) {
      this.play('up', true);
      this.setPosition(this.x, this.y - 1);
    } else if (controls?.down.isDown) {
      this.play('down', true);
      this.setPosition(this.x, this.y + 1);
    } else if (controls?.left.isDown) {
      this.play('left', true);
      this.setPosition(this.x - 1, this.y);
    } else if (controls?.right.isDown) {
      this.play('right', true);
      this.setPosition(this.x + 1, this.y);
    } else {
      this.stop();
    }
  }
}

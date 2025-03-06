import { Entity } from './entity';

export class Chesspiece extends Entity {
  private player?: Entity; 
  private interactionDistance: number;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.interactionDistance = 100;
    this.setRectangle(32, 32);
    this.setOrigin(0.5, 0.65);
    this.setStatic(true);
  }

  setUtils(player: Entity) {
    this.player = player;
  }

  update() {
    const player = this.player;
    const distance = Phaser.Math.Distance.Between(this.x, this.y, player!.x, player!.y);
    if (distance < this.interactionDistance) {
      this.scene.interact();
    } else {
      this.scene.stop();
    }
  }
}
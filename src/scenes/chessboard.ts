import chessboard_tiles from '../assets/chessboard.json'
import { Character } from '../entities/character';
import { SIZES } from '../variables';

export class Chessboard extends Phaser.Scene {
  private player?: Character;
  constructor() {
    super ('ChessboardScene');
  }

  preload() {
    this.load.image('chessboard', './src/assets/chessboard.png');
    this.load.tilemapTiledJSON('map', './src/assets/chessboard.json');
    this.load.spritesheet('player', './src/assets/pawn.png', { 
      frameWidth: SIZES.PLAYER.WIDTH, frameHeight: SIZES.PLAYER.HEIGHT 
    });
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage(
      chessboard_tiles.tilesets[0].name, 
      'chessboard', 
      SIZES.TILE, 
      SIZES.TILE
    ) ?? 'chessboard';
    const ground = map.createLayer('ground', tileset, 0, 0);
    const grass = map.createLayer('ground2', tileset, 0, 0);
    const unpassable = map.createLayer('walls', tileset, 0, 0);
    const objects = map.createLayer('objects', tileset, 0, 0);

    this.player = new Character(this, 912, 640, 'player');

    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
  }

  update() {
    this.player?.update();
  }
}
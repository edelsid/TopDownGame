import chessboard_tiles from '../assets/chessboard.json'
import { SIZES } from '../variables';

export class Chessboard extends Phaser.Scene {
  constructor() {
    super ('ChessboardScene');
  }

  preload() {
    this.load.image('chessboard', './src/assets/chessboard.png');
    this.load.tilemapTiledJSON('map', './src/assets/chessboard.json');
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
    
  }
}
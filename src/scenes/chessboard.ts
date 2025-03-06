import chessboard_tiles from '../assets/chessboard.json'
import { Character } from '../entities/character';
import { Chesspiece } from '../entities/chesspiece';
import { SIZES } from '../variables';

export class Chessboard extends Phaser.Scene {
  private player?: Character;
  private chesspiece?: Chesspiece;
  private keyX?: Phaser.Input.Keyboard.Key;
  private victoryText?: Phaser.GameObjects.Text;
  private interactionText?: Phaser.GameObjects.Text;
  constructor() {
    super ('ChessboardScene');
  }

  preload() {
    this.load.image('chessboard', './src/assets/chessboard.png');
    this.load.tilemapTiledJSON('map', './src/assets/chessboard.json');

    this.load.spritesheet('player', './src/assets/pawn.png', { 
      frameWidth: SIZES.PLAYER.WIDTH, frameHeight: SIZES.PLAYER.HEIGHT 
    });
    this.load.spritesheet('knight', './src/assets/red_knight.png', { 
      frameWidth: SIZES.CHESSPIECE.WIDTH, frameHeight: SIZES.CHESSPIECE.HEIGHT 
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

    map.createLayer('ground', tileset, 0, 0);
    map.createLayer('ground2', tileset, 0, 0);
    const unpassable = map.createLayer('walls', tileset, 0, 0);
    const overlay = map.createLayer('overlay', tileset, 0, 0);

    unpassable?.setCollisionByProperty({ collides: true });
    overlay?.setCollisionByProperty({ collides: true });
    overlay?.setDepth(10);

    this.matter.world.convertTilemapLayer(unpassable!);
    this.matter.world.convertTilemapLayer(overlay!);
    
    this.player = new Character(this, 912, 650, 'player');
    this.chesspiece = new Chesspiece(this, 880, 750, 'knight');
    this.chesspiece.setUtils(this.player);

    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.keyX = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    this.victoryText = this.add.text(0, 0, 'Победа', 
      {fontSize: '64px', color: '#fff', align: 'center', backgroundColor: '#000'}
    );
    this.interactionText = this.add.text(0, 0, 'Рассмотреть',
      {fontSize: '16px', color: '#fff', align: 'center', backgroundColor: '#000'}
    );

    const textArr = [this.victoryText, this.interactionText];
    textArr.forEach((text) => {
      text.setDepth(15);
      text.setOrigin(0.5, 0.5);
      text.visible = false;
    });
  }

  setVictory = (): void => {
    this.victoryText?.setPosition(this.player?.body?.position.x, this.player?.body?.position.y);
    this.victoryText!.visible = true;
    this.game.pause();
  }

  interact = (): void => {
    this.interactionText?.setPosition(this.player?.body?.position.x, this.player?.body?.position.y! - 50);
    this.interactionText!.visible = true;
  }

  stop = (): void => {
    this.interactionText!.visible = false;
  }

  update() {
    this.player?.update();
    this.chesspiece?.update();
    if (Phaser.Input.Keyboard.JustDown(this.keyX!)) {
      this.setVictory();
    };
  }
}
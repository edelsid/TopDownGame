import chessboard_tiles from '../../public/assets/chessboard.json'
import { Character } from '../entities/character';
import { Chesspiece } from '../entities/chesspiece';
import { SIZES, MAP_LAYERS, ENTITIES } from '../variables';

export class Chessboard extends Phaser.Scene {
  private player?: Character;
  private knight?: Chesspiece;
  private keyX?: Phaser.Input.Keyboard.Key;
  private victoryText?: Phaser.GameObjects.Text;
  private interactionText?: Phaser.GameObjects.Text;
  constructor() {
    super ('ChessboardScene');
  }

  // Загрузка ассетов карты, персонажа и интерактивного объекта
  preload() {
    this.load.image('chessboard', '/assets/chessboard.png');
    this.load.tilemapTiledJSON('map', '/assets/chessboard.json');

    this.load.spritesheet(ENTITIES.PLAYER, '/assets/pawn.png', { 
      frameWidth: SIZES.PLAYER.WIDTH, frameHeight: SIZES.PLAYER.HEIGHT 
    });
    this.load.spritesheet(ENTITIES.KNIGHT, '/assets/red_knight.png', { 
      frameWidth: SIZES.CHESSPIECE.WIDTH, frameHeight: SIZES.CHESSPIECE.HEIGHT 
    });
  }

  create() {
    // Создание карты
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage(
      chessboard_tiles.tilesets[0].name, 
      'chessboard', 
      SIZES.TILE, 
      SIZES.TILE
    ) ?? 'chessboard';

    map.createLayer(MAP_LAYERS.GROUND, tileset, 0, 0);
    map.createLayer(MAP_LAYERS.GRASS, tileset, 0, 0);
    const unpassable = map.createLayer(MAP_LAYERS.WALLS, tileset, 0, 0);
    const overlay = map.createLayer(MAP_LAYERS.OVERLAY, tileset, 0, 0);

    // Установка непроходимых слоев и наложение некоторых тайлов поверх игрока (верхушки деревьев, шахматных фигур)
    unpassable?.setCollisionByProperty({ collides: true });
    overlay?.setCollisionByProperty({ collides: true });
    overlay?.setDepth(10);

    this.matter.world.convertTilemapLayer(unpassable!);
    this.matter.world.convertTilemapLayer(overlay!);
    
    // Создание персонажа и интерактивной фигурки
    this.player = new Character(this, 912, 650, ENTITIES.PLAYER);
    this.knight = new Chesspiece(this, 880, 750, ENTITIES.KNIGHT);
    this.knight.setUtils(this.player);

    // Настройка границ карты и следование камеры
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    // Создание клавиши для победного сообщения и интерактивных текстов
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

  // Ф-ция показа победного сообщения
  setVictory = (): void => {
    this.victoryText?.setPosition(this.player?.body?.position.x, this.player?.body?.position.y);
    this.victoryText!.visible = true;
    this.game.pause();
  }

  // Ф-ция показа сообщения взаимодействия с объектом
  interact = (): void => {
    this.interactionText?.setPosition(this.player?.body?.position.x, this.player?.body?.position.y! - 50);
    this.interactionText!.visible = true;
  }

  // Ф-ция остановки взаимодействия с объектом
  stop = (): void => {
    this.interactionText!.visible = false;
  }

  update() {
    this.player?.update();
    this.knight?.update();
    if (Phaser.Input.Keyboard.JustDown(this.keyX!)) {
      this.setVictory();
    };
  }
}
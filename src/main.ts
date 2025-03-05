import Phaser from 'phaser';
import scenes from './scenes';
import './style.css';

new Phaser.Game({
  title: 'Wind4Tune test',
  width: 1024,
  height: 768,
  url: '',
  version: '0.1',
  backgroundColor:' #000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  scene: scenes,
});

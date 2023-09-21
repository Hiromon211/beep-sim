import MainScene from './scenes/menu.js';

const url = new URL(location.href);
const canvasDiv = document.getElementById("canvasDiv");
const fsBtn = document.getElementById("fsBtn");

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 960,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  backgroundColor: "#FFFFFF",
  parent: 'canvasDiv',
  scene: MainScene
})

window.settings = {
  showFPS: url.searchParams.get("showFPS")
}

fsBtn.addEventListener('click', (event) => {
  if (canvasDiv.requestFullscreen) {
    canvasDiv.requestFullscreen();
  } else if (canvasDiv.webkitRequestFullscreen) { 
    canvasDiv.webkitRequestFullscreen();
  }
});
export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image("background", "./assets/bg/mfm/menuDesat.png");
  }

  create() {
    this.add.image(480, 360, 'background');

    const options = [
      {
        name: "Ruv",
        script: "./ruv.js",
        sceneName: "RuvScene"
      },
      {
        name: "Sarv",
        script: "./sarv.js",
        sceneName: "SarvScene"
      },
      {
        name: "Sarv Dark",
        script: "./sarv-dark.js",
        sceneName: "SarvDarkScene"
      },
      {
        name: "Sarv Demon",
        script: "./sarv-demon.js",
        sceneName: "SarvDemonScene"
      },
      {
        name: "Selever",
        script: "./selever.js",
        sceneName: "SeleverScene"
      }
    ]

    options.forEach((value, index) => {
      this.add.text(75, (index * 100 + 50), value.name, {
        font: "4rem Arial",
        fill: "#ffffff",
        align: "center",
        stroke: "#000000",
        strokeThickness: 6
      }).setInteractive({ cursor: 'pointer' }).on('pointerdown', async (pointer) => {
        if (this.scene.getIndex(value.sceneName) == -1) {
          const scene = await import(value.script)
          this.scene.add(value.sceneName, scene.default);
        }
        this.scene.start(value.sceneName);
      }, this);
    })

  }
}

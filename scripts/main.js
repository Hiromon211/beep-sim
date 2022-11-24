export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image("background", "./assets/bg/mfm/menuDesat.png");
  }

  create() {
    this.add.image(480, 360, 'background');
    var ruvBtn = this.add.text(100, 50, 'Ruv', {
      font: "65px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 6
    });

    var sarvBtn = this.add.text(100, 150, 'Sarv', {
      font: "65px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 6
    });

    var sarvdkBtn = this.add.text(100, 250, 'Sarv Dark', {
      font: "65px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 6
    });

    var sarvdemBtn = this.add.text(100, 350, 'Sarv Demon', {
      font: "65px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 6
    });

    var selBtn = this.add.text(100, 450, 'Selever', {
      font: "65px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 6
    });

    ruvBtn.setInteractive().on('pointerdown', function(pointer) {
      import("./ruv.js").then( ({ default: RuvScene}) => {
        this.scene.add("RuvScene", RuvScene);
        this.scene.start('RuvScene');
      })
    }, this);

    sarvBtn.setInteractive().on('pointerdown', function(pointer) {
      import("./sarv.js").then( ({ default: SarvScene}) => {
        this.scene.add("SarvScene", SarvScene);
        this.scene.start('SarvScene');
      })
    }, this);

    sarvdkBtn.setInteractive().on('pointerdown', function(pointer) {
      import("./sarv-dark.js").then( ({ default: SarvDarkScene}) => {
        this.scene.add("SarvDarkScene", SarvDarkScene);
        this.scene.start('SarvDarkScene');
      })
    }, this);

    sarvdemBtn.setInteractive().on('pointerdown', function(pointer) {
      import("./sarv-demon.js").then( ({ default: SarvDemonScene}) => {
        this.scene.add("SarvDemonScene", SarvDemonScene);
        this.scene.start('SarvDemonScene');
      })
    }, this);

    selBtn.setInteractive().on('pointerdown', function(pointer) {
      import("./selever.js").then( ({ default: SeleverScene}) => {
        this.scene.add("SeleverScene", SeleverScene);
        this.scene.start('SeleverScene');
      })
    }, this);

  }
}

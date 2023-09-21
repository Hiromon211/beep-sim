export default class RuvScene extends Phaser.Scene {

  constructor() {
    super('RuvScene');
  }

  preload() {
    //Variables
    this.audioUp;
    this.audioDown;
    this.audioLeft;
    this.audioRight;

    this.cursors;
    this.ruvAnim;
    this.fpsTXT;

    this.showFPS = window.settings.showFPS;

    //Loads
    this.load.image("background", "./assets/bg/mfm/menuDesat.png")
    this.load.audio('ruv-up-sound', './assets/ruv/ruv-up.ogg');
    this.load.audio('ruv-left-sound', './assets/ruv/ruv-left.ogg');
    this.load.audio('ruv-right-sound', './assets/ruv/ruv-right.ogg');
    this.load.audio('ruv-down-sound', './assets/ruv/ruv-down.ogg');
    this.load.atlasXML('ruvtex', './assets/ruv/ruv_sheet.png', './assets/ruv/ruv_sheet.xml');
    
  }

  create() {
    //Background Image
    this.add.image(480, 360, 'background');

    //FPS
    if (this.showFPS) {
      this.fpsTXT = this.add.text(920, 20, 'FPS: ', {
        font: "1.5em Arial",
        stroke: "#000000",
        strokeThickness: 3
      });
    }

    //Screen Width and Height
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    //Sounds
    this.audioUp = this.sound.add('ruv-up-sound');
    this.audioDown = this.sound.add('ruv-down-sound');
    this.audioLeft = this.sound.add('ruv-left-sound');
    this.audioRight = this.sound.add('ruv-right-sound');

    this.anims.create({
      key: "RuvIdle",
      frameRate: 30,
      frames: this.anims.generateFrameNames("ruvtex", {
        prefix: "RuvIdle",
        zeroPad: 4,
        start: 0,
        end: 11,
      }),
      repeat: -1,
      repeatDelay: 500
    });

    this.anims.create({
      key: "RuvLeft",
      frameRate: 30,
      frames: this.anims.generateFrameNames("ruvtex", {
        prefix: "RuvLeft",
        zeroPad: 4,
        start: 0,
        end: 11,
      })
    });

    this.anims.create({
      key: "RuvRight",
      frameRate: 30,
      frames: this.anims.generateFrameNames("ruvtex", {
        prefix: "RuvRight",
        zeroPad: 4,
        start: 0,
        end: 13,
      })
    });

    this.anims.create({
      key: "RuvUp",
      frameRate: 30,
      frames: this.anims.generateFrameNames("ruvtex", {
        prefix: "RuvUp",
        zeroPad: 4,
        start: 0,
        end: 11,
      })
    });

    this.anims.create({
      key: "RuvDown",
      frameRate: 30,
      frames: this.anims.generateFrameNames("ruvtex", {
        prefix: "RuvDown",
        zeroPad: 4,
        start: 0,
        end: 11,
      })
    });

    this.ruvAnim = this.add.sprite(screenCenterX, screenCenterY - 25, 'ruvtex');
    this.ruvAnim.setScale(.75)
    this.ruvAnim.play("RuvIdle", true);

    this.add.text(20, 20, "Back", {
      font: "1.5rem Arial",
      fill: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 4
    }).setInteractive({ cursor: 'pointer' }).on('pointerdown', async (pointer) => {
      this.scene.stop()
      this.scene.run("MainScene")
    }, this);

    this.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {
    //Display FPS
    if (this.showFPS) {
      const loop = this.sys.game.loop;
      this.fpsTXT.setText(loop.actualFps.toFixed(0));
    }

    //Play audio once
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) this.audioLeft.play();
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) this.audioRight.play();
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) this.audioDown.play();
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) this.audioUp.play();

    //Animations
    if (this.cursors.left.isDown) {
      this.ruvAnim.play('RuvLeft', true);
    } else if (this.cursors.right.isDown) {
      this.ruvAnim.play('RuvRight', true);
    } else if (this.cursors.down.isDown) {
      this.ruvAnim.play('RuvDown', true);
    } else if (this.cursors.up.isDown) {
      this.ruvAnim.play("RuvUp", true);
    } else {
      this.ruvAnim.play("RuvIdle", true);
    }

  }
}

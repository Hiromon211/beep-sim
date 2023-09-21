export default class SarvDarkScene extends Phaser.Scene {

  constructor() {
    super('SarvDarkScene');
  }

  preload() {
    //Variables
    this.audioUp;
    this.audioDown;
    this.audioLeft;
    this.audioRight;

    this.cursors;
    this.sarvDarkAnim;
    this.fpsTXT;

    this.showFPS = window.settings.showFPS;

    //Loads
    this.load.image("background", "./assets/bg/mfm/menuDesat.png")
    this.load.audio('sarvdark-up-sound', './assets/sarv-dark/sarv-dark-up.ogg');
    this.load.audio('sarvdark-left-sound', './assets/sarv-dark/sarv-dark-left.ogg');
    this.load.audio('sarvdark-right-sound', './assets/sarv-dark/sarv-dark-right.ogg');
    this.load.audio('sarvdark-down-sound', './assets/sarv-dark/sarv-dark-down.ogg');
    this.load.atlasXML('sarvdarktex', './assets/sarv-dark/sarvente_dark.png', './assets/sarv-dark/sarvente_dark.xml');

  }

  create() {
    this.add.image(480, 360, 'background');

    if (this.showFPS) {
      this.fpsTXT = this.add.text(920, 20, 'FPS: ', {
        font: "1.5em Arial",
        stroke: "#000000",
        strokeThickness: 3
      });
    }

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.audioUp = this.sound.add('sarvdark-up-sound');
    this.audioDown = this.sound.add('sarvdark-down-sound');
    this.audioLeft = this.sound.add('sarvdark-left-sound');
    this.audioRight = this.sound.add('sarvdark-right-sound');

    this.anims.create({
      key: "SarvDarkIdle",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkIdle",
        zeroPad: 4,
        start: 0,
        end: 12,
      }),
      repeat: -1,
      repeatDelay: 500
    });

    this.anims.create({
      key: "SarvDarkLeft",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkLeft",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.anims.create({
      key: "SarvDarkRight",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkRight",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.anims.create({
      key: "SarvDarkUp",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkUp",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.anims.create({
      key: "SarvDarkDown",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkDown",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.anims.create({
      key: "SarvDarkLeft2",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkLeft2",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.anims.create({
      key: "SarvDarkRight2",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkRight2",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.anims.create({
      key: "SarvDarkUp2",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkUp2",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.anims.create({
      key: "SarvDarkDown2",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkDown2",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.sarvDarkAnim = this.add.sprite(screenCenterX, screenCenterY, 'sarvdarktex');
    this.sarvDarkAnim.setScale(.75)
    this.sarvDarkAnim.play("SarvDarkIdle", true);

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

    //Play auidio once
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) this.audioLeft.play();
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) this.audioRight.play();
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) this.audioDown.play();
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) this.audioUp.play();

    //Animations
    if (this.cursors.shift.isDown) {
      if (this.cursors.left.isDown) {
        this.sarvDarkAnim.play('SarvDarkLeft2', true);
      } else if (this.cursors.right.isDown) {
        this.sarvDarkAnim.play('SarvDarkRight2', true);
      } else if (this.cursors.down.isDown) {
        this.sarvDarkAnim.play('SarvDarkDown2', true);
      } else if (this.cursors.up.isDown) {
        this.sarvDarkAnim.play("SarvDarkUp2", true);
      } else {
        this.sarvDarkAnim.play('SarvDarkIdle', true);
      }
    } else {
      if (this.cursors.left.isDown) {
        this.sarvDarkAnim.play('SarvDarkLeft', true);
      } else if (this.cursors.right.isDown) {
        this.sarvDarkAnim.play('SarvDarkRight', true);
      } else if (this.cursors.down.isDown) {
        this.sarvDarkAnim.play('SarvDarkDown', true);
      } else if (this.cursors.up.isDown) {
        this.sarvDarkAnim.play("SarvDarkUp", true);
      } else {
        this.sarvDarkAnim.play('SarvDarkIdle', true);
      }
    }

  }
}

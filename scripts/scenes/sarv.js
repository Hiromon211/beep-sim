export default class SarvScene extends Phaser.Scene {

  constructor() {
    super('SarvScene');
  }

  preload() {
    //Variables
    this.audioUp;
    this.audioDown;
    this.audioLeft;
    this.audioRight;

    this.cursors;
    this.sarvAnim;
    this.fpsTXT;

    this.showFPS = window.settings.showFPS;

    //Loads
    this.load.image("background", "./assets/bg/mfm/menuDesat.png")
    this.load.audio('sarv-up-sound', './assets/sarv/sarv-up.ogg');
    this.load.audio('sarv-left-sound', './assets/sarv/sarv-left.ogg');
    this.load.audio('sarv-right-sound', './assets/sarv/sarv-right.ogg');
    this.load.audio('sarv-down-sound', './assets/sarv/sarv-down.ogg');
    this.load.atlasXML('sarvtex', './assets/sarv/sarvente_sheet.png', './assets/sarv/sarvente_sheet.xml');

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
    this.audioUp = this.sound.add('sarv-up-sound');
    this.audioDown = this.sound.add('sarv-down-sound');
    this.audioLeft = this.sound.add('sarv-left-sound');
    this.audioRight = this.sound.add('sarv-right-sound');

    this.anims.create({
      key: "SarvIdle",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvtex", {
        prefix: "SarventeIdle",
        zeroPad: 4,
        start: 0,
        end: 12,
      }),
      repeat: -1,
      repeatDelay: 500
    });

    this.anims.create({
      key: "SarvLeft",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvtex", {
        prefix: "SarventeLeft",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.anims.create({
      key: "SarvRight",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvtex", {
        prefix: "SarventeRight",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.anims.create({
      key: "SarvUp",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvtex", {
        prefix: "SarventeUp",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.anims.create({
      key: "SarvDown",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvtex", {
        prefix: "SarventeDown",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.anims.create({
      key: "SarvHey",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvtex", {
        prefix: "SarventeHey",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.sarvAnim = this.add.sprite(screenCenterX, screenCenterY, 'sarvtex');
    this.sarvAnim.setScale(.75)
    this.sarvAnim.play("SarvIdle", true);

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

    if (this.cursors.space.isDown) {
      this.sarvAnim.play("SarvHey", true);
    } else if (this.cursors.left.isDown) {
      this.sarvAnim.play('SarvLeft', true);
    } else if (this.cursors.right.isDown) {
      this.sarvAnim.play('SarvRight', true);
    } else if (this.cursors.down.isDown) {
      this.sarvAnim.play('SarvDown', true);
    } else if (this.cursors.up.isDown) {
      this.sarvAnim.play("SarvUp", true);
    } else {
      this.sarvAnim.play('SarvIdle', true);
    }


  }
}

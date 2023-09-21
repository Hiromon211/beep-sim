export default class SarvDemonScene extends Phaser.Scene {

  constructor() {
    super('SarvDemonScene');
  }

  preload() {
    //Variables
    this.audioUp;
    this.audioDown;
    this.audioLeft;
    this.audioRight;

    this.cursors;
    this.sarvDemonAnim;
    this.fpsTXT;

    this.showFPS = window.settings.showFPS;

    //Loads
    this.load.image("background", "./assets/bg/mfm/menuDesat.png")
    this.load.audio('sarvdemon-up-sound', './assets/sarv-demon/sarv-demon-up.ogg');
    this.load.audio('sarvdemon-left-sound', './assets/sarv-demon/sarv-demon-left.ogg');
    this.load.audio('sarvdemon-right-sound', './assets/sarv-demon/sarv-demon-right.ogg');
    this.load.audio('sarvdemon-down-sound', './assets/sarv-demon/sarv-demon-down.ogg');
    this.load.atlasXML('sarvdemontex', './assets/sarv-demon/smokinhotbabe.png', './assets/sarv-demon/smokinhotbabe.xml');

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
    this.audioUp = this.sound.add('sarvdemon-up-sound');
    this.audioDown = this.sound.add('sarvdemon-down-sound');
    this.audioLeft = this.sound.add('sarvdemon-left-sound');
    this.audioRight = this.sound.add('sarvdemon-right-sound');

    this.anims.create({
      key: "SarvDemonIdle",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdemontex", {
        prefix: "LuciferSarvIdle",
        zeroPad: 4,
        start: 0,
        end: 24,
      }),
      repeat: -1,
      repeatDelay: 500
    });

    this.anims.create({
      key: "SarvDemonLeft",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdemontex", {
        prefix: "LuciferSarvLeft",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.anims.create({
      key: "SarvDemonRight",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdemontex", {
        prefix: "LuciferSarvRight",
        zeroPad: 4,
        start: 0,
        end: 12,
      })
    });

    this.anims.create({
      key: "SarvDemonUp",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdemontex", {
        prefix: "LuciferSarvUp",
        zeroPad: 4,
        start: 0,
        end: 12,
      })
    });

    this.anims.create({
      key: "SarvDemonDown",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdemontex", {
        prefix: "LuciferSarvDown",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.sarvDemonAnim = this.add.sprite(screenCenterX, screenCenterY + 25, 'sarvdemontex');
    this.sarvDemonAnim.setScale(.70)
    this.sarvDemonAnim.play("SarvDemonIdle", true);

    this.tweens.add({
      targets: this.sarvDemonAnim,
      y: '-=100',
      duration: 5000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    })

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

    if (this.cursors.left.isDown) {
      this.sarvDemonAnim.play('SarvDemonLeft', true);
    } else if (this.cursors.right.isDown) {
      this.sarvDemonAnim.play('SarvDemonRight', true);
    } else if (this.cursors.down.isDown) {
      this.sarvDemonAnim.play('SarvDemonDown', true);
    } else if (this.cursors.up.isDown) {
      this.sarvDemonAnim.play("SarvDemonUp", true);
    } else {
      this.sarvDemonAnim.play('SarvDemonIdle', true);
    }


  }
}

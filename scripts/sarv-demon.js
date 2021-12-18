export default class SarvDemonScene extends Phaser.Scene {

  constructor() {
    super('SarvDemonScene');
  }

  preload() {
    //Variables
    this.aUp;
    this.aDown;
    this.aLeft;
    this.aRight;

    this.cursors;
    this.sarvdemonanim;
    this.fpsTXT;

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
    this.fpsTXT = this.add.text(14, 5, 'FPS: ', {
      stroke: "#000000",
      strokeThickness: 3
    });
    var screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    var screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.aUp = this.sound.add('sarvdemon-up-sound');
    this.aDown = this.sound.add('sarvdemon-down-sound');
    this.aLeft = this.sound.add('sarvdemon-left-sound');
    this.aRight = this.sound.add('sarvdemon-right-sound');

    this.anims.create({
      key: "sarvdemonidlee",
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
      key: "sarvdemonleftt",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdemontex", {
        prefix: "LuciferSarvLeft",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.anims.create({
      key: "sarvdemonrightt",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdemontex", {
        prefix: "LuciferSarvRight",
        zeroPad: 4,
        start: 0,
        end: 12,
      })
    });

    this.anims.create({
      key: "sarvdemonupp",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdemontex", {
        prefix: "LuciferSarvUp",
        zeroPad: 4,
        start: 0,
        end: 12,
      })
    });

    this.anims.create({
      key: "sarvdemondownn",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdemontex", {
        prefix: "LuciferSarvDown",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.sarvdemonanim = this.add.sprite(screenCenterX, screenCenterY+25, 'sarvdemontex', "LuciferSarvIdle0000");
    this.sarvdemonanim.setScale(.70)
    this.sarvdemonanim.play("sarvdemonidlee", true);

    this.tweens.add({
      targets: this.sarvdemonanim,
      y: '-=100',
      duration: 5000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    })

    this.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {
    //Display FPS
    var loop = this.sys.game.loop;
    this.fpsTXT.setText(loop.actualFps.toFixed(0));

    //Play auidio once
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) this.aLeft.play();
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) this.aRight.play();
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) this.aDown.play();
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) this.aUp.play();

    //Animations

    if (this.cursors.left.isDown) {
      this.sarvdemonanim.play('sarvdemonleftt', true);
    } else if (this.cursors.right.isDown) {
      this.sarvdemonanim.play('sarvdemonrightt', true);
    } else if (this.cursors.down.isDown) {
      this.sarvdemonanim.play('sarvdemondownn', true);
    } else if (this.cursors.up.isDown) {
      this.sarvdemonanim.play("sarvdemonupp", true);
    } else {
      this.sarvdemonanim.play('sarvdemonidlee', true);
    }


  }
}

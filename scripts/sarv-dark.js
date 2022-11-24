export default class SarvDarkScene extends Phaser.Scene {

  constructor() {
    super('SarvDarkScene');
  }

  preload() {
    //Variables
    this.aUp;
    this.aDown;
    this.aLeft;
    this.aRight;

    this.cursors;
    this.sarvdarkanim;
    this.fpsTXT;

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
    this.fpsTXT = this.add.text(14, 5, 'FPS: ', {
      stroke: "#000000",
      strokeThickness: 3
    });
    var screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    var screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.aUp = this.sound.add('sarvdark-up-sound');
    this.aDown = this.sound.add('sarvdark-down-sound');
    this.aLeft = this.sound.add('sarvdark-left-sound');
    this.aRight = this.sound.add('sarvdark-right-sound');

    this.anims.create({
      key: "sarvdarkidlee",
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
      key: "sarvdarkleftt",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkLeft",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.anims.create({
      key: "sarvdarkrightt",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkRight",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.anims.create({
      key: "sarvdarkupp",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkUp",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.anims.create({
      key: "sarvdarkdownn",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkDown",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.anims.create({
      key: "sarvdarkleftt2",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkLeft2",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.anims.create({
      key: "sarvdarkrightt2",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkRight2",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.anims.create({
      key: "sarvdarkupp2",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkUp2",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.anims.create({
      key: "sarvdarkdownn2",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvdarktex", {
        prefix: "SarvDarkDown2",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.sarvdarkanim = this.add.sprite(screenCenterX, screenCenterY, 'sarvdarktex', "SarvDarkIdle0000");
    this.sarvdarkanim.setScale(.75)
    this.sarvdarkanim.play("sarvdarkidlee", true);

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
    if (this.cursors.shift.isDown) {
      if (this.cursors.left.isDown) {
        this.sarvdarkanim.play('sarvdarkleftt2', true);
      } else if (this.cursors.right.isDown) {
        this.sarvdarkanim.play('sarvdarkrightt2', true);
      } else if (this.cursors.down.isDown) {
        this.sarvdarkanim.play('sarvdarkdownn2', true);
      } else if (this.cursors.up.isDown) {
        this.sarvdarkanim.play("sarvdarkupp2", true);
      } else {
        this.sarvdarkanim.play('sarvdarkidlee', true);
      }
    } else {
      if (this.cursors.left.isDown) {
        this.sarvdarkanim.play('sarvdarkleftt', true);
      } else if (this.cursors.right.isDown) {
        this.sarvdarkanim.play('sarvdarkrightt', true);
      } else if (this.cursors.down.isDown) {
        this.sarvdarkanim.play('sarvdarkdownn', true);
      } else if (this.cursors.up.isDown) {
        this.sarvdarkanim.play("sarvdarkupp", true);
      } else {
        this.sarvdarkanim.play('sarvdarkidlee', true);
      }
    }

  }
}

export default class SarvScene extends Phaser.Scene {

  constructor() {
    super('SarvScene');
  }

  preload() {
    //Variables
    this.aUp;
    this.aDown;
    this.aLeft;
    this.aRight;

    this.cursors;
    this.sarvanim;
    this.fpsTXT;

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
    this.fpsTXT = this.add.text(14, 5, 'FPS: ', {
      stroke: "#000000",
      strokeThickness: 3
    });
    var screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    var screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.aUp = this.sound.add('sarv-up-sound');
    this.aDown = this.sound.add('sarv-down-sound');
    this.aLeft = this.sound.add('sarv-left-sound');
    this.aRight = this.sound.add('sarv-right-sound');

    this.anims.create({
      key: "sarvidlee",
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
      key: "sarvleftt",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvtex", {
        prefix: "SarventeLeft",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.anims.create({
      key: "sarvrightt",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvtex", {
        prefix: "SarventeRight",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.anims.create({
      key: "sarvupp",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvtex", {
        prefix: "SarventeUp",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.anims.create({
      key: "sarvdownn",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvtex", {
        prefix: "SarventeDown",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.anims.create({
      key: "sarvheyy",
      frameRate: 30,
      frames: this.anims.generateFrameNames("sarvtex", {
        prefix: "SarventeHey",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.sarvanim = this.add.sprite(screenCenterX, screenCenterY, 'sarvtex', "SarventeIdle0000");
    this.sarvanim.setScale(.75)
    this.sarvanim.play("sarvidlee", true);

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
    
    if (this.cursors.space.isDown) {
      this.sarvanim.play("sarvheyy", true);
    } else if (this.cursors.left.isDown) {
      this.sarvanim.play('sarvleftt', true);
    } else if (this.cursors.right.isDown) {
      this.sarvanim.play('sarvrightt', true);
    } else if (this.cursors.down.isDown) {
      this.sarvanim.play('sarvdownn', true);
    } else if (this.cursors.up.isDown) {
      this.sarvanim.play("sarvupp", true);
    } else {
      this.sarvanim.play('sarvidlee', true);
    }


  }
}

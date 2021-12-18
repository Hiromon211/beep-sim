export default class RuvScene extends Phaser.Scene {

  constructor() {
    super('RuvScene');
  }

  preload() {
    //Variables
    this.aUp;
    this.aDown;
    this.aLeft;
    this.aRight;

    this.cursors;
    this.ruvanim;
    this.fpsTXT;

    //Loads
    this.load.image("background", "./assets/bg/mfm/menuDesat.png")
    this.load.audio('ruv-up-sound', './assets/ruv/ruv-up.ogg');
    this.load.audio('ruv-left-sound', './assets/ruv/ruv-left.ogg');
    this.load.audio('ruv-right-sound', './assets/ruv/ruv-right.ogg');
    this.load.audio('ruv-down-sound', './assets/ruv/ruv-down.ogg');
    this.load.atlasXML('ruvtex', './assets/ruv/ruv_sheet.png', './assets/ruv/ruv_sheet.xml');

    if (!this.sys.game.device.os.desktop){
      this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);

    }
  }

  create() {
    //Background Image
    this.add.image(480, 360, 'background');

    //FPS
    this.fpsTXT = this.add.text(14, 5, 'FPS: ', {
      stroke: "#000000",
      strokeThickness: 2
    });

    //Screen Width and Height
    var screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    var screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    //Sounds
    this.aUp = this.sound.add('ruv-up-sound');
    this.aDown = this.sound.add('ruv-down-sound');
    this.aLeft = this.sound.add('ruv-left-sound');
    this.aRight = this.sound.add('ruv-right-sound');

    this.anims.create({
      key: "ruvidlee",
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
      key: "ruvleftt",
      frameRate: 30,
      frames: this.anims.generateFrameNames("ruvtex", {
        prefix: "RuvLeft",
        zeroPad: 4,
        start: 0,
        end: 11,
      })
    });

    this.anims.create({
      key: "ruvrightt",
      frameRate: 30,
      frames: this.anims.generateFrameNames("ruvtex", {
        prefix: "RuvRight",
        zeroPad: 4,
        start: 0,
        end: 13,
      })
    });

    this.anims.create({
      key: "ruvupp",
      frameRate: 30,
      frames: this.anims.generateFrameNames("ruvtex", {
        prefix: "RuvUp",
        zeroPad: 4,
        start: 0,
        end: 11,
      })
    });

    this.anims.create({
      key: "ruvdownn",
      frameRate: 30,
      frames: this.anims.generateFrameNames("ruvtex", {
        prefix: "RuvDown",
        zeroPad: 4,
        start: 0,
        end: 11,
      })
    });

    this.ruvanim = this.add.sprite(screenCenterX, screenCenterY - 25, 'ruvtex', "RuvIdle0000");
    this.ruvanim.setScale(.75)
    this.ruvanim.play("ruvidlee", true);

    if (this.sys.game.device.os.desktop) {

      this.cursors = this.input.keyboard.createCursorKeys();

    } else {
      
      this.joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: screenCenterX - 325,
        y: 550,
        radius: 100,
        dir: 2,
        enable: true
      });

      this.cursors = this.joystick.createCursorKeys();
    }
  }

  update() {
    //Display FPS
    var loop = this.sys.game.loop;
    this.fpsTXT.setText(loop.actualFps.toFixed(0));

    //Play audio once
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) this.aLeft.play();
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) this.aRight.play();
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) this.aDown.play();
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) this.aUp.play();

    //Animations
    if (this.cursors.left.isDown) {
      this.ruvanim.play('ruvleftt', true);
    } else if (this.cursors.right.isDown) {
      this.ruvanim.play('ruvrightt', true);
    } else if (this.cursors.down.isDown) {
      this.ruvanim.play('ruvdownn', true);
    } else if (this.cursors.up.isDown) {
      this.ruvanim.play("ruvupp", true);
    } else {
      this.ruvanim.play('ruvidlee', true);
    }


  }
}

export default class SeleverScene extends Phaser.Scene {

  constructor() {
    super('SeleverScene');
  }

  preload() {
    //Variables
    this.aUp;
    this.aDown;
    this.aLeft;
    this.aRight;

    this.cursors;
    this.seleveranim;
    this.fpsTXT;

    //Loads
    this.load.image("background", "./assets/bg/mfm/menuDesat.png")
    this.load.audio('selever-up-sound', './assets/selever/sel-up.ogg');
    this.load.audio('selever-left-sound', './assets/selever/sel-left.ogg');
    this.load.audio('selever-right-sound', './assets/selever/sel-right.ogg');
    this.load.audio('selever-down-sound', './assets/selever/sel-down.ogg');
    this.load.atlasXML('selevertex', './assets/selever/fuckboi_sheet.png', './assets/selever/fuckboi_sheet.xml');
  }

  create() {
    this.add.image(480, 360, 'background');
    this.fpsTXT = this.add.text(14, 5, 'FPS: ', {
      stroke: "#000000",
      strokeThickness: 3
    });
    var screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    var screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.aUp = this.sound.add('selever-up-sound');
    this.aDown = this.sound.add('selever-down-sound');
    this.aLeft = this.sound.add('selever-left-sound');
    this.aRight = this.sound.add('selever-right-sound');

    this.anims.create({
      key: "seleveridlee",
      frameRate: 30,
      frames: this.anims.generateFrameNames("selevertex", {
        prefix: "SelIdle",
        zeroPad: 4,
        start: 0,
        end: 9,
      }),
      repeat: -1,
      repeatDelay: 500
    });

    this.anims.create({
      key: "seleverleftt",
      frameRate: 30,
      frames: this.anims.generateFrameNames("selevertex", {
        prefix: "SelLeft",
        zeroPad: 4,
        start: 0,
        end: 11,
      })
    });

    this.anims.create({
      key: "seleverrightt",
      frameRate: 30,
      frames: this.anims.generateFrameNames("selevertex", {
        prefix: "SelRight",
        zeroPad: 4,
        start: 0,
        end: 11,
      })
    });

    this.anims.create({
      key: "seleverupp",
      frameRate: 30,
      frames: this.anims.generateFrameNames("selevertex", {
        prefix: "SelUp",
        zeroPad: 4,
        start: 0,
        end: 3,
      })
    });

    this.anims.create({
      key: "seleverdownn",
      frameRate: 30,
      frames: this.anims.generateFrameNames("selevertex", {
        prefix: "SelDown",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.anims.create({
      key: "seleverheyy",
      frameRate: 30,
      frames: this.anims.generateFrameNames("selevertex", {
        prefix: "SelHey",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.seleveranim = this.add.sprite(screenCenterX, screenCenterY, 'selevertex', "SelIdle0000");
    this.seleveranim.setScale(.75)
    this.seleveranim.play("seleveridlee", true);

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
      this.seleveranim.play('seleverheyy', true);
    } else if (this.cursors.left.isDown) {
      this.seleveranim.play('seleverleftt', true);
    } else if (this.cursors.right.isDown) {
      this.seleveranim.play('seleverrightt', true);
    } else if (this.cursors.down.isDown) {
      this.seleveranim.play('seleverdownn', true);
    } else if (this.cursors.up.isDown) {
      this.seleveranim.play("seleverupp", true);
    } else {
      this.seleveranim.play('seleveridlee', true);
    }


  }
}

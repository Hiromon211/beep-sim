export default class SeleverScene extends Phaser.Scene {

  constructor() {
    super('SeleverScene');
  }

  preload() {
    //Variables
    this.audioUp;
    this.audioDown;
    this.audioLeft;
    this.audioRight;

    this.cursors;
    this.seleverAnim;
    this.fpsTXT;

    this.showFPS = window.settings.showFPS;

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

    if (this.showFPS) {
      this.fpsTXT = this.add.text(920, 20, 'FPS: ', {
        font: "1.5em Arial",
        stroke: "#000000",
        strokeThickness: 3
      });
    }

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.audioUp = this.sound.add('selever-up-sound');
    this.audioDown = this.sound.add('selever-down-sound');
    this.audioLeft = this.sound.add('selever-left-sound');
    this.audioRight = this.sound.add('selever-right-sound');

    this.anims.create({
      key: "SeleverIdle",
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
      key: "SeleverLeft",
      frameRate: 30,
      frames: this.anims.generateFrameNames("selevertex", {
        prefix: "SelLeft",
        zeroPad: 4,
        start: 0,
        end: 11,
      })
    });

    this.anims.create({
      key: "SeleverRight",
      frameRate: 30,
      frames: this.anims.generateFrameNames("selevertex", {
        prefix: "SelRight",
        zeroPad: 4,
        start: 0,
        end: 11,
      })
    });

    this.anims.create({
      key: "SeleverUp",
      frameRate: 30,
      frames: this.anims.generateFrameNames("selevertex", {
        prefix: "SelUp",
        zeroPad: 4,
        start: 0,
        end: 3,
      })
    });

    this.anims.create({
      key: "SeleverDown",
      frameRate: 30,
      frames: this.anims.generateFrameNames("selevertex", {
        prefix: "SelDown",
        zeroPad: 4,
        start: 0,
        end: 14,
      })
    });

    this.anims.create({
      key: "SeleverHey",
      frameRate: 30,
      frames: this.anims.generateFrameNames("selevertex", {
        prefix: "SelHey",
        zeroPad: 4,
        start: 0,
        end: 9,
      })
    });

    this.seleverAnim = this.add.sprite(screenCenterX, screenCenterY, 'selevertex');
    this.seleverAnim.setScale(.75)
    this.seleverAnim.play("SeleverIdle", true);

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
      this.seleverAnim.play('SeleverHey', true);
    } else if (this.cursors.left.isDown) {
      this.seleverAnim.play('SeleverLeft', true);
    } else if (this.cursors.right.isDown) {
      this.seleverAnim.play('SeleverRight', true);
    } else if (this.cursors.down.isDown) {
      this.seleverAnim.play('SeleverDown', true);
    } else if (this.cursors.up.isDown) {
      this.seleverAnim.play("SeleverUp", true);
    } else {
      this.seleverAnim.play('SeleverIdle', true);
    }


  }
}

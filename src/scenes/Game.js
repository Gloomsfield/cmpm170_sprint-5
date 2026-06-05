import { BackgroundManager } from "@managers/BackgroundManager.js";
import { Meteor } from "@gameobjects/Meteor.js";
import { PianoManager } from "@managers/PianoManager.js";
import { DinoHead } from "@gameobjects/DinoHead.js";
import { WhiteFade } from "@managers/WhiteFade.js";


// actual gameplay scene
export class Game extends Phaser.Scene {
	constructor() {
		super("game_scene");
	}

	create() {
        this.input.on("pointerdown", () => {
			this.input.mouse.requestPointerLock();
		});

		this.gameLength = 20000;

		this.backgroundManager = new BackgroundManager(this, this.gameLength);

		this.meteor = new Meteor(this, this.gameLength);

		this.pianoManager = new PianoManager(this);

		this.dinoHead = new DinoHead(this, 500, 200, this.pianoManager);

		this.time.delayedCall(15000, () => {this.dinoHead.changeToSadDino();});

		this.input.on("pointermove", this.dinoHead.handlePointerMoved, this.dinoHead);

		this.time.delayedCall(8000, () => {this.windSound = this.sound.add("wind", {loop: true, volume: 0.15});this.windSound.play();});

		this.time.delayedCall(19500, () => {WhiteFade.fadeIn(this, 150, () => {this.endGame();});});
	}

	 update(_, delta) {
		this.backgroundManager.update();
		this.meteor.update();
		this.pianoManager.update(this.dinoHead);
		this.dinoHead.update(delta);
	}

	endGame() {
		if (this.windSound) {
			this.windSound.stop();
		}

		this.scene.start("end", {
			songData: this.pianoManager.noteHistory,
			songLength: this.time.now - this.pianoManager.startTime
		});
	}
}
/*
should:
-create dinohead, pianomanager, composer
-start timer
-update dino position from mouse
-check piano interactions
-trigger endscene after timer
-pass song data to endscene
*/

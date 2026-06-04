import { BackgroundManager } from "@managers/BackgroundManager.js";
import { PianoManager } from "@managers/PianoManager.js";
import { DinoHead } from "@gameobjects/DinoHead.js";

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

		this.pianoManager = new PianoManager(this);

		this.dinoHead = new DinoHead(this, 500, 200, this.pianoManager);

		this.time.delayedCall(15000, () => {this.dinoHead.changeToSadDino();});

		this.input.on("pointermove", this.dinoHead.handlePointerMoved, this.dinoHead);

		this.time.delayedCall(this.gameLength, () => {this.endGame();});
	}

	 update(_, delta) {
		this.backgroundManager.update();
		this.pianoManager.update(this.dinoHead);
		this.dinoHead.update(delta);
	}

	endGame() {
		this.scene.start("end",
			{
				songData: this.pianoManager.noteHistory,
    			songLength: this.time.now - this.pianoManager.startTime
			}
		);
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

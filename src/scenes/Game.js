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

		this.pianoManager = new PianoManager(this);

		this.dinoHead = new DinoHead(this, 500, 200, this.pianoManager);

		this.input.on("pointermove", this.dinoHead.handlePointerMoved, this.dinoHead);
	}

	 update() {
		this.pianoManager.update(this.dinoHead);
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

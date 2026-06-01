import { PianoManager } from "@managers/PianoManager.js";
import { DinoHead } from "@gameobjects/DinoHead.js";

// actual gameplay scene
export class Game extends Phaser.Scene {
	constructor() {
		super("game_scene");
	}

	create() {
		this.pianoManager = new PianoManager(this);

		this.dinoHead = new DinoHead(this, 500, 200, this.pianoManager);
	}

	 update() {
		this.dinoHead.update(this.input.activePointer);

		this.pianoManager.update(this.dinoHead.x,this.dinoHead.y);
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

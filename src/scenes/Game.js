import { PianoKey } from "@gameobjects/PianoKey.js";
import { DinoHead } from "@gameobjects/DinoHead.js";

// actual gameplay scene
export class Game extends Phaser.Scene {
	constructor() {
		super("game_scene");
	}

	create() {
		this.pianoKeys = [];

		for(let i = 0; i < 24; i++) {
			this.pianoKeys.push(new PianoKey(this, i * 30, 200));
		}

		this.dinoHead = new DinoHead(this, 500, 200);
	}

	 update() {
        this.dinoHead.update(this.input.activePointer);
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

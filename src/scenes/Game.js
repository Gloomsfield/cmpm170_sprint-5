import { PianoKey } from "@gameobjects/PianoKey.js";

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

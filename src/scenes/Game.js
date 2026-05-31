// actual gameplay scene
export class Game extends Phaser.Scene {
	constructor() {
		super("game_scene");
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

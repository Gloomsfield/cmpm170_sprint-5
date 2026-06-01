export class LoadAssets extends Phaser.Scene {
	constructor() {
		super("loadAssets_scene");
	}

	preload() {
		this.load.audio("a440hz-c4_audio", "./assets/piano-samples/a440hz-c4.mp3");

		this.load.image("piano-key_image", "./assets/piano-art/piano-key.png");
	}
}

// preload all game assets

/*
should load:
-dino sprites
-piano sprites
-sounds

uhh whatever else we need for background and other stuff

*/

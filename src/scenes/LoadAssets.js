export class LoadAssets extends Phaser.Scene {
	constructor() {
		super("loadAssets_scene");
	}

	preload() {
		this.load.audio("a440hz-c4_audio", "./assets/piano-samples/a440hz-c4.mp3");

		this.load.image("piano_image", "./assets/piano-art/piano.png");
		this.load.image("piano-foreground_image", "./assets/piano-art/piano-foreground.png");
		this.load.image("piano-key_image", "./assets/piano-art/piano-key.png");
		this.load.image("piano-key-black_image", "./assets/piano-art/piano-key-black.png");

		this.load.image("dino-head", "./assets/dino-art/dino.png");
		this.load.image("dino-head2", "./assets/dino-art/dino2.png");

		this.load.audio("wind", "./assets/other-audio/wind.mp3");
		this.load.audio("fade", "./assets/other-audio/fade.wav");
		this.load.audio("screech", "./assets/other-audio/screech.wav");

		this.load.image("B1", "./assets/background-art/Blue1.png");
		this.load.image("B2", "./assets/background-art/Blue2.png");
		this.load.image("R1", "./assets/background-art/Red1.png");
		this.load.image("R2", "./assets/background-art/Red2.png");
		this.load.image("R3", "./assets/background-art/Red3.png");

		this.load.image("meteor", "./assets/background-art/meteor.png");

		this.load.tilemapTiledJSON("piano-layout_tilemap", "./assets/tilemaps/piano_layout.tmj");
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

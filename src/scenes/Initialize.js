export class Initialize extends Phaser.Scene {
	constructor(sceneKey) {
		super("initialize_scene");
		this.onLoadSceneKey = sceneKey ?? "mainMenu_scene";
	}

	preload() {
		this.load.path = './assets/font-files/'
		this.load.font('fancy', 'Fancy.ttf', 'truetype')
	}

	create() {
		this.scene.start("loadAssets_scene", this.onLoadSceneKey);
	}
}

// game startup

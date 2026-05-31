export class Initialize extends Phaser.Scene {
	constructor(sceneKey) {
		super("initialize_scene");
		this.onLoadSceneKey = sceneKey ?? "mainMenu_scene";
	}

	preload() {}

	create() {
		this.scene.launch("loadAssets_scene").scene.events.once("create", () => { this.scene.start(this.onLoadSceneKey); });
	}
}

// game startup
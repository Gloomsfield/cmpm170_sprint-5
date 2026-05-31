export class MainMenu extends Phaser.Scene {
	constructor() {
		super("mainMenu_scene");
	}

	 create() {

        this.cameras.main.setBackgroundColor("#000000");
        this.add.text(this.scale.width / 2, this.scale.height / 2, "PLAY?", {fontSize: "64px", color: "#ffffff"}).setOrigin(0.5);
        this.input.once("pointerdown", () => {this.scene.start("game_scene");});
    }
}

// starting menu scene

/*
should:
-display black title screen with text like Play? (and maybe sonatasaurus title too)
-start gamescene on click
*/
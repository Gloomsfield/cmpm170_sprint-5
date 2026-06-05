export class MainMenu extends Phaser.Scene {
	constructor() {
		super("mainMenu_scene");
	}

	 create() {
		this.input.mouse.releasePointerLock();

        this.cameras.main.setBackgroundColor("#000000");
        this.add.text(this.scale.width / 2, 300, "Play?", 
        {
            color: "#ffffff",
            fontFamily: "fancy",
            fontSize: "64px"
        }).setOrigin(0.5);

        this.input.once("pointerdown", () => {
			this.input.mouse.requestPointerLock();
			this.scene.start("game_scene");
		});
    }
}

// starting menu scene

/*
should:
-display black title screen with text like Play? (and maybe sonatasaurus title too)
-start gamescene on click
*/

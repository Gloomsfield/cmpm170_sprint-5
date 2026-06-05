// dino head controlled by mouse
import { PianoConfig } from "@data/PianoConfig.js";

export class DinoHead extends Phaser.GameObjects.Container {
    constructor(scene, x, y, pianoManager) {
        super(scene, x, y);

        scene.add.existing(this);

        this.setDepth(1000);
        this.sprite = scene.add.sprite(350, 620, "dino-head");
        this.sprite.setScale(2.5);
        this.sprite.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.hitbox = scene.add.circle(0, 0, 20, 0x00ff00);
		this.hitbox.setAlpha(0);

		this.add(this.hitbox);
		this.add(this.sprite);

        this.pianoManager = pianoManager;

		this.minSpeed = 1000.0;
		this.maxSpeed = 2000.0;
    }

    handlePointerMoved(pointer) {
		const lowestY = -this.x * Math.atan(Math.PI / 6.0) + 650.0;

		this.setPosition(
			Phaser.Math.Clamp(this.x + pointer.movementX, 155.0, 650.0),
			Phaser.Math.Clamp(this.y + pointer.movementY, PianoConfig.highestDinoY, lowestY)
		);
    }

	changeToSadDino() {
		this.sprite.setTexture("dino-head2");
		this.sprite.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
	}

	updateHover(hoverIndex) {
		const depth = 102 + (23 - hoverIndex) * 2;
		this.setDepth(depth);
	}
}


/*
should:
-follow mouse position
-display dino sprite
-give x position to piano interactions
-possibly handle join stuff later
*/

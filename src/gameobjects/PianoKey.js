// individual piano key
import { PianoConfig } from "@data/PianoConfig.js";

export class PianoKey extends Phaser.GameObjects.Rectangle {

    constructor(scene, x, y, scale) {
		super(scene, x, y + (PianoConfig.keyHeight * scale) / 2, PianoConfig.keyWidth, PianoConfig.keyHeight, 0xffffff);

		this.setScale(scale);
        scene.add.existing(this);

        this.isHovered = false;
        this.isPressed = false;
    }

    setHovered(hover) {
        this.isHovered = hover;

        this.updateVisuals();
    }

    setPressed(pressed) {
        this.isPressed = pressed;

        this.updateVisuals();
    }

    updateVisuals() {

        if(this.isPressed) {
            this.setFillStyle(0xff0000);

        } else if(this.isHovered) {
            this.setFillStyle(0xffd700);

        } else {
            this.setFillStyle(0xffffff);
        }
    }
}

/*
should:
-store note name
-store their sound
-handle colored state (when dino is over them)
-play sound when triggered
-report trigger to pianomanager
*/
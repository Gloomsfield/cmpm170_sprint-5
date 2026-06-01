// individual piano key
import { PianoConfig } from "@data/PianoConfig.js";

export class PianoKey extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, scale, noteIndex) {
		super(scene, x, y, "piano-key_image");

		this.texture.setFilter(Phaser.Textures.FilterMode.Nearest);

		this.setScale(scale * 6.5);
        scene.add.existing(this);

        this.isHovered = false;
        this.isPressed = false;

		this.isoWidth = 40.0;
		this.isoX = x / Math.atan(Math.PI / 6.0) + 75.0;
		this.isoY = y;

		this.pressedThreshold = this.isoY + 10.0;

		this.noteData = {
			noteIndex: noteIndex,
			noteSound: scene.sound.add("a440hz-c4_audio").setDetune((noteIndex - 12) * 100.0),

			// TODO - handle velocity
			velocity: undefined,
		};

		this.scene = scene;
	}

    setHovered(hover) {
        this.isHovered = hover;

        this.updateVisuals();
    }

    setPressed(press) {
        this.isPressed = press;
	
		if(press === true) {
			let noteDataClone = { ...this.noteData };
			this.emit("note-pressed", noteDataClone);
		} else {
			this.emit("note-released", this.noteData.noteIndex);
		}

        this.updateVisuals();
    }

    updateVisuals() {
        if(this.isPressed) {
            this.setTint(0xff0000);

        } else if(this.isHovered) {
            this.setTint(0xffd700);

        } else {
            this.setTint(0xffffff);
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

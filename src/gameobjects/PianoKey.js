// individual piano key
import { PianoConfig } from "@data/PianoConfig.js";

export class PianoKey extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, detune) {
		super(scene, x, y, sprite);

		this.setDepth(101 + PianoConfig.keyCount - (detune + 1200) / 100 * 2);

		this.texture.setFilter(Phaser.Textures.FilterMode.Nearest);

        scene.add.existing(this);

        this.isHovered = false;
        this.isPressed = false;

		this.pressedThreshold = this.isoY - 10.0;

		console.log(detune);
		this.noteData = {
			noteSound: scene.sound.add("a440hz-c4_audio").setDetune(detune),

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

export class WhiteKey extends PianoKey {
	constructor(scene, x, y, detune) {
		super(scene, x, y, "piano-key_image", detune);
	}
}

export class BlackKey extends PianoKey {
	constructor(scene, x, y, detune) {
		super(scene, x, y, "piano-key-black_image", detune);
	}

	updateVisuals() {
		if(this.isPressed) {
			this.setTintFill(0xff0000);
		} else if(this.isHovered) {
			this.setTintFill(0xffd700);
		} else {
			this.clearTint();
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

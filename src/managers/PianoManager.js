import { WhiteKey, BlackKey } from "@gameobjects/PianoKey.js";
import { PianoConfig } from "@data/PianoConfig.js";

// manages piano behavior
export class PianoManager {
    constructor(scene) {
        this.scene = scene;

        this.keys = [];

		this.hoveredKeyIndex = Math.floor(PianoConfig.keyCount / 2.0);
		this.pressedKeyIndex = -1;

		this.noteHistory = [];

		scene.add.existing(this);

		const pianoLayout = scene.add.tilemap("piano-layout_tilemap");
		this.tilemapKeys = [];

		for(let layer of pianoLayout.objects) {
			if(layer.name == "keys") {
				for(let key of layer.objects) {
					this.tilemapKeys.push(key);
				}

				break;
			}
		}

		this.pianoSprite = scene.add.sprite(280, 230, "piano_image").setScale(2.0);
		this.pianoForegroundSprite = scene.add.sprite(280, 200, "piano-foreground_image").setScale(2.0);

		this.pianoForegroundSprite.setDepth(999);

		this.hasInitialized = false;
		this.startTime = 0;

        this.createKeys();
    }
    
    createKeys() {
		for(let keyObject of this.tilemapKeys) {
			const x = 760 - (keyObject.y / Math.atan(Math.PI / 6.0) - 665.0);
			const y = -x * Math.atan(Math.PI / 6.0) + 630.0;

			let isWhite = false;
			let detune = 0;

			for(let property of keyObject.properties) {
				if(property.name == "isWhite") {
					isWhite = property.value;

					continue;
				}
				
				if(property.name == "detune") {
					detune = property.value;

					continue;
				}
			}
			
			const newKey = isWhite ?
				new WhiteKey(this.scene, x, y, detune) :
				new BlackKey(this.scene, x, y, detune);

			newKey.setScale(6.0);
			newKey.setDepth((Math.floor((730 - x) / 2.25) - 48) / 4 + 101);

			newKey.on("note-pressed", this.playNote, this);
			newKey.on("note-released", (noteName) => {});

			this.keys.push(newKey);
		}
    }

	playNote(noteData) {
		noteData.noteSound.play();
	}

    update(dinoInstance) {
		if(!this.hasInitialized) {
			this.hasInitialized = true;
			this.startTime = this.scene.time.now;
		}

		let newHoveredKeyIndex = Math.floor((23) * (dinoInstance.x - 155.0) / 495.0);

		if(newHoveredKeyIndex != this.hoveredKeyIndex) {
			dinoInstance.updateHover(newHoveredKeyIndex);

			if(this.keys[this.hoveredKeyIndex].isPressed) {
				this.keys[this.hoveredKeyIndex].setPressed(false);
			}

			this.keys[this.hoveredKeyIndex].setHovered(false);
			this.keys[newHoveredKeyIndex].setHovered(true);

			this.hoveredKeyIndex = newHoveredKeyIndex;
		}

		if(!this.keys[newHoveredKeyIndex].isPressed) {
			if(this.keys[this.hoveredKeyIndex].y <= dinoInstance.y + 20.0) {
				this.keys[this.hoveredKeyIndex].setPressed(true);

				this.noteHistory.push({
					noteIndex: this.hoveredKeyIndex,
					noteTiming: this.scene.time.now - this.startTime,
				});
			}
		} else if(dinoInstance.y + 20.0 < this.keys[this.hoveredKeyIndex].y) {
			this.keys[this.hoveredKeyIndex].setPressed(false);
		}
    }
}

/*
should:
-create piano keys
-store all piano key instances
-track hovered key
-color hovered key
-play key sounds
-prevent repeated key sound when staying on same key
-send played notes to composer
*/

import { WhiteKey, BlackKey } from "@gameobjects/PianoKey.js";
import { PianoConfig } from "@data/PianoConfig.js";

// manages piano behavior
export class PianoManager {
    constructor(scene) {
        this.scene = scene;

        this.keys = [];

		this.hoveredKeyIndex = Math.floor(PianoConfig.keyCount / 2.0);
		this.pressedKeyIndex = -1;

		this.startTime = scene.time.now;
		this.noteHistory = [];

		scene.add.existing(this);

		const pianoLayout = scene.add.tilemap("piano-layout_tilemap");
		this.tilemapKeys = [];

		for(let layer of pianoLayout.objects) {
			console.log(layer.name);
			if(layer.name == "keys") {
				for(let key of layer.objects) {
					this.tilemapKeys.push(key);
				}

				break;
			}
		}

        this.createKeys();
    }
    
    createKeys() {
		for(let keyObject of this.tilemapKeys) {
			const x = keyObject.y * 1.25 - 300.0;
			const y = -x * Math.atan(Math.PI / 6.0) + 500;

			console.log(`${x}, ${y}`);

			let isWhite = false;

			for(let property of keyObject.properties) {
				if(property.name == "isWhite") {
					isWhite = property.value;
					break;
				}
			}
			
			const newKey = isWhite ?
				new WhiteKey(this.scene, x, y, keyObject.detune) :
				new BlackKey(this.scene, x, y, keyObject.detune);

			console.log(keyObject.properties);

			newKey.setScale(3.0);

			newKey.on("note-pressed", this.playNote, this);
			newKey.on("note-released", (noteName) => {});

			this.keys.push(newKey);
		}
    }

	playNote(noteData) {
		this.noteHistory.push({
			noteIndex: noteData.noteIndex,
			noteTiming: this.scene.time.now - this.startTime,
		});

		noteData.noteSound.play();
	}

    update(dinoInstance) {
		let newHoveredKeyIndex = PianoConfig.keyCount - Math.floor((dinoInstance.x - PianoConfig.pianoX) / (PianoConfig.pianoWidth * PianoConfig.pianoScale / (PianoConfig.keyCount - 1)));

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
			if(this.keys[newHoveredKeyIndex].pressedThreshold <= dinoInstance.y) {
				this.keys[newHoveredKeyIndex].setPressed(true);
			}
		} else if(dinoInstance.y < this.keys[this.hoveredKeyIndex].pressedThreshold) {
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

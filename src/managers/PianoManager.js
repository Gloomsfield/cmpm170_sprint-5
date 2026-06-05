import { PianoKey } from "@gameobjects/PianoKey.js";
import { PianoConfig } from "@data/PianoConfig.js";

// manages piano behavior
export class PianoManager {
    constructor(scene) {
        this.scene = scene;

        this.keys = [];

		this.hoveredKeyIndex = Math.floor(PianoConfig.keyCount / 2.0);
		this.pressedKeyIndex = -1;

        this.createKeys();

		this.startTime = scene.time.now;
		this.noteHistory = [];

		scene.add.existing(this);
    }
    
    createKeys() {
        for(let i = PianoConfig.keyCount - 1; i >= 0; i--) {
            const spacing = (PianoConfig.pianoWidth * PianoConfig.pianoScale) / (PianoConfig.keyCount - 1);

            const x = PianoConfig.pianoX + i * spacing;
			const y = PianoConfig.pianoY - x * Math.atan(Math.PI / 6.0);

            const key = new PianoKey(this.scene, x, y, PianoConfig.pianoScale, i);
            
			key.on("note-pressed", this.playNote, this);
			key.on("note-released", (noteIndex) => {});

            this.keys.push(key);
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

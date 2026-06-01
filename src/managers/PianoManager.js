import { PianoKey } from "@gameobjects/PianoKey.js";
import { PianoConfig } from "@data/PianoConfig.js";

// manages piano behavior
export class PianoManager {
    constructor(scene) {
        this.scene = scene;

        this.keys = [];

        this.hoveredKey = null;
        this.pressedKey = null;

        this.createKeys();

		this.startTime = scene.time.now;
		this.noteHistory = [];

		scene.add.existing(this);
    }
    
    createKeys() {
        for(let i = 0; i < PianoConfig.keyCount; i++) {
            const spacing = (PianoConfig.pianoWidth * PianoConfig.pianoScale) / (PianoConfig.keyCount - 1);

            const x = PianoConfig.pianoX + i * spacing;
			const y = PianoConfig.pianoY - x * Math.atan(Math.PI / 6.0);

            const key = new PianoKey(this.scene, x, y, PianoConfig.pianoScale, i);
            
            key.setDepth(y);

			key.on("note-pressed", this.playNote, this);
			key.on("note-released", (noteIndex) => {});

            this.keys.push(key);
        }
    }

	playNote(noteData) {
		this.noteHistory.push({
			noteData: noteData,
			noteTiming: this.scene.time.now - this.startTime,
		});

		noteData.noteSound.play();
	}

    update(dinoX, dinoY) {
        let newHoveredKey = null;

        for(const key of this.keys) {

            const halfW = key.displayWidth / 2;

            if(dinoX >= key.x - halfW && dinoX <= key.x + halfW) {
                newHoveredKey = key;
                break;
            }
        }

        if(newHoveredKey !== this.hoveredKey) {

            if(this.hoveredKey) {
                this.hoveredKey.setHovered(false);
            }

            this.hoveredKey = newHoveredKey;

            if(this.hoveredKey) {
                this.hoveredKey.setHovered(true);
            }
        }

        let newPressedKey = null;

        if(this.hoveredKey) {
			const clampedRange = this.getClampedRange(dinoX);

            if (dinoY > clampedRange.lowerBound - PianoConfig.pressThreshold) {
                newPressedKey = this.hoveredKey;
            }
        }

        if(newPressedKey !== this.pressedKey) {

            if(this.pressedKey) {
                this.pressedKey.setPressed(false);
            }

            this.pressedKey = newPressedKey;

            if(this.pressedKey) {
                this.pressedKey.setPressed(true);
            }
        }
    }


    getClampedRange(x) {
		const yLowKeyDown = PianoConfig.pianoY + (PianoConfig.keyHeight / 2);
		const yDinoMax = PianoConfig.pianoY - (PianoConfig.dinoUpperYOffset);

		const lowerBound = yLowKeyDown - (x * Math.atan(Math.PI / 6.0));
		const upperBound = yDinoMax - (x * Math.atan(Math.PI / 6.0));

		return {
			lowerBound,
			upperBound
		};
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

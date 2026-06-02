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
			noteData: noteData,
			noteTiming: this.scene.time.now - this.startTime,
		});

		noteData.noteSound.play();
	}

    update(dinoInstance) {
		let newHoveredIndex = this.hoveredKeyIndex;

		if(Math.abs(dinoInstance.offsetFromKeyX) > this.keys[this.hoveredKeyIndex].isoWidth / 2.0) {
			const direction = -Math.sign(dinoInstance.offsetFromKeyX);

			newHoveredIndex = this.hoveredKeyIndex + direction;

			if(0 <= newHoveredIndex && newHoveredIndex < PianoConfig.keyCount) {
				dinoInstance.snapToKey({
					isoX: this.keys[newHoveredIndex].isoX,
					isoY: this.keys[newHoveredIndex].isoY,
					keyIndex: newHoveredIndex,
				});

				dinoInstance.updateHover(newHoveredIndex);
            	
				this.keys[this.hoveredKeyIndex].setHovered(false);
				this.keys[newHoveredIndex].setHovered(true);
            	
				this.hoveredKeyIndex = newHoveredIndex;
            	
				if(this.pressedKeyIndex !== -1) {
					this.keys[this.pressedKeyIndex].setPressed(false);
            	
					this.pressedKeyIndex += direction;
            	
					if(this.pressedKeyIndex < 0 || PianoConfig.keyCount <= this.pressedKeyIndex) {
						this.pressedKeyIndex = -1;

						return;
					}
            	
					this.keys[this.pressedKeyIndex].setPressed(true);
				}
			}
		}

		if(this.pressedKeyIndex !== -1) {
			if(dinoInstance.y <= this.keys[this.pressedKeyIndex].pressedThreshold) {
				this.keys[this.pressedKeyIndex].setPressed(false);
				
				this.pressedKeyIndex = -1;
			}
		}

		if(dinoInstance.y < this.keys[this.hoveredKeyIndex].pressedThreshold) { return; }

		this.pressedKeyIndex = this.hoveredKeyIndex;
		this.keys[this.pressedKeyIndex].setPressed(true);
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

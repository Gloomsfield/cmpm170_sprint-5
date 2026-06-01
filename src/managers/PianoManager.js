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
            const y = this.PianoCollision(x);

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

            const surfaceY = this.PianoCollision(dinoX);

            if (surfaceY - dinoY <= PianoConfig.pressThreshold * PianoConfig.pianoScale) {
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


    PianoCollision(x) {

        const leftX = PianoConfig.pianoX;
        const rightX = PianoConfig.pianoX + PianoConfig.pianoWidth * PianoConfig.pianoScale;

        const t = Phaser.Math.Clamp((x - leftX) / (rightX - leftX), 0, 1);

        return Phaser.Math.Linear(PianoConfig.pianoY, PianoConfig.pianoY + PianoConfig.pianoHeight * PianoConfig.pianoScale, t);
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

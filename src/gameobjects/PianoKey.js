// TODO - extend a different type depending on how we want to do the art
export class PianoKey extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y, noteIndex) {
		super(scene, x, y, 25, 75, 0xffffea, 1.0);

		scene.add.existing(this);

		this.isHovered = false;
        this.isPressed = false;

		this.noteData = {
			noteIndex: noteIndex,
			noteSound: scene.sound.add("a440hz-c4_audio").setDetune((noteIndex - 12) * 100.0),

			// TODO - handle velocity
			velocity: undefined,
		};
	}

	 setHovered(hover) {
        this.isHovered = hover;

    }

    setPressed(press) {
        this.isPressed = press;
	
		if(press === true) {
			let noteDataClone = JSON.parse(JSON.stringify(this.noteData));
			this.emit("note-pressed", noteDataClone);
		} else {
			this.emit("note-released", this.noteData.noteIndex);
		}
    }
}

// individual piano key

/*
should:
-store note name
-store their sound
-handle colored state (when dino is over them)
-play sound when triggered
-report trigger to pianomanager
*/

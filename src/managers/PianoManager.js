// manages piano behavior

export class PianoManager extends Phaser.GameObjects.GameObject {
	constructor(scene, x, y) {
		super(scene, x, y);

		scene.add.existing(this);

		this.startTime = scene.time.now;
		this.noteHistory = [];

		this.activeNotes = new Array(24);

		this.scene = scene;
	}

	playNote(noteData) {
		this.noteHistory.push({
			noteData: noteData,
			noteTiming: this.scene.time.now - this.startTime,
		});

		noteData.noteSound.play();
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

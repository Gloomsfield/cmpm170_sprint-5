// TODO - extend a different type depending on how we want to do the art
export class PianoKey extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y) {
		super(scene, x, y, 25, 75, 0xffffea, 1.0);

		scene.add.existing(this);
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
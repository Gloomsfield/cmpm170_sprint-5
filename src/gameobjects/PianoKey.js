// TODO - extend a different type depending on how we want to do the art
export class PianoKey extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y) {
		super(scene, x, y, 25, 75, 0xffffea, 1.0);

		scene.add.existing(this);
	}
}

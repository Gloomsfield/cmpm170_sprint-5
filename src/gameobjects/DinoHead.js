// dino head controlled by mouse
import { PianoConfig } from "@data/PianoConfig.js";
import { MovementTrack, TrackConstraint } from "@gameobjects/MovementTrack.js";

export class DinoHead extends Phaser.GameObjects.Container {
    constructor(scene, x, y, pianoManager) {
        super(scene, x, y);

        scene.add.existing(this);

		this.movementTrack = new MovementTrack();
		this.movementTrack.addConstraint(new TrackConstraint(350.0, 620.0));
		this.movementTrack.addConstraint(new TrackConstraint(0.0, 0.0));

        this.setDepth(1000);
        this.sprite = scene.add.sprite(350, 620, "dino-head");
        this.sprite.setScale(2.5);
        this.sprite.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.hitbox = scene.add.circle(0, 0, 20, 0x00ff00);
		this.hitbox.setAlpha(0);

		this.add(this.hitbox);
		this.add(this.sprite);

        this.pianoManager = pianoManager;

		this.minSpeed = 1000.0;
		this.maxSpeed = 2000.0;

		this.target = {
			x: 1080.0 / 2.0,
			y: 650.0 / 2.0 - 300.0,
		};

		this.offsetFromKeyX = 0.0;
		this.offsetFromKeyY = 0.0;

		this.clampedRange = pianoManager.getClampedRange(this.target.x);
    }

	linearizeIsometricX(x) {
		return x * Math.atan(Math.PI / 6.0);
	}

	snapToKey(keyData) {
		this.target.x = this.linearizeIsometricX(keyData.isoX);
		this.target.y = keyData.isoY + 10 + this.offsetFromKeyY;

		this.clampedRange = this.pianoManager.getClampedRange(this.target.x);

		this.target.y = Phaser.Math.Clamp(
			this.target.y,
			this.clampedRange.upperBound,
			this.clampedRange.lowerBound
		);

		this.offsetFromKeyX = 0.0;
	}

	isometrizeLinearDeltaX(x) {
		return x / Math.atan(Math.PI / 6.0);
	}

    handlePointerMoved(pointer) {
		const deltaX = this.isometrizeLinearDeltaX(pointer.movementX);
		this.offsetFromKeyX += deltaX;

		this.offsetFromKeyY = Phaser.Math.Clamp(
			this.offsetFromKeyY + pointer.movementY,
			this.clampedRange.upperBound - this.clampedRange.lowerBound,
			0.0
		);

		this.target.y = Phaser.Math.Clamp(
			this.target.y + pointer.movementY,
			this.clampedRange.upperBound,
			this.clampedRange.lowerBound
		);
    }

	changeToSadDino() {
		this.sprite.setTexture("dino-head2");
		this.sprite.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
	}

	updateHover(hoverIndex) {
		const depth = 104 - PianoConfig.keyCount + hoverIndex * 2;
		this.setDepth(depth);
	}

	update(delta) {
		const newPos = this.movementTrack.trace(delta / 1000.0);

		this.x = newPos.x;
		this.y = newPos.y;
	}
}


/*
should:
-follow mouse position
-display dino sprite
-give x position to piano interactions
-possibly handle join stuff later
*/

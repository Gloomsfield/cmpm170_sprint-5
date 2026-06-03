// dino head controlled by mouse
import { PianoConfig } from "@data/PianoConfig.js";

export class DinoHead extends Phaser.GameObjects.Container {
    constructor(scene, x, y, pianoManager) {
        super(scene, x, y);

        scene.add.existing(this);

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
		const positionDelta = {
			x: this.target.x - this.x,
			y: this.target.y - this.y,
		};

		const positionDeltaMagnitude = Math.sqrt(positionDelta.x * positionDelta.x + positionDelta.y * positionDelta.y);

		if(positionDeltaMagnitude < 0.01) { return; }

		const moveDirection = {
			x: positionDelta.x / positionDeltaMagnitude,
			y: positionDelta.y / positionDeltaMagnitude,
		};

		const speed = positionDeltaMagnitude > 75.0 ? this.maxSpeed : this.minSpeed;

		const moveVector = {
			x: moveDirection.x * Math.min(1.0, positionDeltaMagnitude) * delta / 1000.0 * speed,
			y: moveDirection.y * Math.min(1.0, positionDeltaMagnitude) * delta / 1000.0 * speed,
		};

		const moveVectorMagnitude = Math.sqrt(moveVector.x * moveVector.x + moveVector.y * moveVector.y);

		if(moveVectorMagnitude > positionDeltaMagnitude) {
			this.x = this.target.x;
			this.y = this.target.y;

			return;
		}

		this.x += moveVector.x;
		this.y += moveVector.y;
	}
}


/*
should:
-follow mouse position
-display dino sprite
-give x position to piano interactions
-possibly handle join stuff later
*/

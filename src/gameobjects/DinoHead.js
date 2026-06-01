// dino head controlled by mouse
export class DinoHead extends Phaser.GameObjects.Arc {
    constructor(scene, x, y, pianoManager) {
        super(scene, x, y, 20, 0, 360, false, 0x00ff00);
        
        scene.add.existing(this);

        this.setDepth(1000);
        this.pianoManager = pianoManager;

		this.minSpeed = 1000.0;
		this.maxSpeed = 2000.0;

		this.target = {
			x: 0.0,
			y: 0.0,
		};

		this.offsetFromKeyX = 0.0;
		this.offsetFromKeyY = 0.0;
    }

	linearizeIsometricX(x) {
		return x * Math.atan(Math.PI / 6.0);
	}

	snapToKey(keyData) {
		this.target.x = this.linearizeIsometricX(keyData.isoX);
		this.target.y = keyData.isoY + this.offsetFromKeyY;

		this.offsetFromKeyX = 0.0;
	}

	isometrizeLinearDeltaX(x) {
		return x / Math.atan(Math.PI / 6.0);
	}

    handlePointerMoved(pointer) {
		const deltaX = this.isometrizeLinearDeltaX(pointer.movementX);
		this.offsetFromKeyX += deltaX;

		this.offsetFromKeyY += pointer.movementY;
		this.target.y += pointer.movementY;
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

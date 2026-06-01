// dino head controlled by mouse
export class DinoHead extends Phaser.GameObjects.Arc {
    constructor(scene, x, y, pianoManager) {
        super(scene, x, y, 20, 0, 360, false, 0x00ff00);
        
        scene.add.existing(this);

        this.setDepth(1000);
        this.pianoManager = pianoManager;

		this.offsetFromKeyX = 0.0;
		this.offsetFromKeyY = 0.0;
    }

	linearizeIsometricX(x) {
		return x * Math.atan(Math.PI / 6.0);
	}

	snapToKey(keyData) {
		this.x = this.linearizeIsometricX(keyData.isoX);
		this.y = keyData.isoY + this.offsetFromKeyY;

		this.offsetFromKeyX = 0.0;
	}

	isometrizeLinearDeltaX(x) {
		return x / Math.atan(Math.PI / 6.0);
	}

    handlePointerMoved(pointer) {
		const deltaX = this.isometrizeLinearDeltaX(pointer.movementX);
		this.offsetFromKeyX += deltaX;

		this.offsetFromKeyY += pointer.movementY;
		this.y += pointer.movementY;
    }
}


/*
should:
-follow mouse position
-display dino sprite
-give x position to piano interactions
-possibly handle join stuff later
*/

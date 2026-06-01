// dino head controlled by mouse
export class DinoHead extends Phaser.GameObjects.Arc {
    constructor(scene, x, y, pianoManager) {
        super(scene, x, y, 20, 0, 360, false, 0x00ff00);
        
        scene.add.existing(this);
        this.setDepth(1000);
        this.pianoManager = pianoManager;
    }

    update(pointer) {

        this.x = Phaser.Math.Clamp(pointer.x, 0, this.scene.scale.width);

        const surfaceY = this.pianoManager.PianoCollision(this.x);

        this.y = Phaser.Math.Clamp(pointer.y, 0, surfaceY);
    }
}


/*
should:
-follow mouse position
-display dino sprite
-give x position to piano interactions
-possibly handle join stuff later
*/
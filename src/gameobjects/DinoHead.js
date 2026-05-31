// dino head controlled by mouse
export class DinoHead extends Phaser.GameObjects.Arc {
    constructor(scene, x, y) {
        super(scene, x, y, 20, 0, 360, false, 0x00ff00);

        scene.add.existing(this);
    }
}


/*
should:
-follow mouse position
-display dino sprite
-give x position to piano interactions
-possibly handle join stuff later
*/
// TODO - extend a different type depending on how we want to do the art
// individual piano key
export class PianoKey extends Phaser.GameObjects.Rectangle {

    constructor(scene, x, y) {
        super(scene, x, y, 30, 120, 0xffffff);

        scene.add.existing(this);

        this.isHovered = false;
        this.isPressed = false;
    }

    setHovered(hover) {
        this.isHovered = hover;

        this.updateVisuals();
    }

    setPressed(pressed) {
        this.isPressed = pressed;

        this.updateVisuals();
    }

    updateVisuals() {

        if(this.isPressed) {
            this.setFillStyle(0xff0000);

        } else if(this.isHovered) {
            this.setFillStyle(0xffd700);

        } else {
            this.setFillStyle(0xffffff);
        }
    }
}

/*
should:
-store note name
-store their sound
-handle colored state (when dino is over them)
-play sound when triggered
-report trigger to pianomanager
*/
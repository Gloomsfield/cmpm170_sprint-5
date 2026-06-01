import { PianoKey } from "@gameobjects/PianoKey.js";

// manages piano behavior
export class PianoManager {
    constructor(scene) {
        this.scene = scene;

        this.keys = [];

        this.hoveredKey = null;
        this.pressedKey = null;

        this.createKeys();
    }

    createKeys() {
        for(let i = 0; i < 24; i++) {const key = new PianoKey(this.scene, 100 + i * 35, 500);
            this.keys.push(key);
        }
    }

    update(dinoX, dinoY) {
    let newHoveredKey = null;

    for(const key of this.keys) {

        const halfW = key.width / 2;

        if(dinoX >= key.x - halfW && dinoX <= key.x + halfW
        ) {
            newHoveredKey = key;
            break;
        }
    }

    if(newHoveredKey !== this.hoveredKey) {

        if(this.hoveredKey) {
            this.hoveredKey.setHovered(false);
        }

        this.hoveredKey = newHoveredKey;

        if(this.hoveredKey) {
            this.hoveredKey.setHovered(true);
        }
    }

    let newPressedKey = null;

    if(this.hoveredKey) {
        const bounds = this.hoveredKey.getBounds();

        if(bounds.contains(dinoX, dinoY)) {
            newPressedKey = this.hoveredKey;
        }
    }

    if(newPressedKey !== this.pressedKey) {

        if(this.pressedKey) {
            this.pressedKey.setPressed(false);
        }

        this.pressedKey = newPressedKey;

        if(this.pressedKey) {
            this.pressedKey.setPressed(true);
        }
    }
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
// handles scrolling backgrounds
export class BackgroundManager {
    constructor(scene, gameLength) {
        this.scene = scene;
        this.gameLength = gameLength > 1000 ? gameLength / 1000 : gameLength;

        this.startTime = scene.time.now;
        this.scale = 4;

        this.blueFadeStart = 3;
        this.blueFadeDuration = 12;
        
        this.createLayers();
    }

    speedMultiplier(progress) {
        return 0.008 + Math.pow(progress, 3) * 2.8;
    }

    fadeMultiplier(elapsed, start, duration) {
        return Phaser.Math.Clamp((elapsed - start) / duration, 0, 1);
    }

    createBackgrounds(key, depth) {
        const { centerX: x, centerY: y } = this.scene.cameras.main;

        const blue = this.scene.add.image(x, y, key).setOrigin(0.5).setScale(this.scale).setDepth(depth);

        const width = blue.width * this.scale;
    }

    scrollBackgrounds(pair, speed) {
        pair.blue.x -= speed;

        if (pair.blue.x <= -pair.width) {
            pair.blue.x = pair.red.x + pair.width;
        }

    }

    createLayers() {
        this.blue1 = this.createBackgrounds("B1", -100);
        this.blue2 = this.createBackgrounds("B2", -100);

    }

    update() {
        const elapsed = (this.scene.time.now - this.startTime) / 1000;

        const movementProgress = Phaser.Math.Clamp(elapsed / (this.gameLength * 1000), 0, 1);

        const speedMultiplier = this.speedMultiplier(movementProgress);


        for (const { blue, speed } of this.layers) {
            const distance = speed * elapsed * speedMultiplier;

            this.scrollBackgrounds(blue, distance);

            blue.blue.setAlpha(blueAlpha);
        }

        this.scrollBackgrounds(this.red3, red3Distance);

    }
}
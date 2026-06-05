// handles scrolling backgrounds
export class BackgroundManager {
    constructor(scene, gameLength) {
        this.scene = scene;
        this.gameLength = gameLength > 1000 ? gameLength / 1000 : gameLength;

        this.startTime = scene.time.now;
        this.scale = 4;

        this.blueFadeStart = 3;
        this.blueFadeDuration = 12;
        this.redFadeStart = 15;

        this.redSpeed = 30;

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

        const red = this.scene.add.image(x + width, y, key).setOrigin(0.5).setScale(this.scale).setDepth(depth);

        return { blue, red, width };
    }

    scrollBackgrounds(pair, speed) {
        pair.blue.x -= speed;
        pair.red.x -= speed;

        if (pair.blue.x <= -pair.width) {
            pair.blue.x = pair.red.x + pair.width;
        }

        if (pair.red.x <= -pair.width) {
            pair.red.x = pair.blue.x + pair.width;
        }
    }

    createLayers() {
        this.red1 = this.createBackgrounds("R1", -200);
        this.red2 = this.createBackgrounds("R2", -150);
        this.red3 = this.createBackgrounds("R3", -125);

        this.blue1 = this.createBackgrounds("B1", -100);
        this.blue2 = this.createBackgrounds("B2", -100);

        this.red3.blue.setAlpha(0);
        this.red3.red.setAlpha(0);

        this.layers = [
            { red: this.red1, blue: this.blue1, speed: 40 },
            { red: this.red2, blue: this.blue2, speed: 70 }
        ];
    }

    update() {
        const elapsed = (this.scene.time.now - this.startTime) / 1000;

        const movementProgress = Phaser.Math.Clamp(elapsed / (this.gameLength * 1000), 0, 1);

        const speedMultiplier = this.speedMultiplier(movementProgress);

        const blueAlpha = 1 - Math.pow(this.fadeMultiplier(elapsed, this.blueFadeStart, this.blueFadeDuration), 2);

        const red3Alpha = this.fadeMultiplier(elapsed, this.redFadeStart, this.redFadeStart);

        for (const { red, blue, speed } of this.layers) {
            const distance = speed * elapsed * speedMultiplier;

            this.scrollBackgrounds(red, distance);
            this.scrollBackgrounds(blue, distance);

            blue.blue.setAlpha(blueAlpha);
            blue.red.setAlpha(blueAlpha);
        }

        const red3Distance = this.redSpeed * elapsed * speedMultiplier;

        this.scrollBackgrounds(this.red3, red3Distance);

        this.red3.blue.setAlpha(red3Alpha);
        this.red3.red.setAlpha(red3Alpha);
    }
}
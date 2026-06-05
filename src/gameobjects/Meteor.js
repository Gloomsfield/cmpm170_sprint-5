// meteor that hates music or something
export class Meteor {
    constructor(scene, gameLength = 20000) {
        this.scene = scene;
        this.gameLength = gameLength;

        this.x = scene.cameras.main.centerX + 700;
        this.y = -200;

        this.startX = this.x;
        this.startY = this.y;

        this.appearTime = 15000;
        this.fadeDuration = 17000;

        this.startScale = 1;
        this.endScale = 10;

        this.moveSpeedX = -0.3;
        this.moveSpeedY = 0.4;

        this.startAlpha = 0;
        this.endAlpha = 1;

        this.trembleIntensity = 3;
        this.trembleSpeed = 0.006;

        this.depth = -90;

		this.hasInitialized = false;
		this.startTime = 0.0;

        this.createMeteor();
    }

    createMeteor() {
        this.meteor = this.scene.add.image(this.x, this.y, "meteor")
        .setOrigin(0.5).setDepth(this.depth).setScale(this.startScale).setAlpha(this.startAlpha);
    }

    update() {
		if(!this.hasInitialized) {
			this.startTime = this.scene.time.now;
			this.hasInitialized = true;
		}

        const elapsed = this.scene.time.now - this.startTime;

        if (elapsed < this.appearTime) return;

        const ease = Phaser.Math.Clamp((elapsed - this.appearTime) / this.fadeDuration, 0, 1);
        const eased = Phaser.Math.Easing.Cubic.Out(ease);

        const scale = Phaser.Math.Linear(this.startScale, this.endScale, eased);
        this.meteor.setScale(scale);

        const alpha = Phaser.Math.Linear(this.startAlpha, this.endAlpha, eased);
        this.meteor.setAlpha(alpha);

        this.startX += this.moveSpeedX;
        this.startY += this.moveSpeedY;

        const shake = this.trembleIntensity * eased;
        const timed = this.scene.time.now * this.trembleSpeed;

        const offsetX = Math.sin(timed * 12.9898) * shake;
        const offsetY = Math.cos(timed * 78.233) * shake;

        this.meteor.setPosition(this.startX + offsetX, this.startY + offsetY);
    }
}

/*
should:
-appear towards end of gamescene
-grow bigger and move to the side 
-destroy on end of gamescene
*/

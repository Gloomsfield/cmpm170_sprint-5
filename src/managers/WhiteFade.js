export class WhiteFade {
    static createWhiteOverlay(scene) {
        const { width, height } = scene.scale;

        scene.whiteOverlay = scene.add.rectangle(width / 2, height / 2, width, height, 0xffffff).setScrollFactor(0).setDepth(100000).setAlpha(1);

        return scene.whiteOverlay;
    }

    static fadeIn(scene, duration = 150, onComplete = null) {
        const { width, height } = scene.scale;

        scene.whiteOverlay = scene.add.rectangle(width / 2, height / 2, width, height, 0xffffff).setScrollFactor(0).setDepth(100000).setAlpha(0);

        scene.tweens.add({targets: scene.whiteOverlay, alpha: 1, duration, ease: "Linear",
            onComplete: () => {
                if (onComplete) {
                    onComplete();
                }
            }
        });

        return scene.whiteOverlay;
    }

    static fadeOut(scene, duration = 1000, onComplete = null) {

        scene.tweens.add({targets: scene.whiteOverlay, alpha: 0, duration, ease: "Linear",
            onComplete: () => {
                scene.whiteOverlay.destroy();
                scene.whiteOverlay = null;

                if (onComplete) {
                    onComplete();
                }
            }
        });

        return scene.whiteOverlay;
    }
}
// ending scene after meteor
export class EndScene extends Phaser.Scene {
    constructor() {
        super("end_scene");
    }
}

/*
should:
-show end text (we can make it random per word between ones in an array or something)
-receive song data
-play back recorded song
-probably add play again option (maybe just make it fade back into mainmenu)
*/
// ending scene after meteor
import { Composer } from "@managers/Composer.js";

export class End extends Phaser.Scene {
    constructor() {
        super("end");
    }

    init(data) {
        this.songData = data.songData;
    }

    create() {
        this.cameras.main.setBackgroundColor("#ffffff");
        this.add.text(this.scale.width / 2, 300, "Your Last Sonata", 
        {
            color: "#000000",
            fontFamily: "fancy",
            fontSize: "64px"
        }).setOrigin(0.5);

        this.composer = new Composer(this);
        this.composer.playSong(this.songData);
    }
}

/*
should:
-show end text (we can make it random per word between ones in an array or something)
-receive song data
-play back recorded song
-probably add play again option (maybe just make it fade back into mainmenu)
*/

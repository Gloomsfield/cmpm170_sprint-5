// ending scene after meteor
import { Composer } from "@managers/Composer.js";
import { WhiteFade } from "@managers/WhiteFade.js";

export class End extends Phaser.Scene {
    constructor() {
        super("end");
    }

    init(data) {
        this.songData = data.songData;
    }

    create() {
        this.cameras.main.setBackgroundColor("#ffffff");
        WhiteFade.createWhiteOverlay(this);
        
        this.add.text(this.scale.width / 2, 300, "Your Last Sonata", 
        {
            color: "#000000",
            fontFamily: "fancy",
            fontSize: "64px"
        }).setOrigin(0.5);

        this.composer = new Composer(this);
        const screech = this.sound.add("screech", {volume: 0.25});

        screech.once("complete", () => {WhiteFade.fadeOut(this, 1000, () => {this.composer.playSong(this.songData);});});
        screech.play();
    }
}

/*
should:
-show end text (we can make it random per word between ones in an array or something)
-receive song data
-play back recorded song
-probably add play again option (maybe just make it fade back into mainmenu)
*/

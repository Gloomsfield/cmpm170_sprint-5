// records and replays piano song 
export class Composer {
    constructor(scene) {
        this.scene = scene;

        this.noteSounds = [];

        for(let i = 0; i < 24; i++) {

            const sound = scene.sound.add("a440hz-c4_audio").setDetune((i - 12) * 100);
            this.noteSounds.push(sound);
        }
    }

    playSong(songData) {
		this.scene.time.addEvent({
			delay: 30000,
			callback: () => {
				this.scene.scene.start("mainMenu_scene");
			},
			callbackScope: this,
			loop: false,
		});

        for(const note of songData) {

            this.scene.time.delayedCall(note.noteTiming, () => {
                
                const sound = this.noteSounds[note.noteIndex];
                sound.stop();
                sound.play();
                }
            );
        }
    }
}

/*
should:
-record when game begins
-record note order
-record timing between notes
-store finished song data
-return song data when game ends
-play back recorded performance for endscene
*/

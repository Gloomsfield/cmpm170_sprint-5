// records and replays piano song 
export class Composer {
    constructor(scene) {
        this.scene = scene;
    }

    playSong(songData) {
        for(const note of songData) {

            this.scene.time.delayedCall(note.noteTiming, () => {
                const sound = this.scene.sound.add("a440hz-c4_audio").setDetune((note.noteIndex - 12) * 100);
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
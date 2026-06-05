// meteor that hates music or something
export class Meteor {
    constructor(scene, gameLength = 20000) {
        this.scene = scene;

        this.createMeteor();
    }

    createMeteor() {
        this.meteor = this.scene.add.image(this.x, this.y, "meteor")
    }

    update() {
        
    }
}

/*
should:
-appear towards end of gamescene
-grow bigger and move to the side 
-destroy on end of gamescene
*/
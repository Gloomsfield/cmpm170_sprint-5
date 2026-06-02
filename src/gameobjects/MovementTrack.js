
export class TrackConstraint {
	constructor(x, y, key) {
		this.x = x;
		this.y = y;
		this.key = key;
	}
}

export class MovementTrack {
	constructor() {
		this.constraints = new Map();
	}

	addConstraint(constraint) {
		this.constraints.set(constraint.key, constraint);

		this.reconstruct();
	}

	removePoint(constraintKey) {
		this.constraints.delete(constraintKey);

		this.reconstruct();
	}

	// TODO
	reconstruct() { }

	// TODO
	trace(xPosition) { }
}



export class TrackConstraint {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

export class MovementTrack {
	constructor() {
		this.constraints = [];

		this._firstSegmentLengths = new Array(100);

		this._t = 0.0;
	}

	addConstraint(constraint) {
		this.constraints.push(constraint);
	}

	evaluateOnTrack(t, curveIndex) {
		if(this.constraints.length <= curveIndex + 1) { return {
			x: this.constraints[this.constraints.length - 1].x,
			y: this.constraints[this.constraints.length - 1].y
		}; }

		const p0 = this.constraints[curveIndex];
		const p1 = this.constraints[curveIndex + 1];

		return {
			x: p1.x * t + (1.0 - t) * p0.x,
			y: p1.y * t + (1.0 - t) * p0.y
		};
	}

	trace(distance, gameobject) {
		const curveIndex = Math.floor(this._t);
		const t = this._t - Math.floor(this._t);

		if(this.constraints.length <= curveIndex + 1) { return; }

		const constraintDelta = {
			x: this.constraints[curveIndex + 1].x - this.constraints[curveIndex].x,
			y: this.constraints[curveIndex + 1].y - this.constraints[curveIndex].y
		};

		const deltaMagnitude = Math.sqrt(constraintDelta.x * constraintDelta.x + constraintDelta.y * constraintDelta.y);

		this._t += distance / deltaMagnitude;
		const delta = this.evaluateOnTrack(t, curveIndex);

		gameobject.setPosition(delta.x, delta.y);
	}
}


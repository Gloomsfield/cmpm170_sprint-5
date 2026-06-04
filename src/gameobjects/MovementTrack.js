
export class TrackConstraint {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

export class MovementTrack {
	constructor() {
		this.constraints = [];

		this._firstSegmentLengths = new Array(10);

		this._t = 0.0;
	}

	addConstraint(constraint) {
		let index = 0;
		for(; index < this.constraints.length; index++) {
			if(constraint.x < this.constraints[index].x) {
				break;
			}
		}

		this.constraints.push(constraint);

		this.reconstruct();
	}

	removeConstraint(constraintIndex) {
		this.constraints.splice(constraintIndex, 1);

		this.reconstruct();
	}

	calculateFirstSegmentLengths() {
		for(let i = 0; i < this._firstSegmentLengths.length; i++) {
			this._firstSegmentLengths[i] = 0;
		}

		if(this.constraints.length < 2) { return; }

		let oldPosition = this.evaluateHermite2(0.0);

		for(let i = 1; i <= this._firstSegmentLengths.length; i++) {
			const newPosition = this.evaluateHermite2(i / 10.0);

			const delta = {
				x: newPosition.x - oldPosition.x,
				y: newPosition.x - oldPosition.y
			};

			const distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

			this._firstSegmentLength += distance;
		}
	}

	reconstruct() {
		this.calculateFirstSegmentLength();
	}

	evaluateHermite(q0, q1, n0, n1, t) {
		const term1 = 2.0 * t * t * t - 3.0 * t * t + 1.0;
		const term2 = t * t * t - 2.0 * t * t + t;
		const term3 = -2.0 * t * t * t + 3.0 * t * t;
		const term4 = t * t * t - t * t;

		return q0 * term1 + n0 * term2 + q1 * term3 + n1 * term4;
	}

	getTangentAtIndex(index) {
		if(this.constraints.length < 3) { return { x: 0.0, y: 0.0 }; }

		if(index == 0 || index == this.constraints.length - 1) { return { x: 0.0, y: 0.0 }; }

		return {
			x: 0.5 * (this.constraints[index + 1].x - this.constraints[index].x + this.constraints[index].x - this.constraints[index - 1].x),
			y: 0.5 * (this.constraints[index + 1].y - this.constraints[index].y + this.constraints[index].y - this.constraints[index - 1].y)
		};
	}

	evaluateHermite2(t) {
		const index = Math.floor(t);
		const offsetT = t - index;

		if(this.constraints.length == 1) { return this.constraints[0]; }
		if(this.constraints.length < 2) { return; }

		const p0 = this.constraints[index];
		const p1 = index + 1 < this.constraints.length ? this.constraints[index + 1] : p0;
		const m0 = this.getTangentAtIndex(index);
		const m1 = this.getTangentAtIndex(index + 1);

		return {
			x: this.evaluateHermite(p0.x, p1.x, m0.x, m1.x, offsetT),
			y: this.evaluateHermite(p0.y, p1.y, m0.y, m1.y, offsetT)
		};
	}

	trace(deltaT) {
		if(this._t > 1.0) {
			this._t -= 1.0;
			this.removeConstraint(0);
		}

		this._t += deltaT / this._firstSegmentLengths[Math.floor(this._t * this._firstSegmentLengths.length)];

		if(this._t > this.constraints.length) { return { x: 0.0, y: 0.0}; }

		return this.evaluateHermite2(this._t);
	}
}


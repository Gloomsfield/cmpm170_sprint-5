
export class TrackConstraint {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

export class MovementTrack {
	constructor() {
		this.constraints = [];

		this._firstSegmentLength = 0.0;

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

	calculateFirstSegmentLength() {


		for(let i = 1; i <= 10; i++) {
			const newPosition = {
				x: evaluateHermite(i / 10.0)
			};
		}
	}

	reconstruct() {
		let sigma = 0;

		for(let i = 1; i < this.constraints.length - 1; i++) {
			let oldPosition = trace(0);

			for(let j = 1; j <= 10; j++) {
				const newPosition = {
					x: evaluateHermite()
				};

				const delta = {
					x: newPosition.x - oldPosition.x,
					y: newPosition.y - oldPosition.y
				};

				let distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

				sigma += distance;

				oldPosition = newPosition;
			}
		}

		length = sigma;
	}

	evaluateHermite(q0, q1, n0, n1, t) {
		const term1 = 2.0 * t * t * t - 3.0 * t * t + 1.0;
		const term2 = t * t * t - 2.0 * t * t + t;
		const term3 = -2.0 * t * t * t + 3.0 * t * t;
		const term4 = t * t * t - t * t;

		return q0 * term1 + n0 * term2 + q1 * term3 + n1 * term4;
	}

	trace(deltaT) {
		this._t += deltaT;

		if(this._t > 1.0) {
			this._t -= 1.0;
			this.removeConstraint(0);
		}

		if(this._t > this.constraints.length) { return { x: 0.0, y: 0.0}; }

		const index = Math.floor(this._t);
		const offsetT = this._t - index;

		const p0 = this.constraints[index];
		const p1 = index + 1 < this.constraints.length ? this.constraints[index + 1] : p0;
		const m0 = index - 1 > -1 ? { x: p0.x - this.constraints[index - 1].x, y: p0.y - this.constraints[index - 1].y } : { x: 0.0, y: 0.0 };
		const m1 = index + 2 < this.constraints.length ? { x: p1.x - this.constraints[index - 1].x, y: p0.y - this.constraints[index - 1].y } : { x: 0.0, y: 0.0 };

		return {
			x: this.evaluateHermite(p0.x, p1.x, m0.x, m1.x, offsetT),
			y: this.evaluateHermite(p0.y, p1.y, m0.y, m1.y, offsetT)
		};
	}
}


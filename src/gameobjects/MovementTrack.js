
export class TrackConstraint {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

export class MovementTrack {
	length = 0;
	
	constructor() {
		this.constraints = [];

		this._t = 0.0;
	}

	addConstraint(constraint) {
		let index = 0;
		for(; index < constraints.length; index++) {
			if(constraint.x < this.constraints[index].x) {
				break;
			}
		}

		this.constraints.push(constraint);

		this.reconstruct();
	}

	removePoint(constraintKey) {
		this.constraints.delete(constraintKey);

		this.reconstruct();
	}

	reconstruct() {
		let sigma = 0;

		for(let i = 1; i < this.constraints.length - 1; i++) {
			let oldPosition = trace(0);

			for(let j = 1; j <= 10; j++) {
				const newPosition = trace(j / 10.0 + i);

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
		const term1 = 2.0 * t * t * t - 3.0 *t * t + 1.0;
		const term2 = t * t * t - 2.0 * t * t + t;
		const term3 = -2.0 * t * t * t + 3.0 * t * t;
		const term4 = t * t * t - t * t;

		return q0 * term1 + n0 * term2 + q1 * term3 + n1 * term4;
	}

	trace(deltaT) {
		this._t += deltaT;

		const index = Math.floor(this._t);
		const offsetT = this._t - index;

		const p0 = this.constraints[index];
		const p1 = index + 1 < this.constraints.length ? this.constraints[index + 1] : p0;
		const m0 = index - 1 > -1 ? { x: p0.x - this.constraints[index - 1].x, y: p0.y - this.constraints[index - 1].y } : { x: 0.0, y: 0.0 };
		const m1 = index + 2 < this.constraints.length ? { x: p1.x - this.constraints[index - 1].x, y: p0.y - this.constraints[index - 1].y } : { x: 0.0, y: 0.0 };

		return {
			x: evaluateHermite(p0.x, p1.x, m0.x, m1.x, offsetT),
			y: evaluateHermite(p0.y, p1.y, m0.y, m1.y, offsetT)
		};
	}
}


const cupStatus = {
	UNTOUCHED: 0,
	HIT: 1,
	PENDING: 2,
}

class beerpong {

	constructor(noOfCups, noOfBalls) {
		this.noOfCups = noOfCups
		this.noOfBalls = noOfBalls

		this.team1Cups = new Array(noOfCups).fill(cupStatus.UNTOUCHED)
		this.team2Cups = new Array(noOfCups).fill(cupStatus.UNTOUCHED)

		this.bounce = false
		this.currentTeam = 1
		this.currentThrows = 0
		this.extraCups = 0
		this.extraRound = false
	}

	//A cup with index @param {cupIndex} is hit.
	hitCup(cupIndex) {
		if (cupIndex >= this.noOfCups) return

		//If the team has extra cups to remove.
		if (this.extraRound) {
			this.currentTeam > 0 ? this.team2Cups[cupIndex] = cupStatus.HIT : this.team1Cups[cupIndex] = cupStatus.HIT
			this.extraCups--
			if (this.extraCups <= 0) {
				this.changeTeam()
			}
			return;
		}

		this.extraCups += this.bounce ? 1 : 0

		if (this.currentTeam > 0) {
			if (this.team2Cups[cupIndex] === cupStatus.PENDING) {
				this.extraCups += 2;
			} else {
				this.team2Cups[cupIndex] = cupStatus.PENDING
			}
		} else {
			if (this.team1Cups[cupIndex] === cupStatus.PENDING) {
				this.extraCups += 2;
			} else {
				this.team1Cups[cupIndex] = cupStatus.PENDING
			}
		}
		this.currentThrows++

		if (this.currentThrows >= this.noOfBalls) {
			this.changeTeam()
		}
	}

	//A team has done all their throws.
	changeTeam() {
		for (let i = 0; i < this.team1Cups.length; i++) {
			this.team1Cups[i] = this.team1Cups[i] === cupStatus.PENDING ? cupStatus.HIT : this.team1Cups[i]
		}

		for (let i = 0; i < this.team2Cups.length; i++) {
			this.team2Cups[i] = this.team2Cups[i] === cupStatus.PENDING ? cupStatus.HIT : this.team2Cups[i]
		}

		//If the team has any extra cups to remove.
		if (this.extraCups > 0) {
			this.extraRound = true
			return;
		} else {
			this.extraRound = false
			this.currentTeam *= -1
			this.currentThrows = 0
		}
	}

	//A missed throw.
	miss() {
		this.currentThrows++
		if (this.currentThrows >= this.noOfBalls) {
			this.changeTeam()
		}
	}

}

// class team {
// 	let players = []
//
// 	constructor(noOfPlayers) {
// 		this.noOfPlayers = noOfPlayers
// 	}
// }
//
// class player {
// 	constructor(name) {
// 		this.name = name
// 	}
// }

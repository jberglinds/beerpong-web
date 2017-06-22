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
	}

	hitCup(cupIndex) {
		if (cupIndex >= this.noOfCups) return

		if (this.currentTeam > 0) {
			this.team2Cups[cupIndex] = cupStatus.PENDING
		} else {
			this.team1Cups[cupIndex] = cupStatus.PENDING
		}
		this.currentThrows++

		if (this.currentThrows >= this.noOfBalls) {
			this.changeTeam()
		}
	}

	changeTeam() {
		this.currentTeam *= -1
		this.currentThrows = 0

		for (let i = 0; i < this.team1Cups.length; i++) {
			this.team1Cups[i] = this.team1Cups[i] === cupStatus.PENDING ? cupStatus.HIT : this.team1Cups[i]
		}

		for (let i = 0; i < this.team2Cups.length; i++) {
			this.team2Cups[i] = this.team2Cups[i] === cupStatus.PENDING ? cupStatus.HIT : this.team2Cups[i]
		}
	}

	getCup(team, index) {
		return team === 1 ? this.team1Cups[index] : this.team2Cups[index]
	}

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

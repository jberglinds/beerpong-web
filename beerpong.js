class beerpong {

	constructor(noOfCups, noOfBalls) {
		this.noOfCups = noOfCups
		this.noOfBalls = noOfBalls

		this.team1Cups = new Array(noOfCups).fill(false)
		this.team2Cups = new Array(noOfCups).fill(false)

		this.currentTeam = 1
		this.currentThrows = 0
	}

	hitCup(cupIndex) {
		if (cupIndex >= this.noOfCups) return

		if (this.currentTeam > 0) {
			this.team2Cups[cupIndex] = true
		} else {
			this.team1Cups[cupIndex] = true
		}
		this.currentThrows++

		if (this.currentThrows >= this.noOfBalls) {
			this.currentTeam *= -1
			this.currentThrows = 0
		}
	}

	getCup(team, index) {
		return team === 1 ? this.team1Cups[index] : this.team2Cups[index];
	}

	getCurrentTeam() {
		return this.currentTeam
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

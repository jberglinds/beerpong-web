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

		this.team1 = new team('Team 1', this.team1Cups, [])
		this.team2 = new team('Team 2', this.team2Cups, [])

		this.bounceActive = false
		this.currentTeam = 1
		this.currentThrows = 0

		this.extraCups = 0
		this.extraRound = false

		this.statusMessage = `${this.currentTeam > 0 ? 'Blue' : 'Red'} Team: ${this.noOfBalls} throw(s) left`
	}

	// Currently playing team
	getCurrentTeam() {
		return this.getTeam(this.currentTeam)
	}

	// Not currently playing team
	getOtherTeam() {
		return this.getTeam(this.currentTeam * -1)
	}

	getTeam(teamID) {
		return teamID > 0 ? this.team1 : this.team2
	}

	getCupStatus(teamID, cupIndex) {
		return this.getTeam(teamID).getCupStatus(cupIndex)
	}

	//A cup with index @param {cupIndex} is hit.
	hitCup(cupIndex, teamID) {
		if (cupIndex < 0 || cupIndex >= this.noOfCups) throw Error('Invalid cup index')
		if (teamID != this.currentTeam) return

		//If the team has extra cups to remove.
		if (this.extraRound) {
			this.getOtherTeam().removeCup(cupIndex)
			this.extraCups--
			this.statusMessage = `${this.currentTeam > 0 ? 'Blue' : 'Red'} Team: Remove ${this.extraCups} extra cup(s)`
			if (this.extraCups <= 0) {
				this.changeTeam()
			}
			return
		}

		this.extraCups += this.bounceActive ? 1 : 0

		if (this.getOtherTeam().getCupStatus(cupIndex) === cupStatus.PENDING) {
			this.extraCups += 2
		} else {
			this.getOtherTeam().hitCup(cupIndex)
		}

		this.currentThrows++
		this.statusMessage = `${this.currentTeam > 0 ? 'Blue' : 'Red'} Team: ${this.noOfBalls - this.currentThrows} throw(s) left`

		if (this.currentThrows >= this.noOfBalls) {
			this.changeTeam()
		}

	}

	//A team has done all their throws.
	changeTeam() {
		this.getOtherTeam().removePendingCups()

		//If the team has any extra cups to remove.
		if (this.extraCups > 0) {
			this.extraRound = true
			this.statusMessage = `${this.currentTeam > 0 ? 'Blue' : 'Red'} Team: Remove ${this.extraCups} extra cup(s)`
			return
		} else {
			this.extraRound = false
			this.currentTeam *= -1
			this.currentThrows = 0
			this.bounceActive = false
			this.statusMessage = `${this.currentTeam > 0 ? 'Blue' : 'Red'} Team: ${this.noOfBalls} throw(s) left`
		}

	}

	//A missed throw.
	miss() {
		this.currentThrows++
		this.statusMessage = `${this.currentTeam > 0 ? 'Red' : 'Blue'} Team: ${this.noOfBalls - this.currentThrows} throw(s) left`
		if (this.currentThrows >= this.noOfBalls) {
			this.changeTeam()
		}
	}

}

class team {
	constructor(teamName, cups, players) {
		this.teamName = teamName
		this.cups = cups
		this.players = players
	}

	getCups() {
		return this.cups
	}

	// Set all pending cups to hit
	removePendingCups() {
		this.cups = this.cups.map(item => item === cupStatus.PENDING ? cupStatus.HIT : item)
	}

	getCupStatus(index) {
		return this.cups[index]
	}

	hitCup(index) {
		this.cups[index] = cupStatus.PENDING
	}

	removeCup(index) {
		this.cups[index] = cupStatus.HIT
	}


}

class player {
	constructor(name) {
		this.name = name
	}
}

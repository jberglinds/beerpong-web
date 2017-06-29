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

		this.bounceActive = false
		this.currentTeam = 1
		this.currentThrows = 0

		this.extraCups = 0
		this.extraRound = false

		this.statusMessage = `${this.currentTeam > 0 ? 'Blue' : 'Red'} Team: ${this.noOfBalls} throw(s) left`
	}

	//A cup with index @param {cupIndex} is hit.
	hitCup(cupIndex, teamID) {
		if (cupIndex < 0 || cupIndex >= this.noOfCups) throw Error('Invalid cup index')
		if (teamID != this.currentTeam) return

		let opponentCups = this.currentTeam < 0 ? this.team1Cups : this.team2Cups

		//If the team has extra cups to remove.
		if (this.extraRound) {
			opponentCups[cupIndex] = cupStatus.HIT
			this.extraCups--
			this.statusMessage = `${this.currentTeam > 0 ? 'Blue' : 'Red'} Team: Remove ${this.extraCups} extra cup(s)`
			if (this.extraCups <= 0) {
				this.changeTeam()
			}
			return
		}

		this.extraCups += this.bounceActive ? 1 : 0

		if (opponentCups[cupIndex] === cupStatus.PENDING) {
			this.extraCups += 2
		} else {
			opponentCups[cupIndex] = cupStatus.PENDING
		}

		this.currentThrows++
		this.statusMessage = `${this.currentTeam > 0 ? 'Blue' : 'Red'} Team: ${this.noOfBalls - this.currentThrows} throw(s) left`

		if (this.currentThrows >= this.noOfBalls) {
			this.changeTeam()
		}

	}

	//A team has done all their throws.
	changeTeam() {
		// Change all pending cups to hit
		this.team1Cups = this.team1Cups.map(item => item === cupStatus.PENDING ? cupStatus.HIT : item)
		this.team2Cups = this.team2Cups.map(item => item === cupStatus.PENDING ? cupStatus.HIT : item)

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

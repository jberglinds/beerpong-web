const CupStatus = {
	UNTOUCHED: 0,
	HIT: 1,
	PENDING: 2,
}

const StatusMessage = {
	THROWS_LEFT: 0,
	REMOVE_EXTRA: 1,
}

class Beerpong {
	constructor(noOfCups, noOfBalls) {
		this.noOfCups = noOfCups
		this.noOfBalls = noOfBalls

		this.team1 = new Team('Emil Team', noOfCups, [])
		this.team2 = new Team('Red Team', noOfCups, [])

		this.bounceActive = false
		this.currentTeam = 1
		this.throwCount = 0

		this.extraCups = 0
		this.extraRound = false

		this.setStatusMessage(StatusMessage.THROWS_LEFT)
	}

	setStatusMessage(type) {
		switch (type) {
		case StatusMessage.THROWS_LEFT:
			this.statusMessage = `${this.getCurrentTeam().getTeamName()}: ${this.noOfBalls - this.throwCount} throw(s) left`
			break
		case StatusMessage.REMOVE_EXTRA:
			this.statusMessage = `${this.getCurrentTeam().getTeamName()}: Remove ${this.extraCups} extra cup(s)`
			break
		}
	}
	// Currently playing team
	getCurrentTeam() {
		return this.getTeam(this.currentTeam)
	}

	// Team that is not currently playing
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
			this.setStatusMessage(StatusMessage.REMOVE_EXTRA)
			if (this.extraCups <= 0) {
				this.changeTeam()
			}
			return
		}

		this.extraCups += this.bounceActive ? 1 : 0

		if (this.getOtherTeam().getCupStatus(cupIndex) === CupStatus.PENDING) {
			this.extraCups += 2
		} else {
			this.getOtherTeam().hitCup(cupIndex)
		}

		this.throwCount++
		this.setStatusMessage(StatusMessage.THROWS_LEFT)

		if (this.throwCount >= this.noOfBalls) {
			this.changeTeam()
		}

	}

	//A team has done all their throws.
	changeTeam() {
		this.getOtherTeam().removePendingCups()

		//If the team has any extra cups to remove.
		if (this.extraCups > 0) {
			this.extraRound = true
			this.setStatusMessage(StatusMessage.REMOVE_EXTRA)
			return
		} else {
			this.extraRound = false
			this.currentTeam *= -1
			this.throwCount = 0
			this.bounceActive = false
			this.setStatusMessage(StatusMessage.THROWS_LEFT)
		}

	}

	//A missed throw.
	miss() {
		this.throwCount++
		this.setStatusMessage(StatusMessage.THROWS_LEFT)
		if (this.throwCount >= this.noOfBalls) {
			this.changeTeam()
		}
	}

}

class Team {
	constructor(teamName, noOfCups, players) {
		this.teamName = teamName
		this.cups = new Array(noOfCups).fill(CupStatus.UNTOUCHED)
		this.players = players
	}

	getTeamName() {
		return this.teamName
	}

	getCups() {
		return this.cups
	}

	// Set all pending cups to hit
	removePendingCups() {
		this.cups = this.cups.map(item => item === CupStatus.PENDING ? CupStatus.HIT : item)
	}

	getCupStatus(index) {
		return this.cups[index]
	}

	hitCup(index) {
		this.cups[index] = CupStatus.PENDING
	}

	removeCup(index) {
		this.cups[index] = CupStatus.HIT
	}


}

class Player {
	constructor(name) {
		this.name = name
	}
}

import Team from './Team'
import Player from './Player'
import CupStatus from '../common/CupStatus'

const StatusMessage = {
	THROWS_LEFT: 0,
	REMOVE_EXTRA: 1,
}

export default class Beerpong {
	constructor(noOfCups, noOfBalls) {
		this.noOfCups = noOfCups
		this.noOfBalls = noOfBalls

		this.team1 = new Team('Dickteam', noOfCups, [
			new Player(1, 'Jonathan'),
			new Player(2, 'Emil'),
		])
		this.team2 = new Team('Snoken', noOfCups, [
			new Player(3, 'Jonas'),
			new Player(4, 'Matteus'),
		])

		this.bounceActive = false
		this.currentTeam = 1
		this.throwCount = 0
		this.activePlayer = null

		this.extraCups = 0
		this.extraRound = false

		this.setStatusMessage(StatusMessage.THROWS_LEFT)
	}

	getPlayersInTeam(teamID) {
		return this.getTeam(teamID).getPlayerObjects()
	}

	setActivePlayer(playerID) {
		this.activePlayer = this.getCurrentTeam().getPlayer(playerID)
	}

	setStatusMessage(type) {
		switch (type) {
		case StatusMessage.THROWS_LEFT:
			this.statusMessage = `${this.getCurrentTeam().getTeamName()}: ${this.noOfBalls - this.throwCount} throw(s) left`
			break
		case StatusMessage.REMOVE_EXTRA:
			this.statusMessage = `${this.getCurrentTeam().getTeamName()}: Remove ${this.extraCups} extra cup(s)`
			break
		default:
			break
		}
	}

	getCurrentTeamID() {
		return this.currentTeam
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

	// A cup with index @param {cupIndex} is hit.
	hitCup(cupIndex, teamID) {
		if (cupIndex < 0 || cupIndex >= this.noOfCups) throw Error('Invalid cup index')
		if (teamID !== this.currentTeam) return

		// If the team has extra cups to remove.
		if (this.extraRound) {
			this.getOtherTeam().removeCup(cupIndex)
			this.extraCups -= 1
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

		this.activePlayer.registerHit(this.bounceActive)

		this.throwCount += 1
		this.setStatusMessage(StatusMessage.THROWS_LEFT)
		this.bounceActive = false

		if (this.throwCount >= this.noOfBalls) {
			this.changeTeam()
		}
	}

	// A team has done all their throws.
	changeTeam() {
		this.getOtherTeam().removePendingCups()

		// If the team has any extra cups to remove.
		if (this.extraCups > 0) {
			this.extraRound = true
			this.setStatusMessage(StatusMessage.REMOVE_EXTRA)
		} else {
			this.extraRound = false
			this.currentTeam *= -1
			this.throwCount = 0
			this.bounceActive = false
			this.setStatusMessage(StatusMessage.THROWS_LEFT)
		}
	}

	// A missed throw.
	miss() {
		this.throwCount += 1
		this.activePlayer.registerMiss(this.bounceActive)
		this.setStatusMessage(StatusMessage.THROWS_LEFT)
		if (this.throwCount >= this.noOfBalls) {
			this.changeTeam()
		}
	}

}

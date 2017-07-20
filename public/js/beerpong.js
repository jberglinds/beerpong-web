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

		this.team1 = new Team('Dickteam', noOfCups, [
			new Player(1, 'Jonathan'),
			new Player(2, 'Emil')
		])
		this.team2 = new Team('Snoken', noOfCups, [
			new Player(3, 'Jonas'),
			new Player(4, 'Matteus')
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

		this.activePlayer.registerHit(this.bounceActive)

		this.throwCount++
		this.setStatusMessage(StatusMessage.THROWS_LEFT)
		this.bounceActive = false

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
		this.activePlayer.registerMiss(this.bounceActive)
		this.setStatusMessage(StatusMessage.THROWS_LEFT)
		if (this.throwCount >= this.noOfBalls) {
			this.changeTeam()
		}
	}

}

class Team {
	/**
	 * Create a new Team
	 * @param  {String} teamName name of the team
	 * @param  {number} noOfCups number of cups to fill up
	 * @param  {Array<Player>} players the players in the team
	 */
	constructor(teamName, noOfCups, players) {
		this.teamName = teamName
		this.cups = new Array(noOfCups).fill(CupStatus.UNTOUCHED)
		this.players = players
	}

	/**
	 * Gets the player with the given id
	 * @param  {number} id id of the player to get
	 * @return {Player} the player with the id
	 */
	getPlayer(id) {
		return this.players.find(player => player.id == id)
	}

	/**
	 * Gets an array with an object for each player containing
	 * {
	 * 	name: player name
	 * 	id: player id
	 * }
	 * @return {Array<Object>}
	 */
	getPlayerObjects() {
		return this.players.map(player => {
			return {
				name: player.name,
				id: player.id
			}
		})
	}

	/**
	 * Gets the name of the team
	 * @return {String}
	 */
	getTeamName() {
		return this.teamName
	}

	/**
	 * Gets the cups of the team
	 * @return {Array<CupStatus>} the cups
	 */
	getCups() {
		return this.cups
	}

	/**
	 * Sets all of the teams cups with a status of PENDING to HIT.
	 * i.e. removes them from the game
	 */
	removePendingCups() {
		this.cups = this.cups.map(item => item === CupStatus.PENDING ? CupStatus.HIT : item)
	}

	/**
	 * Gets the status of a specific cup
	 * @param  {number} index the index for the cup
	 * @return {CupStatus}
	 */
	getCupStatus(index) {
		return this.cups[index]
	}

	/**
	 * Sets the status of a cup to PENDING
	 * @param  {number} index the index of the cup to hit
	 */
	hitCup(index) {
		this.cups[index] = CupStatus.PENDING
	}

	/**
	 * Sets the status of a cup to HIT
	 * i.e. removes it from the game
	 * @param  {number} index the index of the cup to remove
	 */
	removeCup(index) {
		this.cups[index] = CupStatus.HIT
	}

}

class Player {
	/**
	 * Create a new Player
	 * @param  {number} id player id
	 * @param  {String} name player name
	 */
	constructor(id, name) {
		this.id = id
		this.name = name

		// Stats
		this.noOfThrows = 0
		this.noOfHits = 0
		this.noOfBounceThrows = 0
		this.noOfBounceHits = 0
	}

	/**
	 * Register a new hit for the player
	 * @param  {Boolean} [bounce=false] if it was with bounce or not
	 */
	registerHit(bounce = false) {
		this.noOfThrows++
		this.noOfHits++
		if (bounce) {
			this.noOfBounceThrows++
			this.noOfBounceHits++
		}
	}

	/**
	 * Register a new miss for the player
	 * @param  {Boolean} [bounce=false] if it was with bounce or not
	 */
	registerMiss(bounce = false) {
		this.noOfThrows++
		if (bounce) {
			this.noOfBounceThrows++
		}
	}
}

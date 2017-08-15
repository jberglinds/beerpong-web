import CupStatus from '../common/CupStatus'

export default class Team {
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
		return this.players.find(player => player.id === id)
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
		return this.players.map(player => ({
			name: player.name,
			id: player.id,
		}))
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
		this.cups = this.cups.map(item => (item === CupStatus.PENDING ? CupStatus.HIT : item))
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

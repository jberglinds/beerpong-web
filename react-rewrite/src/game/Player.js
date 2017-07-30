export default class Player {
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
		this.noOfThrows += 1
		this.noOfHits += 1
		if (bounce) {
			this.noOfBounceThrows += 1
			this.noOfBounceHits += 1
		}
	}

	/**
	 * Register a new miss for the player
	 * @param  {Boolean} [bounce=false] if it was with bounce or not
	 */
	registerMiss(bounce = false) {
		this.noOfThrows += 1
		if (bounce) {
			this.noOfBounceThrows += 1
		}
	}
}

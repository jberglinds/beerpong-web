let game = new beerpong(10, 2)

let teamOneName = document.querySelector('.teamOne h2');
let teamTwoName = document.querySelector('.teamTwo h2');

function updateUI() {
	document.querySelectorAll('#teamOne .cup').forEach(cup => {
		let status = game.team1Cups[cup.dataset.index]
		switch (status) {
		case cupStatus.HIT:
			cup.style.visibility = 'hidden'
			break
		case cupStatus.PENDING:
			cup.classList.add('pending')
			break
		}
	})

	document.querySelectorAll('#teamTwo .cup').forEach(cup => {
		let status = game.team2Cups[cup.dataset.index]
		switch (status) {
		case cupStatus.HIT:
			cup.style.visibility = 'hidden'
			break
		case cupStatus.PENDING:
			cup.classList.add('pending')
			break
		}
	})

	if(game.currentTeam > 0) {
		teamOneName.classList.add('active')
		teamTwoName.classList.remove('active')
	} else {
		teamOneName.classList.remove('active')
		teamTwoName.classList.add('active')
	}

}

function clickCup(event) {
	if (this.parentElement.parentElement.dataset.teamid != game.currentTeam) {
		game.hitCup(this.dataset.index)
		updateUI()
	}
}

document.querySelectorAll('.cup').forEach(cup => cup.addEventListener('click', clickCup))
document.querySelector('#missButton').addEventListener('click', () => {
        game.miss()
        updateUI()
    }
)
document.querySelector('#bounce').addEventListener('click', () => game.bounce = !game.bounce)

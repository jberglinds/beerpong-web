let game = new beerpong(10, 2)

let teamOneName = document.querySelector('.teamOne h2')
let teamTwoName = document.querySelector('.teamTwo h2')

let teamOneCups = document.querySelectorAll('.teamOne .cup')
let teamTwoCups = document.querySelectorAll('.teamTwo .cup')

var bounceToggler = document.querySelector('#bounceToggler')
var missButton = document.querySelector('#missButton')

function updateUI() {
	teamOneCups.forEach(cup => {
		let status = game.team1Cups[cup.dataset.index]
		updateCup(cup, status)
	})

	teamTwoCups.forEach(cup => {
		let status = game.team2Cups[cup.dataset.index]
		updateCup(cup, status)
	})

	if(game.currentTeam > 0) {
		teamOneName.classList.add('active')
		teamTwoName.classList.remove('active')
	} else {
		teamOneName.classList.remove('active')
		teamTwoName.classList.add('active')
	}

	bounceToggler.checked = game.bounceActive
}

function updateCup(cup, status) {
	switch (status) {
	case cupStatus.HIT:
		cup.style.visibility = 'hidden'
		break
	case cupStatus.PENDING:
		cup.classList.add('pending')
		break
	}
}

teamOneCups.forEach(cup => cup.addEventListener('click', () => {
	game.hitCup(cup.dataset.index, -1)
	updateUI()
}))

teamTwoCups.forEach(cup => cup.addEventListener('click', () => {
	game.hitCup(cup.dataset.index, 1)
	updateUI()
}))

missButton.addEventListener('click', () => {
	game.miss()
	updateUI()
})

bounceToggler.addEventListener('change', () => {
	game.bounceActive = bounceToggler.checked
})

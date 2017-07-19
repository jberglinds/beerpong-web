let game

var statusMessage = document.querySelector('#statusMessage')

let teamOne = document.querySelector('.teamOne')
let teamTwo = document.querySelector('.teamTwo')

let teamOneCups
let teamTwoCups

let teamOneName = teamOne.querySelector('h2')
let teamTwoName = teamTwo.querySelector('h2')

var bounceToggler = document.querySelector('#bounceToggler')
var missButton = document.querySelector('#missButton')

function start() {
	let noOfCups = parseInt(prompt('Enter number of cups (10, 6 or 3)'))
	let noOfBalls = parseInt(prompt('Enter number of balls'))

	let base = noOfCups > 10 ? 5 :
		noOfCups > 6 ? 4 :
		noOfCups > 3 ? 3 : 2

	let indexOne = noOfCups-1
	let indexTwo = 0
	for (let i = 0; i < base; i++) {
		indexOne = addRow(base-i, teamOne, indexOne)
		indexTwo = addRow(i+1, teamTwo, indexTwo)
	}

	teamOneCups = teamOne.querySelectorAll('.cup')
	teamTwoCups = teamTwo.querySelectorAll('.cup')

	teamOneCups.forEach(cup => cup.addEventListener('click', () => {

		// Get the modal
		let modal = document.querySelector('#myModal')
		let playersDiv = modal.querySelector('#players')
		console.log(modal);
		modal.style.display = 'block'

		for (let player of game.getPlayersInTeam(-1)) {
			let playerButton = document.createElement('div')
			playerButton.dataset.id = player.id
			playerButton.innerHTML = player.name
			playerButton.classList.add('playerButton')
			playerButton.addEventListener('click', () => {
				game.setActivePlayer(playerButton.dataset.id)
				modal.style.display = 'none'
			})
			playersDiv.appendChild(playerButton)
		}



		game.hitCup(cup.dataset.index, -1)
		updateUI()
	}))

	teamTwoCups.forEach(cup => cup.addEventListener('click', () => {
		game.hitCup(cup.dataset.index, 1)
		updateUI()
	}))

	game = new Beerpong(noOfCups, noOfBalls)
	updateUI()
}

function addRow(cups, team, startIndex) {
	let row = document.createElement('div')
	row.classList.add('row')
	addCups(cups, row, startIndex, team.dataset.teamid)
	team.appendChild(row)
	return startIndex - team.dataset.teamid*cups
}

function addCups(cups, row, index, teamID) {
	for (var i = 0; i < cups; i++) {
		let div = document.createElement('div')
		div.classList.add('squareRatio')
		let cup = document.createElement('button')
		cup.classList.add('cup')
		cup.dataset.index = index
		index -= teamID
		div.appendChild(cup)
		row.appendChild(div)
	}
}

function updateUI() {
	teamOneCups.forEach(cup => {
		let status = game.getCupStatus(1, cup.dataset.index)
		updateCup(cup, status)
	})

	teamTwoCups.forEach(cup => {
		let status = game.getCupStatus(-1, cup.dataset.index)
		updateCup(cup, status)
	})

	bounceToggler.checked = game.bounceActive

	statusMessage.textContent = game.statusMessage
}

function updateCup(cup, status) {
	switch (status) {
	case CupStatus.HIT:
		cup.style.visibility = 'hidden'
		break
	case CupStatus.PENDING:
		cup.classList.add('pending')
		break
	}
}

missButton.addEventListener('click', () => {
	game.miss()
	updateUI()
})

bounceToggler.addEventListener('change', () => {
	game.bounceActive = bounceToggler.checked
})

document.addEventListener('DOMContentLoaded', start)

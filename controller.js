let game = new beerpong(10, 2)

var statusMessage = document.querySelector('#statusMessage')

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

	// if(game.currentTeam > 0) {
	// 	teamOneName.classList.add('active')
	// 	teamTwoName.classList.remove('active')
	// } else {
	// 	teamOneName.classList.remove('active')
	// 	teamTwoName.classList.add('active')
	// }

	bounceToggler.checked = game.bounceActive

	statusMessage.textContent = game.statusMessage
}

function updateCup(cup, status) {
	switch (status) {
	case cupStatus.HIT:
		cup.classList.add('hit')
		cup.classList.remove('pending')
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

document.addEventListener('DOMContentLoaded', updateUI)

// Drag and drop code for reformatting of cups
let dragSrcElement = null

function dragStartHandler(e) {
	this.style.opacity = 0.5

	dragSrcElement = this

	e.dataTransfer.effectAllowed = 'move'
	e.dataTransfer.setData('text/html', this.innerHTML)
}

function dragEnterHandler() {
	this.classList.add('dragOver')
}

function dragOverHandler(e) {
	e.preventDefault()
	e.dataTransfer.dropEffect = 'move'
	return false
}

function dragLeaveHandler() {
	this.classList.remove('dragOver')
}

function dropHandler(e) {
	e.stopPropagation()

	if (dragSrcElement != this) {
		let temp = document.createElement('div')
		dragSrcElement.after(temp)
		this.after(dragSrcElement)
		temp.replaceWith(this)
	}

	return false
}

function dragEndHandler() {
	this.style.opacity = 1
	teamOneCups.forEach(cup => {
		cup.classList.remove('dragOver')
	})
	teamTwoCups.forEach(cup => {
		cup.classList.remove('dragOver')
	})
}

teamOneCups.forEach(cup => {
	cup.addEventListener('dragstart', dragStartHandler)
	cup.addEventListener('dragenter', dragEnterHandler)
	cup.addEventListener('dragover', dragOverHandler)
	cup.addEventListener('dragleave', dragLeaveHandler)
	cup.addEventListener('drop', dropHandler)
	cup.addEventListener('dragend', dragEndHandler)
})

teamTwoCups.forEach(cup => {
	cup.addEventListener('dragstart', dragStartHandler)
	cup.addEventListener('dragenter', dragEnterHandler)
	cup.addEventListener('dragover', dragOverHandler)
	cup.addEventListener('dragleave', dragLeaveHandler)
	cup.addEventListener('drop', dropHandler)
	cup.addEventListener('dragend', dragEndHandler)
})

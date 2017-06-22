let game = new beerpong(10, 2)

function updateUI() {
  let teamOne = document.querySelectorAll('#teamOne .cup')
  let teamTwo = document.querySelectorAll('#teamTwo .cup')
  teamOne.forEach(cup =>
    cup.disabled = game.getCup(1, cup.dataset.index)
  )
  teamTwo.forEach(cup =>
    cup.disabled = game.getCup(2, cup.dataset.index)
  )
}

function clickCup() {
  game.hitCup(this.dataset.index)
  updateUI();
}

document.querySelectorAll('.cup').forEach(cup => cup.addEventListener('click', clickCup))

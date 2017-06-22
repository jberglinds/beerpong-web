let game = new beerpong(10, 2)

function updateUI() {
  let teamOne = document.querySelectorAll('#teamOne .cup').forEach(cup =>
    cup.disabled = game.getCup(1, cup.dataset.index-1)
  )
  let teamTwo = document.querySelectorAll('#teamTwo .cup').forEach(cup =>
    cup.disabled = game.getCup(2, cup.dataset.index-1)
  )


}

function clickCup(event) {
  if (this.parentElement.parentElement.dataset.teamid != game.currentTeam) {
    game.hitCup(this.dataset.index-1)
    updateUI()
  }
}

document.querySelectorAll('.cup').forEach(cup => cup.addEventListener('click', clickCup))
document.querySelector('#missButton').addEventListener('click', game.miss())

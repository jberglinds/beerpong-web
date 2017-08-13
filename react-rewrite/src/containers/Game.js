import { connect } from 'react-redux'

import { cupHit, bounceToggle, cupMiss } from '../actions'
import Table from '../components/Table'

const mapStateToProps = state => ({
	team1Cups: state.game.team1Cups,
	team2Cups: state.game.team2Cups,
	bounceActive: state.game.bounceActive,
})

const mapDispatchToProps = dispatch => ({
	onCupClick: (teamId, cupIndex) => dispatch(cupHit(teamId, cupIndex)),
	onBounceToggle: bounceActive => dispatch(bounceToggle(bounceActive)),
	onCupMiss: () => dispatch(cupMiss()),
})

const Game = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Table)

export default Game

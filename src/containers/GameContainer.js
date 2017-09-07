import { connect } from 'react-redux'

import { cupHit, bounceToggle, cupMiss } from '../actions'
import Game from '../components/Game'

const mapStateToProps = state => ({
	team1Cups: state.game.team1Cups,
	team2Cups: state.game.team2Cups,
	bounceActive: state.game.bounceActive,
	statusMessage: state.game.statusMessage,
	currentTeam: state.game.currentTeam,
})

const mapDispatchToProps = dispatch => ({
	onCupClick: (teamId, cupIndex) => dispatch(cupHit(teamId, cupIndex)),
	onBounceToggle: bounceActive => dispatch(bounceToggle(bounceActive)),
	onCupMiss: () => dispatch(cupMiss()),
})

const GameContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Game)

export default GameContainer

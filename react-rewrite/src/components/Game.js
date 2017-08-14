import React from 'react'
import PropTypes from 'prop-types'

import Status from './Status'
import TeamRack from './TeamRack'
import Controls from './Controls'

const Game = ({ team1Cups, team2Cups, onCupClick, bounceActive, onBounceToggle,
	onCupMiss, statusMessage }) => (
		<div>
			<Status message={statusMessage} />
			<div className="table">
				<TeamRack
					className="teamOne"
					cups={team1Cups}
					onCupClick={(index) => { onCupClick(1, index) }}
					facingRight
				/>
				<Controls
					className="mid"
					bounceActive={bounceActive}
					onBounceToggle={onBounceToggle}
					onMissClick={onCupMiss}
				/>
				<TeamRack
					className="teamTwo"
					cups={team2Cups}
					onCupClick={(index) => { onCupClick(-1, index) }}
				/>
			</div>
		</div>
)
Game.propTypes = {
	team1Cups: PropTypes.arrayOf(Number).isRequired,
	team2Cups: PropTypes.arrayOf(Number).isRequired,
	onCupClick: PropTypes.func.isRequired,
	bounceActive: PropTypes.bool.isRequired,
	onBounceToggle: PropTypes.func.isRequired,
	onCupMiss: PropTypes.func.isRequired,
	statusMessage: PropTypes.string,
}
Game.defaultProps = {
	statusMessage: '',
}

export default Game

import React from 'react'
import PropTypes from 'prop-types'

import TeamRack from './TeamRack'
import Controls from './Controls'

const Table = ({ team1Cups, team2Cups, onCupClick, bounceActive, onBounceToggle, onCupMiss }) => (
	<div className="table">
		<TeamRack
			className="teamOne"
			cups={team1Cups}
			onCupClick={(index) => { onCupClick(1, index) }}
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
)

Table.propTypes = {
	team1Cups: PropTypes.arrayOf(Number).isRequired,
	team2Cups: PropTypes.arrayOf(Number).isRequired,
	onCupClick: PropTypes.func.isRequired,
	bounceActive: PropTypes.bool.isRequired,
	onBounceToggle: PropTypes.func.isRequired,
	onCupMiss: PropTypes.func.isRequired,
}

export default Table

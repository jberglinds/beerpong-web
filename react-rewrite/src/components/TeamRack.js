import React from 'react'
import PropTypes from 'prop-types'

import Cup from './Cup'

const TeamRack = ({ cups, onCupClick }) => {
	function renderCup(i) {
		return (
			<div className="squareRatio">
				<Cup
					index={i}
					onClick={onCupClick}
					status={cups[i]}
				/>
			</div>
		)
	}
	return (
		<div className="cups">
			<div className="row">
				{renderCup(0)}
				{renderCup(1)}
				{renderCup(2)}
				{renderCup(3)}
			</div>
			<div className="row">
				{renderCup(4)}
				{renderCup(5)}
				{renderCup(6)}
			</div>
			<div className="row">
				{renderCup(7)}
				{renderCup(8)}
			</div>
			<div className="row">
				{renderCup(9)}
			</div>
		</div>
	)
}
TeamRack.propTypes = {
	cups: PropTypes.arrayOf(Number).isRequired,
	onCupClick: PropTypes.func.isRequired,
}

export default TeamRack

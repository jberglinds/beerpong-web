import React from 'react'
import PropTypes from 'prop-types'

import Cup from './Cup'

const TeamRack = ({ className, cups, onCupClick, facingRight }) => {
	const renderCup = (cup, index) => (
		<div className="squareRatio" key={`cup-${index.toString()}`}>
			<Cup
				index={index}
				onClick={onCupClick}
				status={cup}
			/>
		</div>
	)
	const renderRow = (rowCups, startIndex) => (
		<div className="row" key={`row-${rowCups.length.toString()}`}>
			{rowCups.map((cup, index) => renderCup(cup, startIndex + index))}
		</div>
	)
	const renderRack = (rackCups, reverse) => {
		const noOfCups = rackCups.length
		let indexOffset = 0
		let rowCups = 1
		const rack = []

		// Starts from a single cup and renders as many rows as possible
		while (indexOffset + rowCups <= noOfCups) {
			const row = renderRow(rackCups.slice(indexOffset, indexOffset + rowCups), indexOffset)
			rack.push(row)
			indexOffset += rowCups
			rowCups += 1
		}

		if (reverse) rack.reverse()
		return (
			<div className={`cups ${className}`}>
				{rack}
			</div>
		)
	}
	return renderRack(cups, facingRight)
}
TeamRack.propTypes = {
	className: PropTypes.string,
	cups: PropTypes.arrayOf(Number).isRequired,
	onCupClick: PropTypes.func.isRequired,
	facingRight: PropTypes.bool,
}
TeamRack.defaultProps = {
	className: '',
}

export default TeamRack

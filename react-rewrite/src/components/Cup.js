import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import CupStatus from '../game/CupStatus'

const Cup = (index, status, onClick) => {
	const classes = classNames(
		'cup',
		{
			pending: status === CupStatus.PENDING,
			hit: status === CupStatus.HIT,
		},
	)
	return (
		<button
			className={classes}
			onClick={() => onClick(index)}
		/>
	)
}
Cup.propTypes = {
	index: PropTypes.number.isRequired,
	status: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default Cup

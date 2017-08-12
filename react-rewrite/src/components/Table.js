import React from 'react'
import PropTypes from 'prop-types'

import TeamRack from './TeamRack'
import CupStatus from '../game/CupStatus'

const Table = () => {
	return (
		<div className="table">
			<TeamRack
				cups={Array(10).fill(CupStatus.UNTOUCHED)}
				onCupClick={(index) => { console.log(index) }}
			/>
		</div>
	)
}
Table.propTypes = {}

export default Table

import React from 'react'
import PropTypes from 'prop-types'

const Status = ({ message }) => (
	<div className="status">
		<p>{message}</p>
	</div>
)

Status.propTypes = {
	message: PropTypes.string,
}
Status.defaultProps = {
	message: '',
}

export default Status

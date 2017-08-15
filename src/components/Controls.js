import React from 'react'
import PropTypes from 'prop-types'

const Controls = ({ className, bounceActive, onBounceToggle, onMissClick }) => (
	<div className={className}>
		<div className="missButton phantom">Miss</div>
		<div className="bounceToggler">
			<input
				type="checkbox"
				id="bounceToggler"
				checked={bounceActive}
				ref={(checkbox) => { this.checkbox = checkbox }}
				onChange={() => onBounceToggle(this.checkbox.checked)}
			/>
			<label htmlFor="bounceToggler" />
		</div>
		<button
			type="button"
			className="missButton"
			id="missButton"
			onClick={onMissClick}
		>
			Miss
		</button>
	</div>
)

Controls.propTypes = {
	className: PropTypes.string,
	bounceActive: PropTypes.bool.isRequired,
	onBounceToggle: PropTypes.func.isRequired,
	onMissClick: PropTypes.func.isRequired,
}
Controls.defaultProps = {
	className: '',
}

export default Controls

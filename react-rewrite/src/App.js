import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Beerpong from './game/Beerpong'
import './App.css'

const Cup = props => (
	<button className="cup" onClick={() => props.onClick(props.index)}>
		{props.index}
	</button>
)
Cup.propTypes = {
	index: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			game: new Beerpong(10, 2),
		}
	}
	render() {
		return (
			<div className="App">
				<Cup index={0} onClick={() => {}} />
			</div>
		)
	}
}

export default App

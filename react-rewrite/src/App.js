import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './App.css'

const CupStatus = {
	UNTOUCHED: 0,
	HIT: 1,
	PENDING: 2,
}

const Cup = (props) => {
	const classes = classNames(
		'cup',
		{
			pending: props.status === CupStatus.PENDING,
			hit: props.status === CupStatus.HIT,
		},
	)
	return (
		<button
			className={classes}
			onClick={() => props.onClick(props.index)}
		/>
	)
}
Cup.propTypes = {
	index: PropTypes.number.isRequired,
	status: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
}

const TeamCups = (props) => {
	function renderCup(i) {
		return (
			<div className="squareRatio">
				<Cup
					index={i}
					onClick={props.onCupClick}
					status={props.cups[i]}
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
TeamCups.propTypes = {
	cups: PropTypes.arrayOf(Number).isRequired,
	onCupClick: PropTypes.func.isRequired,
}

class Game extends Component {
	constructor() {
		super()
		this.state = {
			team1cups: Array(10).fill(CupStatus.UNTOUCHED),
			team2cups: Array(10).fill(CupStatus.UNTOUCHED),
		}
		this.handleCupClick = this.handleCupClick.bind(this)
	}
	handleCupClick(cupIndex) {
		const team1cups = this.state.team1cups.slice()
		if (team1cups[cupIndex] === CupStatus.UNTOUCHED) {
			team1cups[cupIndex] = CupStatus.PENDING
		} else if (team1cups[cupIndex] === CupStatus.PENDING) {
			team1cups[cupIndex] = CupStatus.HIT
		}
		this.setState({
			team1cups,
		})
	}
	render() {
		return (
			<div className="table">
				<TeamCups cups={this.state.team1cups} onCupClick={this.handleCupClick} />
			</div>
		)
	}
}

class App extends Component {
	constructor() {
		super()
	}
	render() {
		return (
			<div className="App">
				<Game />
			</div>
		)
	}
}

export default App

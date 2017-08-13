import CupStatus from '../game/CupStatus'

const initialState = {
	noOfBalls: 2,
	team1Cups: Array(10).fill(CupStatus.UNTOUCHED),
	team2Cups: Array(10).fill(CupStatus.UNTOUCHED),
	bounceActive: false,
	currentTeam: 1,
	throwCount: 0,
	activePlayer: null,
	extraCups: 0,
	extraRound: false,
}

// TODO: Ugly af, make better
const cupHit = (state, teamId, cupIndex) => {
	if (teamId !== state.currentTeam) {
		return {}
	}
	const cups = teamId > 0 ? state.team1Cups : state.team2Cups
	const cup = cups[cupIndex]
	let newCup = CupStatus.HIT
	if (cup === CupStatus.UNTOUCHED) {
		newCup = CupStatus.PENDING
	} else if (cup === CupStatus.PENDING) {
		newCup = CupStatus.HIT
	}
	const newCups = [
		...cups.slice(0, cupIndex),
		newCup,
		...cups.slice(cupIndex + 1, cups.length),
	]
	return {
		team1Cups: teamId > 0 ? newCups : state.team1Cups.slice(),
		team2Cups: teamId < 0 ? newCups : state.team2Cups.slice(),
		throwCount: state.throwCount + 1,
	}
}

// Sets all pending cups to hit and resets throw count if round is ended
const maybeEndRound = (state) => {
	if (state.throwCount >= state.noOfBalls) {
		const newTeam1Cups = state.team1Cups.map(cup =>
			(cup === CupStatus.PENDING ? CupStatus.HIT : cup),
		)
		const newTeam2Cups = state.team2Cups.map(cup =>
			(cup === CupStatus.PENDING ? CupStatus.HIT : cup),
		)
		return {
			throwCount: 0,
			team1Cups: newTeam1Cups,
			team2Cups: newTeam2Cups,
			currentTeam: state.currentTeam * -1,
		}
	}
	return {}
}

const innerReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'CUP_HIT':
		return {
			...state,
			...cupHit(state, action.teamId, action.cupIndex),
		}
	case 'BOUNCE_TOGGLE':
		return {
			...state,
			bounceActive: action.bounceActive,
		}
	case 'CUP_MISS':
		return {
			...state,
			throwCount: state.throwCount + 1,
		}
	default:
		return state
	}
}

const game = (state, action) => {
	const newState = innerReducer(state, action)
	return {
		...newState,
		...maybeEndRound(newState),
	}
}

export default game

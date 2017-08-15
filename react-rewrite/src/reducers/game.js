import CupStatus from '../common/CupStatus'

const initialState = {
	noOfBalls: 3,
	team1Name: 'Red Team',
	team2Name: 'Blue Team',
	team1Cups: Array(10).fill(CupStatus.UNTOUCHED),
	team2Cups: Array(10).fill(CupStatus.UNTOUCHED),
	bounceActive: false,
	currentTeam: -1,
	throwCount: 0,
	activePlayer: null,
	extraCups: 0,
	extraRound: false,
	statusMessage: 'Blue Team: 2 throws left',
}

// TODO: Ugly af, make better
const cupHit = (state, teamId, cupIndex) => {
	if (teamId !== state.currentTeam) return {}

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
		bounceActive: false,
	}
}

const actionReducer = (state = initialState, action) => {
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
			bounceActive: false,
		}
	default:
		return state
	}
}

// Sets all pending cups to hit and resets throw count if round is ended
const maybeEndRoundReducer = (state) => {
	if (state.throwCount >= state.noOfBalls) {
		const newTeam1Cups = state.team1Cups.map(cup =>
			(cup === CupStatus.PENDING ? CupStatus.HIT : cup),
		)
		const newTeam2Cups = state.team2Cups.map(cup =>
			(cup === CupStatus.PENDING ? CupStatus.HIT : cup),
		)
		return {
			...state,
			throwCount: 0,
			team1Cups: newTeam1Cups,
			team2Cups: newTeam2Cups,
			currentTeam: state.currentTeam * -1,
		}
	}
	return state
}

const updateStatusReducer = (state) => {
	const throwsLeft = state.noOfBalls - state.throwCount
	const currentTeamName = state.currentTeam > 0 ? state.team1Name : state.team2Name
	return 	{
		...state,
		statusMessage: `${currentTeamName}: ${throwsLeft} throw(s) left`,
	}
}

const game = (state, action) => {
	let nextState = actionReducer(state, action)
	const sequentialReducers = [maybeEndRoundReducer, updateStatusReducer]
	sequentialReducers.forEach((reducer) => {
		nextState = {
			...nextState,
			...reducer(nextState),
		}
	})
	return nextState
}

export default game

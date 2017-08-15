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
	statusMessage: '',
}

// TODO: Ugly af, make better
const cupHit = (state, teamId, cupIndex) => {
	if (teamId !== state.currentTeam) return {}

	const cups = teamId > 0 ? state.team1Cups : state.team2Cups
	const hitCup = cups[cupIndex]
	let newCup = CupStatus.HIT
	let extraCups = state.extraCups

	if (state.throwCount >= state.noOfBalls && extraCups >= 0) {
		// Removing extra
		newCup = CupStatus.HIT
		extraCups -= 1
	} else {
		// Regular throw
		if (hitCup === CupStatus.UNTOUCHED) {
			newCup = CupStatus.PENDING
		} else if (hitCup === CupStatus.PENDING) {
			newCup = CupStatus.PENDING
			extraCups += 2
		}
		if (state.bounceActive) extraCups += 1
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
		extraCups,
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

const pendingCupsToHit = cups => (
	cups.map(cup => (cup === CupStatus.PENDING ? CupStatus.HIT : cup))
)

// Sets all pending cups to hit and resets throw count if round is ended
const maybeEndRoundReducer = (state) => {
	const throwsLeft = state.noOfBalls - state.throwCount
	if (throwsLeft <= 0) {
		let throwCount = state.throwCount
		let currentTeam = state.currentTeam

		if (state.extraCups <= 0) {
			// If no extra cups to remove, change team
			throwCount = 0
			currentTeam *= -1
		}
		return {
			...state,
			throwCount,
			team1Cups: pendingCupsToHit(state.team1Cups),
			team2Cups: pendingCupsToHit(state.team2Cups),
			currentTeam,
		}
	}
	return state
}

const updateStatusReducer = (state) => {
	const throwsLeft = state.noOfBalls - state.throwCount
	const extraCups = state.extraCups
	const currentTeamName = state.currentTeam > 0 ? state.team1Name : state.team2Name

	let statusMessage = state.statusMessage
	if (throwsLeft <= 0 && extraCups >= 0) {
		statusMessage = `${currentTeamName}: Remove ${extraCups} extra cup(s)`
	} else {
		statusMessage = `${currentTeamName}: ${throwsLeft} throw(s) left`
	}

	return 	{
		...state,
		statusMessage,
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

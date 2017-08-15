export const cupHit = (teamId, cupIndex) => ({
	type: 'CUP_HIT',
	teamId,
	cupIndex,
})

export const cupMiss = () => ({
	type: 'CUP_MISS',
})

export const bounceToggle = bounceActive => ({
	type: 'BOUNCE_TOGGLE',
	bounceActive,
})

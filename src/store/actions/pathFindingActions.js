import * as actionTypes from "./actionTypes";

export const setStart = coords => {
	return { type: actionTypes.SET_START, coords };
};

export const setTarget = coords => {
	return { type: actionTypes.SET_TARGET, coords };
};

export const addWall = coords => {
	return { type: actionTypes.ADD_WALL, coords };
};

export const deleteWall = coords => {
	return { type: actionTypes.DELETE_WALL, coords };
};

export const playPathFindingAnimation = animations => {
	return (dispatch) => {
		for (let i = 0; i < animations.length; i++) {
			let [x, y, type] = animations[i];
			if (type === 'visited') {
				let visitedTimer = setTimeout(() => {
					dispatch(addVisited([x,y]))
					clearTimeout(visitedTimer)
				}, 10 * i)
			}
			if (type === 'path') {
				let pathTimer = setTimeout(() => {
					dispatch(addPath([x, y]))
					clearTimeout(pathTimer)
				}, 20 * i)
			}
		}
	}
};

const addVisited = coords => {
	return { type: actionTypes.ADD_VISITED, coords }
}

const addPath = coords => {
	return { type: actionTypes.ADD_PATH, coords }
}
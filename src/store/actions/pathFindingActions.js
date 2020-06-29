import * as actionTypes from "./actionTypes";

export const setStart = node => {
	return { type: actionTypes.SET_START, node };
};

export const setTarget = node => {
	return { type: actionTypes.SET_TARGET, node };
};

export const addWall = node => {
	return { type: actionTypes.ADD_WALL, node };
};

export const deleteWall = node => {
	return { type: actionTypes.DELETE_WALL, node };
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
				}, 25 * i)
			}
		}
	}
};

export const clearAll = () => {
	return {type: actionTypes.CLEAR_ALL }
}

export const clearVisitedandPath = () => {
	return {type: actionTypes.CLEAR_VISITED_AND_PATH}
}

const addVisited = node => {
	return { type: actionTypes.ADD_VISITED, node }
}

const addPath = node => {
	return { type: actionTypes.ADD_PATH, node }
}
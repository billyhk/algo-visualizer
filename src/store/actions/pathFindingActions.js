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
	return dispatch => {
		dispatch(setFinding(true))
		for (let i = 0; i < animations.length; i++) {
			let [x, y, type] = animations[i];
			if (type === "visited") {
				let visitedTimer = setTimeout(() => {
					dispatch(addVisited([x, y]));
					clearTimeout(visitedTimer);
				}, 20 * i);
			}
			if (type === "path") {
				let pathTimer = setTimeout(() => {
					dispatch(addPath([x, y]));
					clearTimeout(pathTimer);
				}, 20 * i);
			}
		}
		let endFindingTimer = setTimeout(() => {
			dispatch(setFinding(false));
			clearTimeout(endFindingTimer);
		}, 20 * animations.length);
	};
};

export const stopPathFindingAnimation = () => {
	return dispatch => {
		let highestTimeoutId = setTimeout(";");
		for (let i = 0; i < highestTimeoutId; i++) {
			clearTimeout(i);
		}
		dispatch(clearVisitedandPath())
		dispatch(setFinding(false))
	};
};

export const clearAll = () => {
	return { type: actionTypes.CLEAR_ALL };
};

export const clearVisitedandPath = () => {
	return { type: actionTypes.CLEAR_VISITED_AND_PATH };
};

const setFinding = finding => {
	return { type: actionTypes.SET_FINDING, finding };
};

const addVisited = node => {
	return { type: actionTypes.ADD_VISITED, node };
};

const addPath = node => {
	return { type: actionTypes.ADD_PATH, node };
};

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

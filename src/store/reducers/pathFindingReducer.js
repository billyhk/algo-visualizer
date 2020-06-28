import * as actionTypes from "../actions/actionTypes";

const intitialState = {
	start: [10, 10],
	target: [15, 15],
	walls: [],
};

const addWall = (state, action) => {
	let walls = [...state.walls];
	walls.push(action.coords);
	return { ...state, walls };
};

const deleteWall = (state, action) => {
	let walls = [...state.walls];
	walls = walls.filter(wall => !(wall[0] === action.coords[0] && wall[1] === action.coords[1]));
	return { ...state, walls };
};

const setStart = (state, action) => {
	let start = action.coords;
	return { ...state, start };
};

const setTarget = (state, action) => {
	let target = action.coords;
	return { ...state, target };
};

const reducer = (state = intitialState, action) => {
	switch (action.type) {
		case actionTypes.SET_START:
			return setStart(state, action);
		case actionTypes.SET_TARGET:
			return setTarget(state, action);
		case actionTypes.ADD_WALL:
			return addWall(state, action);
		case actionTypes.DELETE_WALL:
			return deleteWall(state, action)
		default:
			return state;
	}
};

export default reducer;

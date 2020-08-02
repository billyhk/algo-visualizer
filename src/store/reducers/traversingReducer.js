import * as actionTypes from "../actions/actionTypes";

const initialState = {
	traversing: false,
	height: 3,
	traversed: {},
	animationSpeed: 50,
};

const setHeight = (state, action) => {
	return { ...state, height: action.height };
};

const setAnimationSpeed = (state, action) => {
	return { ...state, animationSpeed: action.speed };
};

const addTraversed = (state, action) => {
	let traversed = { ...state.traversed };
	traversed[action.index] = true;
	return { ...state, traversed };
};

const setTraversing = (state, action) => {
	return { ...state, traversing: action.traversing };
};

const clearTraversed = (state, action) => {
	return { ...state, traversed: {} };
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_HEIGHT:
			return setHeight(state, action);
		case actionTypes.ADD_TRAVERSED:
			return addTraversed(state, action);
		case actionTypes.SET_TRAVERSE_SPEED:
			return setAnimationSpeed(state, action);
		case actionTypes.SET_TRAVERSING:
			return setTraversing(state, action);
		case actionTypes.CLEAR_TRAVERSED:
			return clearTraversed(state, action);
		default:
			return state;
	}
};

export default reducer;

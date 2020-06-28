import * as actionTypes from "../actions/actionTypes";

const intitialState = {
	start: [5, 5],
	target: [16, 15],
	walls: [],
	visited: [],
	path: []
};


const setStart = (state, action) => {
	let start = action.coords;
	return { ...state, start };
};

const setTarget = (state, action) => {
	let target = action.coords;
	return { ...state, target };
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

const addVisited = (state, action) => {
	let visited = [...state.visited]
	visited.push(action.coords)
	return {...state, visited}
}

const addPath = (state, action) => {
	let path = [...state.path]
	path.push(action.coords)
	return {...state, path}
}

const clearVisitedAndPath = (state, action) => {
	let path = []
	let visited = []
	return {...state, visited, path}
}

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
		case actionTypes.ADD_VISITED:
			return addVisited(state, action)
		case actionTypes.ADD_PATH:
			return addPath(state, action)
		case actionTypes.CLEAR_VISITED_AND_PATH:
			return clearVisitedAndPath(state, action)
		default:
			return state;
	}
};

export default reducer;

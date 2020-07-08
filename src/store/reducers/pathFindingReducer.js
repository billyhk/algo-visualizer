import * as actionTypes from "../actions/actionTypes";

const intitialState = {
	start: [4, 5],
	target: [16, 15],
	walls: {},
	visited: {},
	path: {},
	finding: false,
	animationSpeed: 40
};

const setStart = (state, action) => {
	let start = action.node;
	return { ...state, start };
};

const setTarget = (state, action) => {
	let target = action.node;
	return { ...state, target };
};

const setWalls = (state, action) => {
	let walls = action.walls;
	return { ...state, walls };
};

const addWall = (state, action) => {
	let walls = { ...state.walls };
	walls[action.node] = true;
	return { ...state, walls };
};

const deleteWall = (state, action) => {
	let walls = { ...state.walls };
	walls[action.node] = false;
	return { ...state, walls };
};

const addVisited = (state, action) => {
	let visited = { ...state.visited };
	visited[action.node] = true;
	return { ...state, visited };
};

const addPath = (state, action) => {
	let path = { ...state.path };
	path[action.node] = true;
	return { ...state, path };
};

const clearAll = (state, action) => {
	let walls = {};
	let path = {};
	let visited = {};
	return { ...state, walls, path, visited };
};

const clearVisitedAndPath = (state, action) => {
	let path = {};
	let visited = {};
	return { ...state, visited, path };
};

const setFinding = (state, action) => {
	let finding = action.finding;
	return { ...state, finding };
};

const setPathSpeed = (state, action) => {
	return {...state, animationSpeed: action.speed }
}

const reducer = (state = intitialState, action) => {
	switch (action.type) {
		case actionTypes.SET_START:
			return setStart(state, action);
		case actionTypes.SET_TARGET:
			return setTarget(state, action);
		case actionTypes.SET_WALLS:
			return setWalls(state, action);
		case actionTypes.ADD_WALL:
			return addWall(state, action);
		case actionTypes.DELETE_WALL:
			return deleteWall(state, action);
		case actionTypes.ADD_VISITED:
			return addVisited(state, action);
		case actionTypes.ADD_PATH:
			return addPath(state, action);
		case actionTypes.CLEAR_ALL:
			return clearAll(state, action);
		case actionTypes.CLEAR_VISITED_AND_PATH:
			return clearVisitedAndPath(state, action);
		case actionTypes.SET_FINDING:
			return setFinding(state, action);
		case actionTypes.SET_PATH_SPEED:
			return setPathSpeed(state, action)
		default:
			return state;
	}
};

export default reducer;

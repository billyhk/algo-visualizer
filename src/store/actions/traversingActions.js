import * as actionTypes from "./actionTypes";

export const setHeight = height => {
	return { type: actionTypes.SET_HEIGHT, height };
};

export const setTraverseSpeed = speed => {
	return { type: actionTypes.SET_TRAVERSE_SPEED, speed };
};

export const playTraversingAnimation = animations => {
	return (dispatch, getState) => {
      const animationSpeed = getState().traverse.animationSpeed;
      dispatch(clearTraversed())
		dispatch(setTraversing(true));
		for (let i = 0; i < animations.length; i++) {
			let visitedTimer = setTimeout(() => {
				dispatch(addTraversed(animations[i]));
				clearTimeout(visitedTimer);
			}, 800 + animationSpeed * i * 10);
		}
		let endTraversingTimer = setTimeout(() => {
			dispatch(setTraversing(false));
			clearTimeout(endTraversingTimer);
		}, 800 + animationSpeed * animations.length * 10);
	};
};

export const stopTraversingAnimation = () => {
	return dispatch => {
		let highestTimeoutId = setTimeout(";");
		for (let i = 0; i < highestTimeoutId; i++) {
			clearTimeout(i);
		}
      dispatch(setTraversing(false));
      dispatch(clearTraversed())
	};
};

export const clearTraversed = () => {
	return { type: actionTypes.CLEAR_TRAVERSED };
};

const setTraversing = traversing => {
	return { type: actionTypes.SET_TRAVERSING, traversing };
};

const addTraversed = index => {
	return { type: actionTypes.ADD_TRAVERSED, index };
};



import * as actionTypes from "./actionTypes";

export const setNewArray = () => {
	return { type: actionTypes.SET_NEW_ARRAY };
};

export const playSortingAnimation = animations => {
	return (dispatch, getState) => {
		let animationSpeed = getState().animationSpeed;
		dispatch(setSorting(true));
		for (let i = 0; i < animations.length; i++) {
			let [a, b, type] = animations[i];
			if (type === "active") {
				let activeTimer = setTimeout(() => {
					dispatch(setActive([a, b]));
					clearTimeout(activeTimer);
				}, 100 + animationSpeed * i);
			}
			if (type === "swap") {
				let swapTimer = setTimeout(() => {
					dispatch(swapValues(a, b));
					clearTimeout(swapTimer);
				}, 100 + animationSpeed * i);
			}
			if (type === "replace") {
				let replaceTimer = setTimeout(() => {
					dispatch(replaceValue(a, b));
					clearTimeout(replaceTimer);
				}, 100 + animationSpeed * i);
			}
		}
		let endSortingTimer = setTimeout(() => {
			dispatch(setSorting(false));
			dispatch(setActive([]));
			clearTimeout(endSortingTimer);
		}, 100 + animationSpeed * animations.length);
	};
};

export const stopSortingAnimation = () => {
	return dispatch => {
		let highestTimeoutId = setTimeout(";");
		for (let i = 0; i < highestTimeoutId; i++) {
			clearTimeout(i);
		}
		dispatch(setActive([]));
		dispatch(setSorting(false));
	};
};

export const setArraySize = arraySize => {
	return { type: actionTypes.SET_ARRAY_SIZE, arraySize };
};

export const setAnimationSpeed = animationSpeed => {
	return { type: actionTypes.SET_ANIMATION_SPEED, animationSpeed }
}

const setSorting = sorting => {
	return { type: actionTypes.SET_SORTING, sorting };
};

const setActive = active => {
	return { type: actionTypes.SET_ACTIVE, active };
};

const swapValues = (index1, index2) => {
	return { type: actionTypes.SWAP_VALUES, index1, index2 };
};

const replaceValue = (index, value) => {
	return { type: actionTypes.REPLACE_VALUE, index, value };
};

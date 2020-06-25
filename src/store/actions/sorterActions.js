import * as actionTypes from "./actionTypes";

export const setNewArray = () => {
	return { type: actionTypes.SET_NEW_ARRAY };
};

export const setActive = active => {
	return { type: actionTypes.SET_ACTIVE, active };
};

export const swapValues = (index1, index2) => {
	return { type: actionTypes.SWAP_VALUES, index1, index2 };
};

export const replaceValue = (index, value) => {
	return { type: actionTypes.REPLACE_VALUE, index, value };
};

export const playSortingAnimation = animations => {
	return (dispatch, getState) => {
		let animationSpeed = getState().animationSpeed
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
				let swapTimer = setTimeout(() => {
					dispatch(replaceValue(a, b));
					clearTimeout(swapTimer);
				}, 100 + animationSpeed * i);
			}
		}
	}
}
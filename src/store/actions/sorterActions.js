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

export const bubbleSort = array => {
	return dispatch => {
		const animations = getBubbleSortAnimations(array);
		for (let i = 0; i < animations.length; i++) {
			let [a, b] = animations[i];
			let activeTimer = setTimeout(() => {
				dispatch(setActive([a, b]));
				clearTimeout(activeTimer);
			}, 80 + 20 * i);

			let swapTimer = setTimeout(() => {
				dispatch(swapValues(a, b));
				clearTimeout(swapTimer);
			}, 100 + 20 * i);
		}
	};
};

export const mergeSort = array => {
	return dispatch => {
		let animations = getMergeSortAnimations(array);

		for (let i = 0; i < animations.length; i++) {
			let [a, b] = animations[i];
			if (i % 2 === 0) {
				let activeTimer = setTimeout(() => {
					dispatch(setActive([a, b]));
					clearTimeout(activeTimer);
				}, 80 + 20 * i);
			} else {
				let swapTimer = setTimeout(() => {
					dispatch(replaceValue(a, b));
					clearTimeout(swapTimer);
				}, 100 + 20 * i);
			}
		}
	};
};

//ALGORITHIMS

function getBubbleSortAnimations(array) {
	const copy = array.slice();
	const animations = [];
	for (let i = 0; i < copy.length; i++) {
		for (let j = 0; j < copy.length; j++) {
			if (copy[j] > copy[j + 1]) {
				let temp = copy[j];
				copy[j] = copy[j + 1];
				copy[j + 1] = temp;
				animations.push([j, j + 1]);
			}
		}
	}
	return animations;
}

function getMergeSortAnimations(array) {
	const main = array.slice();
	const aux = array.slice();
	const animations = [];
	getMergeSortAnimationsHelper(main, 0, main.length - 1, aux, animations);
	return animations;
}

function getMergeSortAnimationsHelper(main, start, end, aux, animations) {
	if (start === end) return;
	const middle = Math.floor((start + end) / 2);
	getMergeSortAnimationsHelper(aux, start, middle, main, animations);
	getMergeSortAnimationsHelper(aux, middle + 1, end, main, animations);
	merge(main, start, middle, end, aux, animations);
}

function merge(main, start, middle, end, aux, animations) {
	let mainStart = start;
	let auxStart = start;
	let auxMiddle = middle + 1;
	while (auxStart <= middle && auxMiddle <= end) {
		animations.push([auxStart, auxMiddle]);
		if (aux[auxStart] <= aux[auxMiddle]) {
			animations.push([mainStart, aux[auxStart]]);
			main[mainStart++] = aux[auxStart++];
		} else {
			animations.push([mainStart, aux[auxMiddle]]);
			main[mainStart++] = aux[auxMiddle++];
		}
	}
	while (auxStart <= middle) {
		animations.push([auxStart, auxStart]);
		animations.push([mainStart, aux[auxStart]]);
		main[mainStart++] = aux[auxStart++];
	}
	while (auxMiddle <= end) {
		animations.push([auxMiddle, auxMiddle]);
		animations.push([mainStart, aux[auxMiddle]]);
		main[mainStart++] = aux[auxMiddle++];
	}
}

// export const quickSort = array => {
// 	return dispatch => {
// 		let copy = array.slice();
// 		let timeOutMultiplier = 0;

// 		const partition = (items, left, right) => {
// 			let pivot = items[Math.floor((right + left) / 2)],
// 				i = left,
// 				j = right;
// 			while (i <= j) {
// 				while (items[i] < pivot) {
// 					i++;
// 				}
// 				while (items[j] > pivot) {
// 					j--;
// 				}
// 				if (i <= j) {
// 					let temp = items[i];
// 					items[i] = items[j];
//                items[j] = temp;

//                let swapTimer = setTimeout(() => {
// 						dispatch(swapValues(i, j));
// 						clearTimeout(swapTimer);
//                }, 100 + 20 * timeOutMultiplier);

//                timeOutMultiplier++

//                i++;
//                j--;
// 				}
// 			}
// 			return i;
// 		};

// 		const qSort = (items, left, right) => {
// 			let index;
// 			if (items.length > 1) {
// 				index = partition(items, left, right);
// 				if (left < index - 1) {
// 					qSort(items, left, index - 1);
// 				}
// 				if (index < right) {
// 					qSort(items, index, right);
// 				}
// 			}
// 			return items;
//       };
//       console.log(qSort(copy, 0, copy.length - 1))
//       qSort(copy, 0, copy.length - 1)
//    };
// };

// function partition(items, left, right) {
//    var pivot   = items[Math.floor((right + left) / 2)],
//        i       = left,
//        j       = right;
//    while (i <= j) {
//        while (items[i] < pivot) {
//            i++;
//        }
//        while (items[j] > pivot) {
//            j--;
//        }
//        if (i <= j) {
//            swap(items, i, j);
//            i++;
//            j--;
//        }
//    }
//    return i;
// }

// function quickSort(items, left, right) {
//    var index;
//    if (items.length > 1) {
//        index = partition(items, left, right);
//        if (left < index - 1) {
//            quickSort(items, left, index - 1);
//        }
//        if (index < right) {
//            quickSort(items, index, right);
//        }
//    }
//    return items;
// }

// let bubbleSort = (inputArr) => {
//    let len = inputArr.length;
//    for (let i = 0; i < len; i++) {
//        for (let j = 0; j < len; j++) {
//            if (inputArr[j] > inputArr[j + 1]) {
//                let tmp = inputArr[j];
//                inputArr[j] = inputArr[j + 1];
//                inputArr[j + 1] = tmp;
//            }
//        }
//    }
//    return inputArr;
// };

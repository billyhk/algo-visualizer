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
		let copy = array.slice();
		let timeOutMultiplier = 0;
		for (let i = 0; i < copy.length; i++) {
			for (let j = 0; j < copy.length; j++) {
				if (copy[j] > copy[j + 1]) {
					let temp = copy[j];
					copy[j] = copy[j + 1];
					copy[j + 1] = temp;

					let activeTimer = setTimeout(() => {
						dispatch(setActive([j, j + 1]));
						clearTimeout(activeTimer);
					}, 80 + 20 * timeOutMultiplier);

					let swapTimer = setTimeout(() => {
						dispatch(swapValues(j, j + 1));
						clearTimeout(swapTimer);
					}, 100 + 20 * timeOutMultiplier);

					timeOutMultiplier++;
				}
			}
		}
	};
};

export const mergeSort = array => {
	return dispatch => {
		let main = array.slice();
		let aux = array.slice();
		const animations = [];
		mergeSortHelper(main, 0, main.length - 1, aux, animations);
		let timeOutMultiplier = 0;

		for (let i = 0; i < animations.length; i++) {
			let [a, b] = animations[i];
			let swapTimer = setTimeout(() => {
				dispatch(replaceValue(a, b));
				clearTimeout(swapTimer);
			}, 100 + 20 * timeOutMultiplier);
			timeOutMultiplier++;
		}
	};
};

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
	if (startIdx === endIdx) return;
	const middleIdx = Math.floor((startIdx + endIdx) / 2);
	mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
	mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
	doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
	let k = startIdx;
	let i = startIdx;
	let j = middleIdx + 1;
	while (i <= middleIdx && j <= endIdx) {

		if (auxiliaryArray[i] <= auxiliaryArray[j]) {
			animations.push([k, auxiliaryArray[i]]);
			mainArray[k++] = auxiliaryArray[i++];
		} else {
			animations.push([k, auxiliaryArray[j]]);
			mainArray[k++] = auxiliaryArray[j++];
		}
	}
	while (i <= middleIdx) {

		animations.push([k, auxiliaryArray[i]]);
		mainArray[k++] = auxiliaryArray[i++];
	}
	while (j <= endIdx) {


		animations.push([k, auxiliaryArray[j]]);
		mainArray[k++] = auxiliaryArray[j++];
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

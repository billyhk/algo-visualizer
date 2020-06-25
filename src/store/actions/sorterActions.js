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
		let copy = array.slice();
      let timeOutMultiplier = 0
      mSort(copy, 0, copy.length - 1)

		function mSort(items, start, end) {
			if (start === end) return;
			const middle = Math.floor((start + end) / 2);
			mSort(items, start, middle);
			mSort(items, middle, end);
			merge(items, start, middle, end);
		}

		function merge(items, start, middle, end) {
			let main = start;
			let i = start;
			let j = middle + 1;

			while (i <= middle && j <= end) {
				if (items[i] < items[k]) {
					let replaceTimer = setTimeout(() => {
						dispatch(replaceValue(main, items[i]));
						clearTimeout(replaceTimer);
               }, 100 + 20 * timeOutMultiplier);
               main++;
               i++;
               timeOutMultiplier++
				} else {
               let replaceTimer = setTimeout(() => {
						dispatch(replaceValue(main, items[j]));
						clearTimeout(replaceTimer);
               }, 100 + 20 * timeOutMultiplier);
               main++;
               j++;
               timeOutMultiplier++
            }
         }
         while (i <= middle) {
            let replaceTimer = setTimeout(() => {
               dispatch(replaceValue(main, items[i]));
               clearTimeout(replaceTimer);
            }, 100 + 20 * timeOutMultiplier);
            main++;
            i++;
            timeOutMultiplier++
         }
         while (j <= end) {
            let replaceTimer = setTimeout(() => {
               dispatch(replaceValue(main, items[j]));
               clearTimeout(replaceTimer);
            }, 100 + 20 * timeOutMultiplier);
            main++;
            j++;
            timeOutMultiplier++
         }
		}
	};
};

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

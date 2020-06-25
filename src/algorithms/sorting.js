//BUBBLE SORT

export function getBubbleSortAnimations(array) {
	const copy = array.slice();
	const animations = [];
	for (let i = 0; i < copy.length; i++) {
		for (let j = 0; j < copy.length; j++) {
         animations.push([j, j + 1, 'active']);
			if (copy[j] > copy[j + 1]) {
				animations.push([j, j + 1, 'swap']);
				swap(copy, j, j + 1);
			}
		}
	}
	return animations;
}

//QUICK SORT

export function getQuickSortAnimations(array) {
	const copy = array.slice();
	const animations = [];
	getQuickSortAnimationsHelper(copy, 0, copy.length - 1, animations);
	return animations;
}

function getQuickSortAnimationsHelper(array, start, end, animations) {
	let index;
	if (array.length > 1) {
		index = partition(array, start, end, animations);
		if (start < index - 1) {
			getQuickSortAnimationsHelper(array, start, index - 1, animations);
		}
		if (index < end) {
			getQuickSortAnimationsHelper(array, index, end, animations);
		}
	}
	return array;
}

function partition(array, start, end, animations) {
	let pivot = array[Math.floor((end + start) / 2)];
	let i = start;
	let j = end;
	while (i <= j) {
      animations.push([i, j, 'active'])
		while (array[i] < pivot) {
         i++;
         animations.push([i, j, 'active'])
		}
		while (array[j] > pivot) {
         j--;
         animations.push([i, j, 'active'])
		}
		if (i <= j) {
			animations.push([i, j, 'swap']);
			swap(array, i, j);
			i++;
			j--;
		}
	}
	return i;
}

//MERGE SORT

export function getMergeSortAnimations(array) {
	const main = array.slice();
	const aux = array.slice();
	const animations = [];
	getMergeSortAnimationsHelper(main, 0, main.length - 1, aux, animations);
	return animations;
}

function getMergeSortAnimationsHelper(main, start, end, aux, animations) {
	if (start === end) return;
	let middle = Math.floor((start + end) / 2);
	getMergeSortAnimationsHelper(aux, start, middle, main, animations);
	getMergeSortAnimationsHelper(aux, middle + 1, end, main, animations);
	merge(main, start, middle, end, aux, animations);
}

function merge(main, start, middle, end, aux, animations) {
	let mainStart = start;
	let auxStart = start;
	let auxMiddle = middle + 1;
	while (auxStart <= middle && auxMiddle <= end) {
		animations.push([auxStart, auxMiddle, 'active']);
		if (aux[auxStart] <= aux[auxMiddle]) {
			animations.push([mainStart, aux[auxStart], 'replace']);
			main[mainStart] = aux[auxStart];
			mainStart++;
			auxStart++;
		} else {
			animations.push([mainStart, aux[auxMiddle], 'replace']);
			main[mainStart] = aux[auxMiddle];
			mainStart++;
			auxMiddle++;
		}
	}
	while (auxStart <= middle) {
		animations.push([auxStart, auxStart, 'active']);
		animations.push([mainStart, aux[auxStart], 'replace']);
		main[mainStart] = aux[auxStart];
		mainStart++;
		auxStart++;
	}
	while (auxMiddle <= end) {
		animations.push([auxMiddle, auxMiddle, 'active']);
		animations.push([mainStart, aux[auxMiddle], 'replace']);
		main[mainStart] = aux[auxMiddle];
		mainStart++;
		auxMiddle++;
	}
}

//HELPER

function swap(array, i, j) {
	let temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}

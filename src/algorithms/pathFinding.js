export const getBFSAnimations = (start, target, walls, width, height) => {
	let animations = []
	let queue = [start];
	let visited = {};
	visited[start] = true;
	let prev = {}
	animations.push([...start, 'visited'])
	while (queue.length > 0) {
		let node = queue.shift();
		let neighbors = getPossibleNeighbors(node, walls, width, height);
		for (let next of neighbors) {
			if (!visited[next]) {
				animations.push([...next, 'visited'])
				queue.push(next);
				visited[next] = true;
				prev[next] = node
				if (coordsAreEqual(target, next)) {
					addShortestPathAnimations(start, target, prev, animations)
					return animations
				}
			}
		}
	}	
	return animations
}


function getPossibleNeighbors(node, walls, width, height) {
	let possibleNeighbors = [];
	//check right neighbor
	if (node[0] + 1 < width && !includesCoords(walls, node[0] + 1, node[1])) {
		possibleNeighbors.push([node[0] + 1, node[1]]);
	}
	//check left neighbor
	if (node[0] - 1 >= 0 && !includesCoords(walls, node[0] - 1, node[1])) {
		possibleNeighbors.push([node[0] - 1, node[1]]);
	}
	//check top neighbor
	if (node[1] + 1 < height && !includesCoords(walls, node[0], node[1] + 1)) {
		possibleNeighbors.push([node[0], node[1] + 1]);
	}
	// check bottom neighbor
	if (node[1] - 1 >= 0 && !includesCoords(walls, node[0], node[1] - 1)) {
		possibleNeighbors.push([node[0], node[1] - 1]);
	}
	return possibleNeighbors
}

function addShortestPathAnimations(start, target, prev, animations) {
	let path = []
	let at = target
	while (!coordsAreEqual(at, start)) {
		path.push(at)
		at = prev[at]
	}
	path = path.reverse()
	path.unshift(start)
	for (let i = 0; i < path.length; i++) {
		animations.push([...path[i], 'path'])
	}
}

function coordsAreEqual(coords1, coords2) {
	return coords1[0] === coords2[0] && coords1[1] === coords2[1];
}

const includesCoords = (array, x, y) => {
	for (let i = 0; i < array.length; i++) {
		if (array[i][0] === x && array[i][1] === y) {
			return true;
		}
	}
	return false;
};

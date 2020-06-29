//BFS

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
				if (nodesAreEqual(target, next)) {
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
	let rightNeighbor = [node[0] + 1, node[1]]
	if (rightNeighbor[0] < width && !walls[rightNeighbor]) {
		possibleNeighbors.push(rightNeighbor);
	}
	// check bottom neighbor
	let bottomNeighbor = [node[0], node[1] - 1]
	if (bottomNeighbor[1] >= 0 && !walls[bottomNeighbor]) {
		possibleNeighbors.push(bottomNeighbor);
	}
	//check left neighbor
	let leftNeighbor = [node[0] - 1, node[1]]
	if (leftNeighbor[0] >= 0 && !walls[leftNeighbor]) {
		possibleNeighbors.push(leftNeighbor);
	}
	//check top neighbor
	let topNeighbor = [node[0], node[1] + 1]
	if (topNeighbor[1] < height && !walls[topNeighbor]) {
		possibleNeighbors.push(topNeighbor);
	}
	return possibleNeighbors
}

function addShortestPathAnimations(start, target, prev, animations) {
	let path = []
	let at = target
	while (!nodesAreEqual(at, start)) {
		path.push(at)
		at = prev[at]
	}
	path = path.reverse()
	path.unshift(start)
	for (let i = 0; i < path.length; i++) {
		animations.push([...path[i], 'path'])
	}
}

function nodesAreEqual(node1, node2) {
	return node1[0] === node2[0] && node1[1] === node2[1];
}
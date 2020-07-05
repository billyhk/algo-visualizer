//BFS

import { Children } from "react";

export function getBFSAnimations(start, target, walls, width, height) {
	let animations = [];
	let queue = [start];
	let visited = {};
	visited[start] = true;
	let prev = {};
	animations.push([...start, "visited"]);
	while (queue.length > 0) {
		let node = queue.shift();
		let neighbors = getPossibleNeighbors(node, walls, width, height);
		for (let next of neighbors) {
			if (!visited[next]) {
				animations.push([...next, "visited"]);
				queue.push(next);
				visited[next] = true;
				prev[next] = node;
				if (nodesAreEqual(target, next)) {
					addShortestPathAnimations(start, target, prev, animations);
					return animations;
				}
			}
		}
	}
	return animations;
}

//DFS

export function getDFSAnimations(start, target, walls, width, height) {
	let animations = [];
	let visited = {};
	let prev = {};
	let found = false;
	getDFSAnimationsHelper(start, target, walls, width, height, animations, visited, prev);
	if (found) {
		addShortestPathAnimations(start, target, prev, animations);
	}
	return animations;

	function getDFSAnimationsHelper(node, target, walls, width, height, animations, visited, prev) {
		visited[node] = true;
		animations.push([...node, "visited"]);
		if (nodesAreEqual(node, target)) {
			found = true;
			return;
		}
		let neighbors = getPossibleNeighbors(node, walls, width, height);
		for (let next of neighbors) {
			if (!visited[next] && !found) {
				prev[next] = node;
				getDFSAnimationsHelper(next, target, walls, width, height, animations, visited, prev);
			}
		}
	}
}

//A*

export function getAstarAnimations(start, target, walls, width, height) {
	let animations = []
	let visited = {}
	let openList = []
	let prev = {};
	start.f = start.g = start.h = 0
	target.f = target.g = target.h = 0
	openList.push(start)
	
	while (openList.length > 0) {
		let node = lowestf(openList)
		visited[node] = true;
		animations.push([...node, 'visited'])
		if (nodesAreEqual(node, target)) {
			addShortestPathAnimations(start, target, prev, animations);
			return animations
		}

		let neighbors = getPossibleNeighbors(node, walls, width, height);
		
		for (let i = 0; i < neighbors.length; i++) {

			let next = neighbors[i]
			if (visited[next]) {		
				continue;
			}
			
			next.g = node.g + 1
			next.h = heuristic(next, target)
			next.f = next.g + next.h

			let notBest = false
			if (openList.length > 0) {
				for (let j = 0; j < openList.length; j++) {
					if (nodesAreEqual(next, openList[j]) && next.g >= openList[j].g) {
						notBest = true
					}
				}
			}	
			if (notBest) {
				continue
			}
			
			openList.push(next)
			prev[next] = node
		}
	}
	return animations
}


function lowestf(list) {
	let low = 0
	for (let i = 0; i < list.length; i++) {
		if (list[i].f < list[low].f) {
			low = i
		}
	}
	let node = list.splice(low, 1)
	return node[0]
}

function nodeInList(list, node) {
	for (let i = 0; i< list.length; i++) {
		if (nodesAreEqual(list[i], node)) {
			return true
		}
	}
	return false
}

function heuristic(node1, node2) {
	let d1 = Math.abs(node1[0] - node2[0]);
	let d2 = Math.abs(node1[1] - node2[1]);
	return d1 + d2;
}

function f(node, start, target) {
	return heuristic(node, start) + heuristic(node, target);
}

function getPossibleNeighbors(node, walls, width, height) {
	let possibleNeighbors = [];
	//check right neighbor
	let rightNeighbor = [node[0] + 1, node[1]];
	if (rightNeighbor[0] < width && !walls[rightNeighbor]) {
		possibleNeighbors.push(rightNeighbor);
	}
	// check bottom neighbor
	let bottomNeighbor = [node[0], node[1] - 1];
	if (bottomNeighbor[1] >= 0 && !walls[bottomNeighbor]) {
		possibleNeighbors.push(bottomNeighbor);
	}
	//check left neighbor
	let leftNeighbor = [node[0] - 1, node[1]];
	if (leftNeighbor[0] >= 0 && !walls[leftNeighbor]) {
		possibleNeighbors.push(leftNeighbor);
	}
	//check top neighbor
	let topNeighbor = [node[0], node[1] + 1];
	if (topNeighbor[1] < height && !walls[topNeighbor]) {
		possibleNeighbors.push(topNeighbor);
	}
	return possibleNeighbors;
}

function addShortestPathAnimations(start, target, prev, animations) {
	let path = [];
	let at = target;
	while (!nodesAreEqual(at, start)) {
		path.push(at);
		at = prev[at];
	}
	path = path.reverse();
	path.unshift(start);
	for (let i = 0; i < path.length; i++) {
		animations.push([...path[i], "path"]);
	}
}

function nodesAreEqual(node1, node2) {
	return node1[0] === node2[0] && node1[1] === node2[1];
}

//Maze

export function getMazeAnimations(start, target, width, height) {
	let animations = [];
	let walls = {};
	for (let i = 1; i < width; i += 2) {
		for (let j = 0; j < height; j++) {
			walls[[i, j]] = true;
		}
	}

	for (let i = 1; i < height; i += 2) {
		for (let j = 0; j < width; j++) {
			walls[[j, i]] = true;
		}
	}
	walls[start] = false;
	walls[target] = false;
	animations.push(walls);

	let startNode = [0, 0];
	let visited = {};
	getMazeAnimationsHelper(startNode, width, height, animations, visited);

	return animations;
}

function getMazeAnimationsHelper(node, width, height, animations, visited) {
	visited[node] = true;
	let neighbors = getPossibleMazeNeighbors(node, width, height);
	for (let next of neighbors) {
		if (!visited[next]) {
			let wall;
			if (node[0] - next[0] === -2) {
				wall = [node[0] + 1, node[1]];
			} else if (node[0] - next[0] === 2) {
				wall = [node[0] - 1, node[1]];
			} else if (node[1] - next[1] === -2) {
				wall = [node[0], node[1] + 1];
			} else {
				wall = [node[0], node[1] - 1];
			}
			animations.push(wall);
			getMazeAnimationsHelper(next, width, height, animations, visited);
		}
	}
}

function getPossibleMazeNeighbors(node, width, height) {
	let possibleNeighbors = [];
	//check right neighbor
	let rightNeighbor = [node[0] + 2, node[1]];
	if (rightNeighbor[0] < width) {
		possibleNeighbors.push(rightNeighbor);
	}
	// check bottom neighbor
	let bottomNeighbor = [node[0], node[1] - 2];
	if (bottomNeighbor[1] >= 0) {
		possibleNeighbors.push(bottomNeighbor);
	}
	//check left neighbor
	let leftNeighbor = [node[0] - 2, node[1]];
	if (leftNeighbor[0] >= 0) {
		possibleNeighbors.push(leftNeighbor);
	}
	//check top neighbor
	let topNeighbor = [node[0], node[1] + 2];
	if (topNeighbor[1] < height) {
		possibleNeighbors.push(topNeighbor);
	}
	shuffle(possibleNeighbors);
	return possibleNeighbors;
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

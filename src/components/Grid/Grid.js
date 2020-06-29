import React, { useCallback, useState, useEffect } from "react";
import Node from "./Node/Node";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/";

const Grid = props => {
	const [mouseDown, setMouseDown] = useState(false);
	const [draggingStart, setDraggingStart] = useState(false);
	const [draggingTarget, setDraggingTarget] = useState(false);

	const start = useSelector(state => state.path.start);
	const target = useSelector(state => state.path.target);
	const walls = useSelector(state => state.path.walls);
	const visited = useSelector(state => state.path.visited);
	const path = useSelector(state => state.path.path);

	const dispatch = useDispatch();
	const setStart = useCallback(node => dispatch(actions.setStart(node)), [dispatch]);
	const setTarget = useCallback(node => dispatch(actions.setTarget(node)), [dispatch]);
	const addWall = useCallback(node => dispatch(actions.addWall(node)), [dispatch]);
	const deleteWall = useCallback(node => dispatch(actions.deleteWall(node)), [dispatch]);
	const clearVisitedandPath = () => dispatch(actions.clearVisitedandPath());

	const gridStyle = {
		display: "grid",
		gridTemplateColumns: `repeat(${props.width}, max-content)`,
		gridTemplateRows: `repeat(${props.height}, max-content)`,
		gap: "1px",
	};

	const onMouseDownHandler = e => {
		e.preventDefault();
		setMouseDown(true);
		clearVisitedandPath();
	};

	const onMouseUpHandler = e => {
		e.preventDefault();
		setMouseDown(false);
		setDraggingStart(false);
		setDraggingTarget(false);
	};

	const onMouseLeaveHandler = e => {
		e.preventDefault();
		setMouseDown(false);
		setDraggingStart(false);
		setDraggingTarget(false);
	};

	const setDraggingStartTrue = () => {
		setDraggingStart(true);
	};

	const setDraggingTargetTrue = () => {
		setDraggingTarget(true);
	};

	const nodesAreEqual = (node1, node2) => {
		return node1[0] === node2[0] && node1[1] === node2[1];
	};

	let grid = [];
	for (let y = 0; y < props.height; y++) {
		for (let x = 0; x < props.width; x++) {
			grid.push([x, y]);
		}
	}

	grid = grid.map(node => {
		let type;
		if (nodesAreEqual(start, node)) {
			type = "start";
		} else if (nodesAreEqual(target, node)) {
			type = "target";
		} else if (walls[node]) {
			type = "wall";
		} else if (path[node]) {
			type = "path";
		} else if (visited[node]) {
			type = "visited";
		} else {
			type = "none";
		}

		return (
			<Node
				type={type}
				makeStart={() => setStart([node[0], node[1]])}
				makeTarget={() => setTarget([node[0], node[1]])}
				makeWall={() => addWall(node)}
				deleteWall={() => deleteWall(node)}
				mouseDown={mouseDown}
				draggingStart={draggingStart}
				setDraggingStartTrue={setDraggingStartTrue}
				draggingTarget={draggingTarget}
				setDraggingTargetTrue={setDraggingTargetTrue}
				key={`${node[0]},${node[1]}`}
			/>
		);
	});

	return (
		<div
			onMouseDown={onMouseDownHandler}
			onMouseUp={onMouseUpHandler}
			onMouseLeave={onMouseLeaveHandler}
			style={gridStyle}
		>
			{grid}
		</div>
	);
};

export default Grid;

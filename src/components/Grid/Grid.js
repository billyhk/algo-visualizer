import React, { useCallback, useState } from "react";
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
	const visited = useSelector(state => state.path.visited)
	const path = useSelector(state => state.path.path)

   const dispatch = useDispatch();
   const setStart = useCallback(coords => dispatch(actions.setStart(coords)), [dispatch]);
	const setTarget = useCallback(coords => dispatch(actions.setTarget(coords)), [dispatch]);
	const addWall = useCallback(coords => dispatch(actions.addWall(coords)), [dispatch]);
	const deleteWall = useCallback(coords => dispatch(actions.deleteWall(coords)), [dispatch]);
	const clearVisitedandPath = () => dispatch(actions.clearVisitedandPath())

	const gridStyle = {
		display: "grid",
		gridTemplateColumns: `repeat(${props.width}, max-content)`,
		gridTemplateRows: `repeat(${props.height}, max-content)`,
		gap: "1px",
   };

	const onMouseDownHandler = e => {
		e.preventDefault();
		setMouseDown(true);
		clearVisitedandPath()
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

	const includesCoords = (array, x, y) => {
		for (let i = 0; i < array.length; i++) {
			if (array[i][0] === x && array[i][1] === y) {
				return true;
			}
		}
		return false;
	};

	const nodes = [];
	for (let y = 0; y < props.height; y++) {
		for (let x = 0; x < props.width; x++) {
			nodes.push(
				<Node
					coords={[x, y]}
					isStart={start[0] === x && start[1] === y}
					isTarget={target[0] === x && target[1] === y}
					isWall={includesCoords(walls, x, y)}
					visited={includesCoords(visited, x, y)}
					isPath={includesCoords(path, x, y)}
					makeStart={() => setStart([x, y])}
					makeTarget={() => setTarget([x, y])}
					makeWall={() => addWall([x, y])}
               deleteWall={() => deleteWall([x, y])}
					mouseDown={mouseDown}
					draggingStart={draggingStart}
					setDraggingStartTrue={setDraggingStartTrue}
					draggingTarget={draggingTarget}
               setDraggingTargetTrue={setDraggingTargetTrue}
					key={`${x},${y}`}
				/>
			);
		}
	}

	return (

		<div
			onMouseDown={onMouseDownHandler}
			onMouseUp={onMouseUpHandler}
			onMouseLeave={onMouseLeaveHandler}
			style={gridStyle}
		>
			{nodes}
		</div>
	);
};

export default Grid;

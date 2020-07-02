import React from "react";
import Grid from "../../components/Grid/Grid";
import { useSelector, useDispatch } from "react-redux";
import {
	getBFSAnimations,
	getDFSAnimations,
	getMazeAnimations,
} from "../../algorithms/pathFinding";
import * as actions from "../../store/actions";

const PathFinder = props => {
	const start = useSelector(state => state.path.start);
	const target = useSelector(state => state.path.target);
	const walls = useSelector(state => state.path.walls);
	const finding = useSelector(state => state.path.finding);

	const dispatch = useDispatch();
	const playPathFindingAnimation = animations =>
		dispatch(actions.playPathFindingAnimation(animations));
	const playMazeAnimation = animations =>
		dispatch(actions.playMazeAnimation(animations));
	const stopAnimation = () => dispatch(actions.stopAnimation());
	const clearWalls = () => dispatch(actions.clearAll());

	return (
		<div>
			<Grid width={25} height={20} />
			<button
				onClick={() => playPathFindingAnimation(getBFSAnimations(start, target, walls, 25, 20))}
				disabled={finding}
			>
				BFS
			</button>
			<button
				onClick={() => playPathFindingAnimation(getDFSAnimations(start, target, walls, 25, 20))}
				disabled={finding}
			>
				DFS
			</button>
			<button
				onClick={() =>
					playMazeAnimation(getMazeAnimations(start, target, 25, 20))
				}
				disabled={finding}
			>
				Generate Maze
			</button>
			<button onClick={clearWalls} disabled={finding}>
				clear walls
			</button>
			<button onClick={stopAnimation} disabled={!finding}>
				stop
			</button>
		</div>
	);
};

export default PathFinder;

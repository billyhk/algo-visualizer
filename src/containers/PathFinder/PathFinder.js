import React from "react";
import Grid from "../../components/Grid/Grid";
import { useSelector, useDispatch } from "react-redux";
import { getBFSAnimations } from "../../algorithms/pathFinding";
import * as actions from "../../store/actions";

const PathFinder = props => {
	const start = useSelector(state => state.path.start);
	const target = useSelector(state => state.path.target);
	const walls = useSelector(state => state.path.walls);
	const finding = useSelector(state => state.path.finding);

	const dispatch = useDispatch();
	const playPathFindingAnimation = animations =>
		dispatch(actions.playPathFindingAnimation(animations));
	const stopPathFindingAnimation = () => dispatch(actions.stopPathFindingAnimation());
	const clearWalls = () => dispatch(actions.clearAll());

	return (
		<div>
			<Grid width={25} height={20} />
			<button
				onClick={() => playPathFindingAnimation(getBFSAnimations(start, target, walls, 25, 20))}
				disabled={finding}
			>
				find
			</button>
			<button onClick={clearWalls} disabled={finding}>
				clear walls
			</button>
			<button onClick={stopPathFindingAnimation} disabled={!finding}>stop</button>
		</div>
	);
};

export default PathFinder;

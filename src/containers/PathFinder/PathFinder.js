import React, { useEffect, useState } from "react";
import Grid from "../../components/Grid/Grid";
import { useSelector, useDispatch } from "react-redux";
import {
	getBFSAnimations,
	getDFSAnimations,
	getMazeAnimations,
	getAstarAnimations
} from "../../algorithms/pathFinding";
import * as actions from "../../store/actions";
import classes from "./Pathfinder.module.css";
import { Paper, Button, Slider } from "@material-ui/core";
import Selection from "../../components/UI/Selection/Selection";

const descriptions = [
	<p>
		The <span style={{ fontWeight: "600" }}>A* search</span> algorithm introduces a heuristic into a
		regular graph-searching algorithm, essentially planning ahead at each step so a more optimal
		decision is made. This algorithm guarantees the shortest path possible.
	</p>,
	<p>
		<span style={{ fontWeight: "600" }}>Breadth first search</span> is a traversing algorithm
		which starts from a selected node and continues to traverse the graph layerwise thus exploring
		the neighbouring nodes. This algorithm guarantees the shortest path possible.
	</p>,
	<p>
		<span style={{ fontWeight: 600 }}>Depth first search</span> is a traversing algorithm which
		uses the idea of backtracking. It explores all the nodes by going forward if possible or uses
		backtracking. Unlike DFS, it does not guarantee the shortest path, but rather if such a path
		even exist
	</p>,
];

const PathFinder = props => {
	const [gridX, setGridX] = useState(20);
	const [gridY, setGridY] = useState(20);
	const [current, setCurrent] = useState(0);
	const start = useSelector(state => state.path.start);
	const target = useSelector(state => state.path.target);
	const walls = useSelector(state => state.path.walls);
	const finding = useSelector(state => state.path.finding);
	const animationSpeed = useSelector(state => state.path.animationSpeed);

	const dispatch = useDispatch();
	const playPathFindingAnimation = animations =>
		dispatch(actions.playPathFindingAnimation(animations));
	const playMazeAnimation = animations => dispatch(actions.playMazeAnimation(animations));
	const stopAnimation = () => dispatch(actions.stopAnimation());
	const clearWalls = () => dispatch(actions.clearAll());
	const setStart = node => dispatch(actions.setStart(node));
	const setTarget = node => dispatch(actions.setTarget(node));
	const setAnimationSpeed = speed => dispatch(actions.setPathSpeed(speed));

	useEffect(() => {
		setGrid()
		window.addEventListener("resize", setGrid);
		return () => {
			stopAnimation();
			window.removeEventListener("resize", setGrid);
		};
	}, []);

	const setGrid = () => {
		let el = document.getElementById("grid");
		let width = el.offsetWidth;
		let height = el.offsetHeight;
		let x = Math.floor(width / 25);
		let y = Math.floor(height / 25);
		let start = [Math.floor(x / 5), Math.floor(y / 5)];
		let target = [Math.floor((4 * x) / 5), Math.floor((4 * y) / 5)];
		setStart(start);
		setTarget(target);
		setGridX(x);
		setGridY(y);
	};

	const changeDescriptionHandler = index => {
		setCurrent(index);
	};

	const animationSpeedChangeHandler = (event, newValue) => {
		setAnimationSpeed(Math.abs(newValue - 120));
	};

	const options = {
		"A* Search": () =>
			playPathFindingAnimation(getAstarAnimations(start, target, walls, gridX, gridY)),
		"Breadth First": () =>
			playPathFindingAnimation(getBFSAnimations(start, target, walls, gridX, gridY)),
		"Depth First": () =>
			playPathFindingAnimation(getDFSAnimations(start, target, walls, gridX, gridY)),
	};

	return (
		<div className={classes.PathFinder}>
			<Paper elevation={10} style={{ borderRadius: 0 }} className={classes.ControlsContainer}>
				<div>
					<h1 style={{marginBottom:'3rem'}} >Path Finding</h1>
					<Button
						variant="outlined"
						color="primary"
						size="large"
						onClick={() => playMazeAnimation(getMazeAnimations(start, target, gridX, gridY))}
						disabled={finding}
						style={{ marginRight: "1rem" }}
					>
						Generate Maze
					</Button>
					<Button
						variant="outlined"
						color="primary"
						size="large"
						onClick={clearWalls}
						disabled={finding}
						style={{ marginRight: "1rem" }}
					>
						clear
					</Button>
					<Button
						color="secondary"
						size="large"
						variant="contained"
						onClick={stopAnimation}
						disabled={!finding}
					>
						stop
					</Button>
					<p className={classes.SliderTitle}>Animation Speed</p>
					<Slider
						onChange={animationSpeedChangeHandler}
						value={Math.abs(animationSpeed - 120)}
						disabled={finding}
						valueLabelDisplay
						min={1}
						style={{ marginBottom: "3rem" }}
					/>
					<Selection
						onChange={index => changeDescriptionHandler(index)}
						options={options}
						disabled={finding}
					/>
				</div>

				<div className={classes.About}>{descriptions[current]}</div>
			</Paper>
			<div className={classes.GridContainer}>
				<div style={{ height: "100%" }} id="grid">
					<div className={classes.Grid}>
						<Grid width={gridX} height={gridY} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PathFinder;

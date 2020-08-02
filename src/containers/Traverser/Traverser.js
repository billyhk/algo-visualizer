import React, { useState, useEffect } from "react";
import Tree from "../../components/Tree/Tree";
import classes from "./Traverser.module.css";
import { Paper, Button, Slider } from "@material-ui/core";
import Selection from "../../components/UI/Selection/Selection";
import * as actions from "../../store/actions";
import {
	getLevelOrderAnimations,
	getInOrderAnimations,
	getPostOrderAnimations,
	getPreOrderAnimations,
} from "../../algorithms/traversing";
import { useDispatch, useSelector } from "react-redux";

const descriptions = [
	<p>
		The <span style={{ fontWeight: "600" }}>A* search</span> algorithm introduces a heuristic into
		a regular graph-searching algorithm, essentially planning ahead at each step so a more optimal
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
	<p>
		<span style={{ fontWeight: 600 }}>Depth first search</span> is a traversing algorithm which
		uses the idea of backtracking. It explores all the nodes by going forward if possible or uses
		backtracking. Unlike DFS, it does not guarantee the shortest path, but rather if such a path
		even exist
	</p>,
];

const Traversing = props => {
	const [current, setCurrent] = useState(0);
	const traversing = useSelector(state => state.traverse.traversing);
	const height = useSelector(state => state.traverse.height);
	const animationSpeed = useSelector(state => state.traverse.animationSpeed);

	const dispatch = useDispatch();
	const setHeight = newHeight => dispatch(actions.setHeight(newHeight));
	const setAnimationSpeed = speed => dispatch(actions.setTraverseSpeed(speed));
	const playTraversingAnimation = animations =>
		dispatch(actions.playTraversingAnimation(animations));
	const stopTraversingAnimation = () => dispatch(actions.stopTraversingAnimation());
	const clearTraversed = () => dispatch(actions.clearTraversed());

	useEffect(() => {
		return () => {
			stopTraversingAnimation();
			clearTraversed();
		};
	}, []);

	const heightChangeHandler = (event, newHeight) => {
		setHeight(newHeight);
		clearTraversed();
	};

	const animationSpeedChangeHandler = (event, newValue) => {
		setAnimationSpeed(Math.abs(newValue - 110));
	};

	const changeDescriptionHandler = index => {
		setCurrent(index);
	};

	const options = {
		"Pre-order": () => playTraversingAnimation(getPreOrderAnimations(height)),
		"In-order": () => playTraversingAnimation(getInOrderAnimations(height)),
		"Post-order": () => playTraversingAnimation(getPostOrderAnimations(height)),
		"Level-order": () => playTraversingAnimation(getLevelOrderAnimations(height)),
	};

	let media = window.matchMedia("(max-width: 700px)");
	return (
		<div className={classes.Traverser}>
			<div className={classes.TreeContainer}>
				<div className={classes.Tree}>
					<Tree height={height} />
				</div>
			</div>
			<Paper
				className={classes.ControlsContainer}
				elevation={10}
				style={{ borderRadius: 0, paddingBottom: media.matches ? "4rem" : "0" }}
			>
				<div className={classes.Controls}>
					<h1 style={{ marginBottom: "3rem" }}>Traversing</h1>
					<Button
						onClick={stopTraversingAnimation}
						color="secondary"
						size="large"
						variant="contained"
						disableElevation
						disabled={!traversing}
					>
						stop
					</Button>
					<p className={classes.SliderTitle}>Tree Height</p>
					<Slider
						valueLabelDisplay
						onChange={heightChangeHandler}
						max={5}
						min={1}
						value={height}
						disabled={traversing}
					/>
					<p className={classes.SliderTitle}>Animation Speed</p>
					<Slider
						onChange={animationSpeedChangeHandler}
						value={Math.abs(animationSpeed - 110)}
						disabled={traversing}
						valueLabelDisplay
						min={1}
						style={{ marginBottom: "3rem" }}
					/>
					<Selection
						onChange={index => changeDescriptionHandler(index)}
						options={options}
						disabled={traversing}
					/>
				</div>
				<div className={classes.About}>{descriptions[current]}</div>
			</Paper>
		</div>
	);
};

export default Traversing;

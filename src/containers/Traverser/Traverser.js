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
		<span style={{ fontWeight: "600" }}>Pre-order traversal</span> visits all nodes of a tree by
		processing the root, then recursively processing all subtrees. Equivalent to a depth-first
		search from the root.
	</p>,
	<p>
		An <span style={{ fontWeight: "600" }}>in-order traversal</span> first visits the left child
		(including its entire subtree), then visits the node, and finally visits the right child
		(including its entire subtree).
	</p>,
	<p>
		A <span style={{ fontWeight: "600" }}>post-order traversal</span> first visits the left child
		(including its entire subtree), then the right child (including its entire subtree), and
		finally visits the node.
	</p>,
	<p>
		<span style={{ fontWeight: 600 }}>Level-order traversal</span> processes all nodes of a tree by
		depth: first the root, then the children of the root, etc. Equivalent to a breadth-first
		search from the root.
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

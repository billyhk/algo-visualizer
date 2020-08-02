import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import BarGraph from "../../components/BarGraph/BarGraph";
import classes from "./Sorter.module.css";
import { Slider, Button, Paper } from "@material-ui/core";
import Selection from "../../components/UI/Selection/Selection";
import {
	getBubbleSortAnimations,
	getQuickSortAnimations,
	getMergeSortAnimations,
	getHeapSortAnimations,
} from "../../algorithms/sorting";

const descriptions = [
	<p>
		<span style={{ fontWeight: "600" }}>Bubble sort</span> is a simple sorting algorithm that
		repeatedly steps through the list, compares adjacent elements and swaps them if they are in
		the wrong order.
	</p>,
	<p>
		<span style={{ fontWeight: 600 }}>Quick sort</span> is a Divide and Conquer algorithm. It
		picks an element as a pivot and partitions the given array around the picked pivot.
	</p>,

	<p>
		Like quick sort, <span style={{ fontWeight: 600 }}>merge sort</span> is a Divide and Conquer
		algorithm. It divides the input array in two halves, calls itself for the two halves, and then
		merges the two sorted halves.
	</p>,

	<p>
		<span style={{ fontWeight: 600 }}>Heap sort</span> is a comparison based sorting technique
		based on a Binary Heap. It finds the maximum element and places it at the end of the array. The same
		process is repeated for the remaining elements.
	</p>,
];

const Sorter = props => {
	const [current, setCurrent] = useState(0);
	useEffect(() => {
		setNewArrayHandler();
		return () => {
			props.stopSortingAnimation();
		};
	}, []);

	const setNewArrayHandler = () => {
		props.setSorted(false);
		props.setNewArray();
	};

	const changeDescriptionHandler = index => {
		setCurrent(index);
	};

	const sizeChangeHandler = (event, newValue) => {
		props.setArraySize(newValue);
		props.setSorted(false);
		props.setNewArray();
	};

	const animationSpeedChangeHandler = (event, newValue) => {
		props.setAnimationSpeed(Math.abs(newValue - 110));
	};

	const options = {
		"Bubble Sort": () => props.playSortingAnimation(getBubbleSortAnimations(props.array)),
		"Quick Sort": () => props.playSortingAnimation(getQuickSortAnimations(props.array)),
		"Merge Sort": () => props.playSortingAnimation(getMergeSortAnimations(props.array)),
		"Heap Sort": () => props.playSortingAnimation(getHeapSortAnimations(props.array)),
	};

	let media = window.matchMedia("(max-width: 700px)");
	return (
		<div className={classes.Sorter}>
			<div className={classes.GraphContainer}>
				<div className={classes.Graph}>
					<BarGraph values={props.array} activeValues={props.active} sorting={props.sorting} />
				</div>
			</div>
			<Paper
				className={classes.ControlsContainer}
				elevation={10}
				style={{ borderRadius: 0, paddingBottom: media.matches ? "4rem" : "0" }}
			>
				<div className={classes.Controls}>
					<h1 style={{ marginBottom: "3rem" }}>Sorting</h1>
					<Button
						onClick={setNewArrayHandler}
						disabled={props.sorting}
						color="primary"
						size="large"
						variant="outlined"
						style={{ marginRight: ".8rem" }}
					>
						set new
					</Button>
					<Button
						onClick={props.stopSortingAnimation}
						disabled={!props.sorting}
						color="secondary"
						size="large"
						variant="contained"
						disableElevation
					>
						stop
					</Button>
					<p className={classes.SliderTitle}>Array Size</p>
					<Slider
						onChange={sizeChangeHandler}
						value={props.arraySize}
						valueLabelDisplay
						disabled={props.sorting}
						min={10}
					/>
					<p className={classes.SliderTitle}>Animation Speed</p>
					<Slider
						onChange={animationSpeedChangeHandler}
						value={Math.abs(props.animationSpeed - 110)}
						disabled={props.sorting}
						valueLabelDisplay
						min={1}
						style={{ marginBottom: "3rem" }}
					/>
					<Selection
						options={options}
						disabled={props.sorting}
						onChange={index => changeDescriptionHandler(index)}
					/>

					<div className={classes.About}>{descriptions[current]}</div>
				</div>
			</Paper>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		sorting: state.sort.sorting,
		array: state.sort.array,
		arraySize: state.sort.arraySize,
		active: state.sort.active,
		animationSpeed: state.sort.animationSpeed,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setNewArray: () => dispatch(actions.setNewArray()),
		playSortingAnimation: animations => dispatch(actions.playSortingAnimation(animations)),
		stopSortingAnimation: () => dispatch(actions.stopSortingAnimation()),
		setSorted: sorted => dispatch(actions.setSorted(sorted)),
		setArraySize: arraySize => dispatch(actions.setArraySize(arraySize)),
		setAnimationSpeed: animationSpeed => dispatch(actions.setAnimationSpeed(animationSpeed)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sorter);

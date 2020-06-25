import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import BarGraph from "../../components/BarGraph/BarGraph";
import classes from "./Sorter.module.css";
import { Slider } from "@material-ui/core";
import {
	getBubbleSortAnimations,
	getQuickSortAnimations,
	getMergeSortAnimations,
} from "../../algorithms/sorting";

const Sorter = props => {
	useEffect(() => {
		props.setNewArray();
	}, []);

	const sizeChangeHandler = (event, newValue) => {
		props.setArraySize(newValue);
		props.setNewArray();
	};

	const animationSpeedChangeHandler = (event, newValue) => {
		props.setAnimationSpeed(Math.abs(newValue - 100));
	};

	return (
		<div className={classes.Sorter}>
			<div className={classes.Graph}>
				<BarGraph
					values={props.array}
					color="white"
					activeValues={props.active}
					sorting={props.sorting}
				/>
			</div>

			<div className={classes.Controls}>
				<button onClick={props.setNewArray} disabled={props.sorting}>
					set new
				</button>
				<button
					onClick={() => props.playSortingAnimation(getBubbleSortAnimations(props.array))}
					disabled={props.sorting}
				>
					bubble sort
				</button>
				<button
					onClick={() => props.playSortingAnimation(getQuickSortAnimations(props.array))}
					disabled={props.sorting}
				>
					quick sort
				</button>
				<button
					onClick={() => props.playSortingAnimation(getMergeSortAnimations(props.array))}
					disabled={props.sorting}
				>
					merge sort
				</button>
				<button onClick={props.stopSortingAnimation} disabled={!props.sorting}>
					stop
				</button>
				<Slider
					style={{ margin: "10rem 0" }}
					onChange={sizeChangeHandler}
					value={props.arraySize}
					valueLabelDisplay
					disabled={props.sorting}
					min={10}
				/>

				<Slider
					style={{ margin: "10rem 0" }}
					onChange={animationSpeedChangeHandler}
					value={Math.abs(props.animationSpeed - 100)}
					disabled={props.sorting}
					min={1}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		sorting: state.sorting,
		array: state.array,
		arraySize: state.arraySize,
		active: state.active,
		animationSpeed: state.animationSpeed,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setNewArray: () => dispatch(actions.setNewArray()),
		playSortingAnimation: animations => dispatch(actions.playSortingAnimation(animations)),
		stopSortingAnimation: () => dispatch(actions.stopSortingAnimation()),
		setArraySize: arraySize => dispatch(actions.setArraySize(arraySize)),
		setAnimationSpeed: animationSpeed => dispatch(actions.setAnimationSpeed(animationSpeed)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sorter);

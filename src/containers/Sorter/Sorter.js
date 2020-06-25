import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import BarGraph from "../../components/BarGraph/BarGraph";
import classes from "./Sorter.module.css";
import {
	getBubbleSortAnimations,
	getQuickSortAnimations,
	getMergeSortAnimations,
} from "../../algorithms/sorting";

const Sorter = props => {
	useEffect(() => {
		props.setNewArray();
	}, []);

	return (
		<div className={classes.Sorter}>
			<div className={classes.Graph}>
				<BarGraph values={props.array} color="white" activeValues={props.active} />
			</div>

			<div className={classes.Controls}>
				<button onClick={props.setNewArray}>set new</button>
				<button onClick={() => props.playSortingAnimation(getBubbleSortAnimations(props.array))}>
					bubble sort
				</button>
				<button onClick={() => props.playSortingAnimation(getQuickSortAnimations(props.array))}>
					quick sort
				</button>
				<button onClick={() => props.playSortingAnimation(getMergeSortAnimations(props.array))}>
					merge sort
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		array: state.array,
		arraySize: state.arraySize,
		active: state.active,
		animationSpeed: state.animationSpeed
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setNewArray: () => dispatch(actions.setNewArray()),
		playSortingAnimation: animations => dispatch(actions.playSortingAnimation(animations)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sorter);

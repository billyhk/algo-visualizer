import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import BarGraph from "../../components/BarGraph/BarGraph";
import classes from "./Sorter.module.css";
import { act } from "react-dom/test-utils";

const Sorter = props => {

	useEffect(() => {
		props.setNewArray()
	}, [])
	
	return (
		<div className={classes.Sorter}>

			<div className={classes.Graph}>
				<BarGraph values={props.array} color="white" activeValues={props.active} />
			</div>

			<div className={classes.Controls}>
				<button onClick={props.setNewArray}>set new</button>
				<button onClick={() => props.bubbleSort(props.array)}>bubble sort</button>
				<button onClick={() => props.mergeSort(props.array)}>merge sort</button>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		array: state.array,
		arraySize: state.arraySize,
		active: state.active
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setNewArray: () => dispatch(actions.setNewArray()),
		bubbleSort: (array) => dispatch(actions.bubbleSort(array)),
		mergeSort: (array) => dispatch(actions.mergeSort(array))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sorter);

import React from "react";
import Bar from "./Bar/Bar";
import classes from "./BarGraph.module.css";
import { useSelector } from "react-redux";

const BarGraph = props => {
	const sorted = useSelector(state => state.sort.sorted);
	const fill = sorted ? "#05668d" : '#c3e5f3';
	const bars = props.values.map((value, i) => (
		<Bar value={value} key={i} fill={props.activeValues.includes(i) ? "#EE4266" : fill} />
	));
	return <div className={classes.BarGraph}>{bars}</div>;
};

export default BarGraph;

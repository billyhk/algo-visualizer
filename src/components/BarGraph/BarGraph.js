import React from "react";
import Bar from "./Bar/Bar";
import classes from "./BarGraph.module.css";

const BarGraph = props => {
	let bars = props.values.map((value, i) => <Bar value={value} key={i} fill={props.activeValues.includes(i) ? 'red' : props.color}/>);
	return <div className={classes.BarGraph}>{bars}</div>;
};

export default BarGraph;

import React from "react";
import Bar from "./Bar/Bar";
import classes from "./BarGraph.module.css";

const BarGraph = props => {
	const bars = props.values.map((value, i) => <Bar value={value} key={i} fill={props.color} />);

	return <div className={classes.BarGraph}>{bars}</div>;
};

export default BarGraph;

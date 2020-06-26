import React from "react";
import Bar from "./Bar/Bar";
import classes from "./BarGraph.module.css";
import {useSelector} from 'react-redux'

const BarGraph = props => {
	const sorted = useSelector(state => state.sorted)
	const fill = sorted ? 'lightBlue' : props.color
	const bars = props.values.map((value, i) => <Bar value={value} key={i} fill={props.activeValues.includes(i) ? 'red' : fill}/>);
	return <div className={classes.BarGraph}>{bars}</div>;
};

export default BarGraph;

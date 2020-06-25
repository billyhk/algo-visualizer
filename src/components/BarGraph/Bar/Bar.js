import React from "react";
import { useSelector } from "react-redux";

const Bar = props => {
	const arraySize = useSelector(state => state.arraySize);
	const sorting = useSelector(state => state.sorting)

	const containerStyle = {
		height: `${(props.value / arraySize) * 100}%`,
		flex: 1,
		marginTop: "auto",
		transition: sorting ? 'none' : 'all .3s ease'
	};

	const barStyle = {
		backgroundColor: props.fill,
		height: "100%",
		margin: "0 10%",
		boxShadow: "0 0 .5em #1da9cc",
	};

	return (
		<div style={containerStyle}>
			<div style={barStyle} />
		</div>
	);
};

export default Bar;

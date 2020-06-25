import React from "react";

const Bar = props => {
	const duration = 250;

	const containerStyle = {
		height: `${props.value}%`,
		flex: 1,
		marginTop: "auto",
	};

	const barStyle = {
		backgroundColor: props.fill,
		height: "100%",
		margin: "0 10%",
		boxShadow: '0 0 .5em #1da9cc'
	};

	return (
		<div style={containerStyle}>
			<div style={barStyle} id={props.index} />
		</div>
	);
};

export default Bar;

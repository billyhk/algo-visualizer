import React from "react";
import { useSelector } from "react-redux";

const Bar = props => {
	const arraySize = useSelector(state => state.sort.arraySize);
	const sorting = useSelector(state => state.sort.sorting)

	const containerStyle = {
		height: `${(props.value / arraySize) * 100}%`,
		flex: 1,
		marginTop: "auto",
		transition: sorting ? 'none' : 'all .3s ease'
	};

	const barStyle = {
		backgroundImage: `linear-gradient(to bottom, ${props.fill}, 90%, white)`,
		height: "100%",
		margin: "0 12%",
		borderTop: `2px solid ${props.fill === '#EE4266' ? '#EE4266' : '#05668d'}`

	};

	return (
		<div style={containerStyle}>
			<div style={barStyle} />
		</div>
	);
};

export default Bar;
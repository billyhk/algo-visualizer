import React from "react";
import { Transition } from "react-transition-group";

const Bar = props => {
	const duration = 250;

	const containerStyle = {
		transition: `all ${duration}ms ease-in-out`,
		height: `${props.value}%`,
		flex: 1,
		marginTop: "auto",
	};

	const barStyle = {
		backgroundColor: props.fill,
		height: "100%",
		margin: "0 10%",
	};

	return (
		<Transition in={props.value} timeout={duration}>
			{state => (
				<div style={containerStyle}>
					<div style={barStyle} />
				</div>
			)}
		</Transition>
	);
};

export default Bar;

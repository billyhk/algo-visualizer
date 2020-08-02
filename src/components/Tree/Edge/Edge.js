import React from "react";

const Edge = props => {
	return (
		<svg style={{ position: "absolute" }} width="100%" height="100%">
			<line x1={props.x1} y1={props.y1} x2={props.x2} y2={props.y2} stroke="#c0c0c0" />
		</svg>
	);
};

export default Edge;

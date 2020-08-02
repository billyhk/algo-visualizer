import React from "react";
import NodeIcon from "@material-ui/icons/TripOrigin";

const Node = props => {
	const style = {
		width: "2rem",
		height: "2rem",
      backgroundColor: "#fafafa",
      border: `.4rem solid ${props.fill}`,
		borderRadius: "1000px",
      display: "flex",
      justifyContent: "center",
		alignItems: "center",
		transition: "all .2s ease"
	};

	return (
		<div style={style} id={`node${props.nodeId}`} />
	);
};

export default Node;

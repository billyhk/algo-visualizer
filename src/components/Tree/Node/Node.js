import React from "react";
import NodeIcon from "@material-ui/icons/TripOrigin";

const Node = props => {
	const style = {
		width: `${props.size}px`,
		height: `${props.size}px`,
      backgroundColor: props.visited ? "#ee426799" : "#fafafa",
      border: `${props.size / 5.5}px solid ${props.visited ? "#EE4266" : "#05668d"}`,
		borderRadius: "1000px",
      display: "flex",
      justifyContent: "center",
		alignItems: "center",
		transition: "border backgroundColor .3s ease-out"
	};

	return (
		<div style={style} id={`node${props.nodeId}`} />
	);
};

export default Node;

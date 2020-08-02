import React from "react";
import NodeIcon from "@material-ui/icons/TripOrigin";

const Node = props => {
	const style = {
		width: "2rem",
		height: "2rem",
      backgroundColor: "#fafafa",
      border: ".2rem solid #05668d",
		borderRadius: "1000px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
	};


	return (
		<div style={style} id={props.nodeId} />
	);
};

export default Node;

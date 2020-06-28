import React from "react";
import TargetIcon from "@material-ui/icons/MyLocation";
import StartIcon from "@material-ui/icons/TripOrigin";

const Node = props => {
	const onMouseOverHandler = e => {
		e.preventDefault();
		if (
			props.mouseDown &&
			!(
				props.isStart ||
				props.isTarget ||
				props.isWall ||
				props.draggingStart ||
				props.draggingTarget
			)
		) {
			props.makeWall();
		}

		if (props.draggingStart && !(props.isTarget || props.isWall)) {
			props.makeStart();
		}

		if (props.draggingTarget && !(props.isStart || props.isWall)) {
			props.makeTarget();
		}
	};

	const onMouseDownHandler = e => {
		e.preventDefault();
		if (props.isStart) {
			props.setDraggingStartTrue();
		} else if (props.isTarget) {
			props.setDraggingTargetTrue();
		} else if (!props.isWall) {
			props.makeWall();
      }
	};

	const deleteWallHandler = e => {
      e.preventDefault();
      if (props.isWall) {
         props.deleteWall()
      }
	};

	let fill = "white";
	if (props.isWall) {
		fill = "black";
	}
	
   if (props.visited) {
		fill = "teal";
	}

	if (props.isPath) {
		fill = "yellow";
   }

	const nodeStyle = {
		backgroundColor: fill,
		height: "3rem",
		width: "3rem",
	};

	let icon = null;
	if (props.isStart) {
		icon = <StartIcon style={{ color: "green", fontSize: "3rem" }} />;
	}
	if (props.isTarget) {
		icon = <TargetIcon style={{ color: "red", fontSize: "3rem" }} />;
	}

	return (
		<div
			style={nodeStyle}
			onMouseOver={onMouseOverHandler}
			onMouseDown={onMouseDownHandler}
         onClick={deleteWallHandler}
		>
			{icon}
		</div>
	);
};

export default Node;

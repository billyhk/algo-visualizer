import React from "react";
import TargetIcon from "@material-ui/icons/MyLocation";
import StartIcon from "@material-ui/icons/TripOrigin";

const Node = props => {
	const { type } = props;

	const onMouseOverHandler = e => {
		e.preventDefault();
		if (
			props.mouseDown &&
			!(
				type === "start" ||
				type === "target" ||
				type === "wall" ||
				props.draggingStart ||
				props.draggingTarget
			)
		) {
			props.makeWall();
		}

		if (props.draggingStart && !(type === "target" || type === "wall")) {
			props.makeStart();
		}

		if (props.draggingTarget && !(type === "start" || type === "wall")) {
			props.makeTarget();
		}
	};

	const onMouseDownHandler = e => {
		e.preventDefault();
		if (type === "start") {
			props.setDraggingStartTrue();
		} else if (type === "target") {
			props.setDraggingTargetTrue();
		} else if (!type === "wall") {
			props.makeWall();
		}
	};

	const deleteWallHandler = e => {
		e.preventDefault();
		if (type === "wall") {
			props.deleteWall();
		}
	};

	let fill = "white";
	let icon = null;
	switch (type) {
		case "start":
			icon = <StartIcon style={{ color: "green", fontSize: "3rem" }} />;
			break;
		case "target":
			icon = <TargetIcon style={{ color: "red", fontSize: "3rem" }} />;
			break;
		case "wall":
			fill = "black";
			break;
		case "path":
			fill = "lightBlue";
			break;
		case "visited":
			fill = "gray";
			break;
		default:
	}

	const nodeStyle = {
		backgroundColor: fill,
		height: "3rem",
		width: "3rem",
		transition: 'all .1s ease-in'
	};

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

import React from "react";
import TargetIcon from "@material-ui/icons/MyLocation";
import StartIcon from "@material-ui/icons/TripOrigin";
import classes from './Node.module.css'

const Node = props => {
	const { type } = props;
	const onMouseOverHandler = e => {
		e.preventDefault();
		if (
			props.mouseDown &&
			!(
				props.start ||
				props.target ||
				type === "wall" ||
				props.draggingStart ||
				props.draggingTarget
			)
		) {
			props.makeWall();
		}

		if (props.draggingStart && !(props.target || type === "wall")) {
			props.makeStart();
		}

		if (props.draggingTarget && !(props.start || type === "wall")) {
			props.makeTarget();
		}
	};

	const onMouseDownHandler = e => {
		e.preventDefault();
		if (props.start) {
			props.setDraggingStartTrue();
		} else if (props.target) {
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

	let nodeWidth = 25;
		let media = window.matchMedia("(max-width: 700px)");
		if (media.matches) {
			nodeWidth = 15;
		}

	let icon = null;
	if (props.start) {
		icon = (
			<StartIcon
				style={{ color: type === "path" ? "#fafafa" : "#05668d", fontSize: `${nodeWidth}px` }}
			/>
		);
	} else if (props.target) {
		icon = (
			<TargetIcon
				style={{ color: type === "path" ? "#fafafa" : "#EE4266", fontSize: `${nodeWidth}px` }}
			/>
		);
	}

	let fill = "#fafafa";
	let border = "none";
	switch (type) {
		case "wall":
			fill = "#e0e0e0";
			border = "1px ridge #9e9e9e";
			break;
		case "path":
			fill = "#05668d";
			break;
		case "visited":
			fill = "#c3e5f3";
			border = "1px solid #fafafa";
			break;
		default:
	}

	

	const nodeStyle = {
		backgroundColor: fill,
		border: border,
		borderRadius: "3px",
		height: nodeWidth + 'px',
		width: nodeWidth + 'px',
		transition: "all .1s ease-in",
	};
	return (
		<div
			className={classes.Node}
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

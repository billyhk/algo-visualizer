import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Node from "./Node/Node";
import Edge from "./Edge/Edge";

const Tree = props => {
	const [edges, setEdges] = useState([]);
	const traversed = useSelector(state => state.traverse.traversed);

	useEffect(() => {
		window.addEventListener("resize", createEdges);
		createEdges();
		return () => {
			window.removeEventListener("resize", createEdges);
		};
	}, [props.height]);

	const createEdges = () => {
		const tree = document.getElementById("tree");
		const rectTree = tree.getBoundingClientRect();
		const edges = [];
		for (let i = 0; i < Math.floor((Math.pow(2, props.height + 1) - 1) / 2); i++) {
			const node = document.getElementById(`node${i}`);
			const rectNode = node.getBoundingClientRect();
			const left = document.getElementById(`node${i * 2 + 1}`);
			const rectLeft = left.getBoundingClientRect();
			const right = document.getElementById(`node${i * 2 + 2}`);
			const rectRight = right.getBoundingClientRect();
			edges.push(
				<Edge
					x1={rectTree.right - (rectNode.right + rectNode.left) / 2}
					y1={rectNode.bottom - rectTree.top}
					x2={rectTree.right - (rectLeft.right + rectLeft.left) / 2}
					y2={rectLeft.top - rectTree.top}
				/>,
				<Edge
					x1={rectTree.right - (rectNode.right + rectNode.left) / 2}
					y1={rectNode.bottom - rectTree.top}
					x2={rectTree.right - (rectRight.right + rectRight.left) / 2}
					y2={rectRight.top - rectTree.top}
				/>
			);
		}
		setEdges(edges);
	};

	const style = {
		display: "grid",
		gridTemplateRows: `repeat(${props.height + 1}, 1fr)`,
		height: "100%",
		position: "relative",
	};

	const levelStyle = {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		textalign: "center",
	};

	const tree = [];
	let capacity = 1;
	let nodeIndex = 0;
	for (let i = 0; i < props.height + 1; i++) {
		let currentLevel = [];
		for (let j = 0; j < capacity; j++) {
			currentLevel.push(
				<Node
					nodeId={nodeIndex}
					key={nodeIndex}
					fill={traversed[nodeIndex] ? "#EE4266" : "#05668d"}
				/>
			);
			nodeIndex++;
		}
		tree.push(
			<div style={levelStyle} key={capacity}>
				{currentLevel}
			</div>
		);
		capacity *= 2;
	}

	return (
		<div style={style} id="tree">
			{tree}
			{edges}
		</div>
	);
};

export default Tree;

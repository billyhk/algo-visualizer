import React from "react";
import Tree from "../../components/Tree/Tree";
import classes from "./Traverser.module.css";
import { Paper, Button, Slider } from "@material-ui/core";
import Selection from "../../components/UI/Selection/Selection";

const Traversing = props => {

	let media = window.matchMedia("(max-width: 700px)");
	return (
		<div className={classes.Traverser}>
			<div className={classes.TreeContainer}>
				<div className={classes.Tree}>
					<Tree height={4} />
				</div>
			</div>
			<Paper
				className={classes.ControlsContainer}
				elevation={10}
				style={{ borderRadius: 0, paddingBottom: media.matches ? "4rem" : "0" }}
			>
				<div className={classes.Controls}>
					<h1 style={{ marginBottom: "3rem" }}>Traversing</h1>
					<Button
						color="primary"
						size="large"
						variant="outlined"
						style={{ marginRight: ".8rem" }}
					>
						set new
					</Button>
					<Button color="secondary" size="large" variant="contained" disableElevation>
						stop
					</Button>
					<p className={classes.SliderTitle}>Array Size</p>
					<Slider valueLabelDisplay min={10} />
					<p className={classes.SliderTitle}>Animation Speed</p>
					<Slider valueLabelDisplay min={1} style={{ marginBottom: "3rem" }} />
				</div>
			</Paper>
		</div>
	);
};

export default Traversing;

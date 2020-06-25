import React from "react";
import classes from "./Toolbar.module.css";
import { NavLink } from "react-router-dom";

const Toolbar = props => {
	return (
		<nav className={classes.Toolbar}>
			<div className={classes.Logo}>SOME LOGO</div>
			<div className={classes.LinksContainer}>
				<NavLink
					className={classes.Link}
					to="/sorting"
					activeStyle={{ borderBottom: ".3rem solid #fff"}}
				>
					Sorting
				</NavLink>
				<NavLink
					className={classes.Link}
					to="/path-finding"
					activeStyle={{ borderBottom: ".3rem solid #fff"}}
				>
					Path Finding
				</NavLink>
				<NavLink
					className={classes.Link}
					to="/something"
					activeStyle={{ borderBottom: ".3rem solid #fff"}}
				>
					Something
				</NavLink>
			</div>
		</nav>
	);
};

export default Toolbar;

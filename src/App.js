import React from "react";
import Toolbar from './components/UI/Toolbar/Toolbar'
import Sorter from "./containers/Sorter/Sorter";
import PathFinder from './containers/PathFinder/PathFinder'
import {Switch, Route} from 'react-router-dom'

import "./App.css";

function App() {
	return (
		<div className="App">
			<Toolbar />
			<Switch>	
				<Route path='/path-finding' component={PathFinder} />
				<Route path='/' component={Sorter} />
			</Switch>
		</div>
	);
}

export default App;

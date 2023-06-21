import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Container, Header, Content, Footer } from "rsuite";

import 'rsuite/dist/rsuite.min.css';

import Interface from "./Interface.js";


function App() {

	return (
	
		<Container>
			<Content>
				<Router>
					<Switch>
						<Route exact path="/" component={Interface}></Route>
						<Redirect to="/" />
					</Switch>
				</Router>
			</Content>
		</Container>
		
	);
}

export default App;

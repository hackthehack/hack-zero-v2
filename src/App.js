import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import CreateHack from './components/create-hack'

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' component={CreateHack}/>
			</Switch>
		</BrowserRouter>
	);
}
export default App;

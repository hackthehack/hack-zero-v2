import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import CreateHack from './components/create-hack'

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/'>
					<CreateHack/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
export default App;

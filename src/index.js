import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<MainLayout />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

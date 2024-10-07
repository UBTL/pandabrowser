import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import config from 'config';
import featureFlags from './util/featureFlags';

featureFlags.initialize(config.features);

const App = () => (
	<BrowserRouter>
		<Route path="/" component={Home} />
	</BrowserRouter>
);

export default hot(App);
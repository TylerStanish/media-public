import React from 'react';
import {Meteor} from 'meteor/meteor';
import ReactDOM, {render} from 'react-dom';
import {IndexRoute, Router, hashHistory, browserHistory} from 'react-router';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';

import reducers from './reducers';
import history from './history';

import App from './components';

const routes = (
	<Provider store={createStore(reducers)}>
		<Router history={history}>
			<Route path='/' component={App}/>
		</Router>
	</Provider>
);

Meteor.startup(() => {
	ReactDOM.render(routes, document.getElementById('target'));
});


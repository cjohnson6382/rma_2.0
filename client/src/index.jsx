import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import io from 'socket.io-client';

import {search, setState} from './action_creators';
import reducer from './reducer';
import remoteActionMiddleware from './remote_action_middleware';

import App from './components/App';
import {TicketListContainer} from './components/TicketList';
import {TicketContainer} from './components/Ticket';


const socket = io('http://cjohnson.ignorelist.com:8090');
//  create the store, add middleware to it, and dispatch an action?
const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);

store.dispatch(search());


socket.on('state', state => {
		console.log('got state from server', state);
 	 	store.dispatch(setState(state));
	}
);

const routes = <Route component={App}>
  <Route path="/" component={TicketListContainer} />
  <Route path="/ticket" component={TicketContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

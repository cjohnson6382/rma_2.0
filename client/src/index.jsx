import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import io from 'socket.io-client';

import {search, setState, setAutocompletes} from './action_creators';
import reducer from './reducer';
import remoteActionMiddleware from './remote_action_middleware';

import App from './components/App';
import {TicketListContainer} from './components/TicketList';
//	import {TicketContainer} from './components/Ticket';
	

//		const socket = io('http://cjohnson.ignorelist.com:8090');
const socket = io('http://localhost:8090');
//  create the store, add middleware to it, and dispatch an action?
const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);

store.dispatch(search());


socket.on('ticket', ticket => {
		console.log('received a ticket from the server', store.getState().getIn(['ui', 'showmodal']));

		if (store.getState().getIn(['ui', 'showmodal']) === false) {
			console.log('received state from server: ', ticket);
 	 		store.dispatch(setState('ticket', ticket));
 	 	}
	}
);

socket.on('ticket_list', list => {
	if (store.getState().getIn(['ui', 'showmodal']) === false) {
		console.log('received list from server', list);
		store.dispatch(setState('ticket_list', list));
	}
});

socket.on('autocompletes', autocompletes => {
	store.dispatch(setAutocompletes(autocompletes));
	console.log('updating autocompletes');
});

  //	<Route path="/ticket" component={TicketContainer} />
const routes = <Route component={App}>
  <Route path="/" component={TicketListContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

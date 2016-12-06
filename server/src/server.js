import Server from 'socket.io';
import { dbFetcher } from './core';

import {MongoClient} from 'mongodb';
//  const MongoClient = require('mongodb').MongoClient;


export function startServer(store) {
  const io = new Server().attach(8090);
  MongoClient.connect("mongodb://localhost:27017/rmatickets")
    .then((db) => {
     	let dbHandle = db.collection('tickets');
      store.subscribe(
        () => {	
		io.emit('state', store.getState());
		console.log('store state after emit: ', store.getState());
	}
      );
    
      io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', (action) => {
		//	console.log('server received an action: ', action);
        	if (action.meta.db) {
			store.dispatch(dbFetcher(dbHandle)(action.type)(action));
          	} else {
            		store.dispatch(action);
          	}
        });
      });
    })
    .then(() => { return })
		.catch((e) => console.log(e.trace));
}

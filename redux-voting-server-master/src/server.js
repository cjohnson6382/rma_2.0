import Server from 'socket.io';
import { dbFetcher } from './core';

import {MongoClient} from 'mongodb';
//  const MongoClient = require('mongodb').MongoClient;


export function startServer(store) {
  const io = new Server().attach(8090);
  MongoClient.connect('tickets')
    .then((db) => {
      //  dbHandle = dbFetcher(db);
      store.subscribe(
        () => io.emit('state', store.getState().toJS())
      );
    
      io.on('connection', (socket) => {
        //  on first connection, emit the state, which should be a list of tickets, a blank search box, and a modal-show: false
        socket.emit('state', store.getState().toJS());
        //  socket.on takes an identifer ('action') to trigger on and a function to provide its payload to (store.dispatch.bind(store))
        socket.on('action', (action) => {
          if (action.meta === 'db') {
            //  dbHandle returns a function that gets dispatched
            store.dispatch(dbFetcher(db)(action.type)(action.query)).bind(store);
          } else {
            store.dispatch(action).bind(store);
          }
        });
      });
    })
    .then(() => { return });
}

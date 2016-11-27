import {List, Map} from 'immutable';

//  const DB = { production: "mongodb://localhost:27017/rmatickets", test: "mongodb://localhost:27017/test" };

export const INITIAL_STATE = Map({
	ticket_list: [],
	ticket: {}
});

//	change the names of the 'types' to correspond with the action types that are passed to this function (names are on the client-side actions that are dispatched)
export const dbFetcher = db => type => action => {
  switch (type) {
    case 'SEARCH_TICKETS':
      return search(db, action);
    case 'get':
      return get(db, action);
    case 'delete':
      return remove(db, action);
    case 'update':
      return update(db, action);
  }
	console.log('dbFetcher: action.type failed to match');
};

//  helper function for search
function parseSearch (action) {
	let query = action.query && action.query !== '' ? { $text: { $search: action.query } } : {};

	if (action.before || action.after) {
		query.date = {};

		if (action.before) {
			let before = new Date(action.before.split("-"));
			query.date['$lte'] = before.valueOf();
		}
		if (action.after) {
			let after = new Date(action.after.split("-"));
			query.date['$gte'] = after.valueOf();
		}
	}

  return Promise.resolve(query);
}

//	export const INITIAL_STATE = Map();

function get(db, action) {
  action.query === 'new' ?
    db.findOne({ _id: action.query })
      .then(ticket => {
        return dispatch => dispatch(setState('ticket', ticket));
        //  state.set('ticket', ticket)
      })
      .catch((e) => { console.log(e.trace) }) :
    db.findOne({ id: parseInt(action.query) })
      .then(ticket => {
        return dispatch => dispatch(setState('ticket', ticket));
        //  state.set('ticket', ticket);
      })
      .catch(e => console.log(e.trace));
}

function search(db, action) {
	return dispatch => {
	  parseSearch(action).then((query) => {
	    db.find(query).toArray()
	      .then(list => {
					//	console.log('this should be a list of tickets: ', list[0]);
	        dispatch(setState([['ticket_list'], List(list)]));
	      })
	      .catch(e => console.log(e.stack));
	  });
	};

//  parseSearch(action).then((query) => {
//    db.find(query).toArray()
//      .then(list => {
//				console.log('this should be a list of tickets: ', list[0]);
//        return dispatch => dispatch(setState([['ticket_list'], List(list)]));
//      })
//      .catch(e => console.log(e.stack));
//  });
}

function remove(db, action) {
  db.deleteOne({ id: parseInt(action.query) })
    .then(s => { return dispatch => console.log('deleted ticket; no state change') })
    .catch(e => console.log(e.trace));
}

function update(db, action) {
  db.update({ id: action.query.id }, action.query, { upsert: true })
    .then(res => { return dispatch => console.log('updated a ticket; no state change') })
    .catch(e => console.log(e.trace));
}


//	action creator
export function setState (stateChange) {
  return {
    type: 'SET_STATE',
    payload: stateChange
  };
}

//	reducer function
export function mutate (state, change) {
	console.log();
  state.setIn(...change);
}

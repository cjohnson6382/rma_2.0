import {List, Map} from 'immutable';

//  const DB = { production: "mongodb://localhost:27017/rmatickets", test: "mongodb://localhost:27017/test" };

const dbFetcher = db => type => action => {
  switch (type) {
    case 'search':
      return search(db, action);
    case 'get':
      return get(db, action);
    case 'delete':
      return remove(db, action);
    case 'update':
      return update(db, action);
  }
};

//  helper function for search
function parseSearch (search) {
	let query = search.query === "" ? {} : { $text: { $search: search.query } };

	if (seach.before !== "" || search.after !== "") {
		query.date = {};

		if (search.before !== "") {
			let before = new Date(search.before.split("-"));
			query.date['$lte'] = before.valueOf();
		}
		if (search.after !== "") {
			let after = new Date(search.after.split("-"));
			query.date['$gte'] = after.valueOf();
		}
	}

  return query;
}

export const INITIAL_STATE = Map();

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
  parseSearch(action).then((query) => {
    db.find(query).toArray()
      .then(list => {
        return dispatch => dispatch(setState('ticket_list', List(list)));
      })
      .catch(e => console.log(e.stack));
  });
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

export function setState (stateChange) {
  return {
    type: 'SET_STATE',
    payload: stateChange
  };
}

export function mutate (state, change) {
  state.set(...change);
}
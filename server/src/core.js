import {List, Map} from 'immutable';


//	export const INITIAL_STATE = Map();
export const INITIAL_STATE = Map({
	ticket_list: List([]),
	ticket: Map({}),
	autocomplete: Map({ options: List([]) })
});

export const dbFetcher = db => type => action => {

	console.log('dbFetcher, action: ', action);

  switch (type) {
    case 'SEARCH_TICKETS':
      return search(db, action);
    case 'GET_TICKET':
      return get(db, action);
    case 'SAVE_TICKET':
      return update(db, action);
    case 'delete':
      return remove(db, action);
    case 'update':
      return update(db, action);
		case 'AUTOCOMPLETE_OPTIONS':
			return autocompletes(db, action);
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


function autocompletes (db, action) {
	console.log('autocompletes thunk: ', action);
	let regex = new RegExp('^' + action.value.query, 'i');

	return dispatch => {
		db.distinct(action.value.field, { [action.value.field]: { $regex: regex }})
    	.then((data) => {
				let data_slice = data.length > 15 ? docs.slice(0, 14) : data;

				//	dispatch(setStateIn(['autocomplete', 'options'], data_slice));
				dispatch(setStateIn([['autocomplete', 'options'], List(data_slice)]));
    	})
    	.catch((err) => { console.log(err) });
	};	
}

function get(db, action) {
  return action.value === 'new' ?
		dispatch => {
			db.findOne({ _id: action.value })
	      .then(ticket => dispatch(setState(['ticket', ticket])))
	      .catch((e) => { console.log(e.trace) }) 
		} 
		:
		dispatch => {
		  db.findOne({ id: parseInt(action.value) })
	      .then(ticket => dispatch(setState(['ticket', ticket])))
	      .catch(e => console.log(e.trace));
		}
}

function search(db, action) {
	return dispatch => {
	  parseSearch(action).then((query) => {
	    db.find(query).toArray()
	      .then(list => {
	        dispatch(setState(['ticket_list', List(list)]));
	      })
	      .catch(e => console.log(e.stack));
	  });
	};
}

function remove(db, action) {
  db.deleteOne({ id: parseInt(action.query) })
    .then(s => { return dispatch => console.log('deleted ticket; no state change') })
    .catch(e => console.log(e.trace));
}

function update(db, action) {
	return dispatch => {
		console.log('in update function; ticket to be inserted: ', action.query);

		let id = action.query.id;
		delete action.query._id;

	  db.update({ id: id }, action.query, { upsert: true })
	    .then(res => dispatch(setState(['logger', res])))
	    .catch(e => console.log(e));
	}
}



//	action creators
export function setState (stateChange) {
  return {
    type: 'SET_STATE',
    payload: stateChange
  };
}

export function setStateIn (stateChange) {
	return {
		type: 'SET_STATE_IN',
		payload: stateChange
	};
}


//	reducer functions
export function mutate (state, change) {
  return state.set(...change);
}

export function mutateIn (state, change) {
	console.log('change in mutateIn: ', change);
	return state.setIn(...change);
}

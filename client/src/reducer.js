import {List, Map} from 'immutable';

function cancelHideAutocompletes (state) {
  clearInterval(state.getIn(['ui', 'countdown']));
	return state;
}

function hideAutocompletes (state, intervalid) {
	return state.setIn(['ui', 'countdown'], intervalid);
}

function getOptions (state, query) {
	return state;
}

function setAutocompletes (state, array) {
  return state.setIn(['autocompletes', 'options'], List(array));
}

function setVis (state, bool) {
  return state.setIn(['ui', 'autocompletes_visible'], bool);
}

function search(state, query) {
  return state;
}

function setTicketProp(state, name, value) {
  return state.setIn(['ticket', name], value);
}

function setAutocompleteField(state, value) {
	return state.setIn(['ui', 'input'], value);
}

function saveTicket(state) {
  return state;
}

function getTicket(state) {
	showModal(state, true);
  return state;
}

function showModal(state, bool) {
  return state.setIn(['ui', 'showmodal'], bool);
}

function setSearch(state, name, value) {
  return state.set('search', value);
}

function create(state, action) {
  console.log('creating new ticket on server');
  return state;
}

function setState (state, newState) {
  return state.merge(newState);
}

const INITIAL_STATE = Map({ 
	ui: Map({ showmodal: false, autocompletes_visible: false, input: ''  }), 
	autocomplete: Map({ popover_countdown: 0, options: List([]) }) 
});

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  	case 'SET_STATE':
  	  return setState(state, action.value);
  	case 'SEARCH_TICKETS':
  	  return search(state, action);
  	case 'SET_PROP':
  	  return setTicketProp(state, action.name, action.value);
		case 'SET_AUTOCOMPLETE_FIELD':
			return setAutocompleteField(state, action.value);
  	case 'SAVE_TICKET':
  	  return saveTicket(state);
  	case 'GET_TICKET':
  	  return getTicket(state);
  	case 'SHOW_MODAL':
  	  return showModal(state, action.value);
  	case 'SET_SEARCH':
  	  return setSearch(state, action.name, action.value);
  	case 'CREATE':
  	  return create(state, action);
  	case 'CANCEL_HIDE_AUTOCOMPLETES':
  	  return cancelHideAutocompletes(state);
  	case 'HIDE_AUTOCOMPLETES':
  	  return hideAutocompletes(state);
  	case 'AUTOCOMPLETE_OPTIONS':
  	  return getOptions(state, action);
  	case 'SET_AUTOCOMPLETES':
  	  return setAutocompletes(state, action.value);
  	case 'AUTOCOMPLETES_VISIBLE':
  	  return setVis(state, action.value);
  	case 'AUTOCOMPLETE_COUNTDOWN':
  	  return countdown(state, action.value);
	}
  return state;
}

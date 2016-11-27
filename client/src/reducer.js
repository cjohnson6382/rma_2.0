import {List, Map} from 'immutable';

function cancelHideAutocompletes (state) {
  clearInterval(state.getIn(['ui', 'countdown']));
}

//  this should not be in a reducer!!!!
function hideAutocompletes (state, intervalid) {
	state.setIn(['ui', 'countdown'], intervalid);
}

function getOptions (state, query) {
  //  this is intercepted and sent to the server
  console.log(query);
}

function setAutocompletes (state, array) {
  state.setIn(['autocompletes', 'options'], List(array));
  setVis(state, false);
}

function setVis (state, bool) {
  state.setIn(['ui', 'autocompletes_visible'], bool);
}

function search(state, query) {
  //  I guess this is where I'd put a loading bar in place of the table that displays the ticket list?
  console.log('searching the server for tickets; no state change locally');
  return state;
}

//  this is to set individual props on the client side; none of this goes server-side until 'save' action is fired
function setTicketProp(state, prop) {
  //  prop is a {k:v} pair
  return state.setIn(['ticket'], prop);
}

function saveTicket(state) {
  console.log('saving ticket to server; set modal to hide');
  return showModal(false);
}

//  this function just shows the modal; action creator fetches the server with the ticket ID; server sets state, propagates it down
function editTicket(state, id) {
  return showModal(true);
}

function showModal(state, bool) {
  return state.setIn(['ui'], Map('showmodal', bool));
}

function setSearch(state, name, value) {
  //  I don't know if I'm using setIn correctly
  return state.setIn(['search'], {[name]: value});
}

function create(state, action) {
  console.log('creating new ticket on server');
  return state;
}

function setState (state, newState) {
  state.merge(newState);
  return state;
}

export default function(state = Map(), action) {
  switch (action.type) {
  	case 'SET_STATE':
  	  return setState(state, action);
  	case 'SEARCH_TICKETS':
  	  return search(state, action);
  	case 'SET_PROP':
  	  return setTicketProp(state, action.value);
  	case 'SAVE_TICKET':
  	  return saveTicket(state);
  	case 'EDIT_TICKET':
  	  return editTicket(state, action.value);
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
  	  return getOptions(state, action.value.query);
  	case 'SET_AUTOCOMPLETES':
  	  return setAutocompletes(state, action.value);
  	case 'AUTOCOMPLETES_VISIBLE':
  	  return setVis(state, action.value);
  	case 'AUTOCOMPLETE_COUNTDOWN':
  	  return countdown(state, action.value);
	}
  return state;
}

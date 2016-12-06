
//  Set the states that come down from the server
//	checked
export function setState (newState) {
	return {
		type: 'SET_STATE',
		value: newState
	};
}
///////////////////////////////////////////////

//  AutocompleteField component specific
//	checked
export function setAutocompleteField (value) {
	return {
		type: 'SET_AUTOCOMPLETE_FIELD',
		value: value
	}
}

export function cancelHideAutocompletes () {
  return {
    type: 'CANCEL_HIDE_AUTOCOMPLETES'
  };
}
export function hideAutocompletes (timeout) {
  return {
    type: 'HIDE_AUTOCOMPLETES',
		value: timeout
  };
}

//	checked
export function getOptions (field, query) {
  return {
    type: 'AUTOCOMPLETE_OPTIONS',
    value: { field: field, query: query },
    meta: { remote: true, db: true }
  };
}

//	checked
export function setAutocompletes(array) {
  return {
    type: 'SET_AUTOCOMPLETES',
    value: array
  };
}

export function setVis (bool) {
  return {
    type: 'AUTOCOMPLETES_VISIBLE',
    value: bool
  };
}
export function countdown (id) {
  return {
    type: 'AUTOCOMPLETE_COUNTDOWN',
    value: id
  };
}
///////////////////////////////////////////////

//  for search bar on landing page/ticket list
export function setSearch (name, value) {
  return {
    type: 'SET_SEARCH',
    name: name,
    value: value
  };
}


export function before (date) {
  return setSearch('before', date);
}

export function after (date) {
  return setSearch('after', date);
}

export function query (query) {
  return setSearch('query', date);
}


export function search(query) {
  return {
    type: 'SEARCH_TICKETS',
		value: query,
    meta: { remote: true, db: true }
  };
}
///////////////////////////////////////////////

//  for setting props on tickets
//	checked
export function setProp(name, value) {
	console.log('setProp: ', name, value);

  return {
    type: 'SET_PROP',
		name: name,
    value: value
  };
}
///////////////////////////////////////////////


//  button bar dispatchers to create and edit tickets
//	needs to be modified
export function saveTicket() {
  return {
    type: 'SAVE_TICKET',
    meta: { remote: true, search: true, db: true }
  };
}

//	checked
export function getTicket(id) {
  return {
    type: 'GET_TICKET',
    value: id.currentTarget.attributes.value.value,
    meta: { remote: true, db: true }
  };
}

export function create() {
  return {
    type: 'CREATE',
    meta: { remote: true, db: true }
  }
}

//	checked
export function showModal(bool) {
  return {
    type: 'SHOW_MODAL',
    value: bool
  };
}
///////////////////////////////////////////////
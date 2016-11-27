export function setState (newState) {
	return {
		type: 'SET_STATE',
		value: newState
	};
}

export function cancelHideAutocompletes () {
  return {
    type: 'CANCEL_HIDE_AUTOCOMPLETES'
  };
}
export function hideAutocompletes () {
  return {
    type: 'HIDE_AUTOCOMPLETES'
  };
}

export function getOptions (field, query) {
  return {
    type: 'AUTOCOMPLETE_OPTIONS',
    value: { field: field, query: query },
    meta: { remote: true }
  };
}
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
    meta: { remote: true }
  };
}

export function setProp(prop) {
  return {
    type: 'SET_PROP',
    value: prop
  };
}

export function saveTicket(ticket) {
  return {
    type: 'SAVE_TICKET',
    meta: { remote: true, search: true }
  };
}

export function editTicket(id) {
  return {
    type: 'EDIT_TICKET',
    value: id,
    meta: { remote: true }
  };
}

export function create() {
  return {
    type: 'CREATE',
    meta: { remote: true }
  }
}

export function showModal(bool) {
  return {
    type: 'SHOW_MODAL',
    value: bool
  };
}

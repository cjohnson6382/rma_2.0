//  import objectAssign from 'object-assign';

//  I need this middleware to send stuff up to the server; pretty much as-is

export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
		action.meta.db = true;
    switch (action.type) {
      case 'SEARCH_TICKETS':
        action.query = store.getState().getIn(['search']) || '';
        break;
      case 'SAVE_TICKET':
        action.query = store.getState().getIn(['ticket']) || '';
        break;
    }
    socket.emit('action', action);
  }
  return next(action);
};


				//	console.log('in remote action middleware, adding ticket to action before sending to server', store.getState().toJS());

export default socket => store => next => action => {
	//	console.log('reducer middleware: ', action);

  if (action.meta && action.meta.remote) {

		//	console.log('in remote action middleware; this action goes to the server: ', action);
    switch (action.type) {
      case 'SEARCH_TICKETS':
        action.query = store.getState().getIn(['search']) || '';
        break;
      case 'SAVE_TICKET':
        action.query = store.getState().get('ticket') || '';
        break;
    }
    socket.emit('action', action);
  }
  return next(action);
};

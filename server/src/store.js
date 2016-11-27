import reducer from './reducer';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Map } from 'immutable';

export default function () {
  return createStore(
    reducer,
    applyMiddleware(ReduxThunk)
  );
}

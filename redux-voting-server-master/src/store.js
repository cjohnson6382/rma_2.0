import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

export default function () {
  return createStore(
    reducer,
    applyMiddleware( thunkMiddleware )
  );
}
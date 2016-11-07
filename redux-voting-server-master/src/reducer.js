import {setEntries, next, restart, vote, INITIAL_STATE} from './core';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_STATE":
      return mutate(state, action.payload);
    case "START_DB":
      return startDb(state, action);
    case "END_DB":
      return endDb(state, action);
  }
  return state;
}

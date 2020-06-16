import { Reducer } from 'redux';
import { UPDATE_USER } from '../action/actionTypes';
import initialState from '../state/state';

const reducer: Reducer<GlobalState> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return Object.assign({}, state, {
        user: action.user,
      });
  }
  return state;
};

export default reducer;

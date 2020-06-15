import { createStore, Action, Store } from 'redux';

const isClient = typeof window !== 'undefined';

declare global {
  interface GlobalState {
    name: string;
    count: number;
  }
}

const initialState: GlobalState = isClient
  ? window.__INITIAL_STATE__
  : {
      name: 'zhunrong',
      count: 0,
    };

export const ADD: Action<'add'> = {
  type: 'add',
};

let store: Store;

export function generateStore(): Store {
  if (isClient && store) return store;
  store = createStore((state: GlobalState = initialState, action) => {
    console.log(action);
    switch (action.type) {
      case 'add':
        state = Object.assign({}, state, {
          count: state.count + 1,
        });
        break;
    }
    return state;
  });
  return store;
}

export function getStore() {
  return store;
}

import { createStore, Action, Store } from 'redux';
import { isClient } from './state/state';
import reducer from './reducer/reducer';

export const ADD: Action<'add'> = {
  type: 'add',
};

let store: Store<GlobalState>;

export function generateStore(): Store {
  if (isClient && store) return store;
  store = createStore(reducer);
  return store;
}

/**
 * 初始化store
 * @param state
 */
export function initializeStore(state?: GlobalState) {
  // 在客户端需要合并上一次store的状态
  if (isClient && store) {
    store = createStore(reducer, {
      ...store.getState(),
      ...state,
    });
  } else {
    store = createStore(reducer, state);
  }
  return store;
}

export function getStore() {
  return store;
}

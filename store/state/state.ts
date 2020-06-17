export const isClient = typeof window !== 'undefined';

declare global {
  interface GlobalState {
    user: UserEntity;
  }
}

const initialState: GlobalState = {
  user: null,
};

export default initialState;

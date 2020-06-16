import { UPDATE_USER } from './actionTypes';

export function createUpdateUser(user: UserEntity) {
  return {
    type: UPDATE_USER,
    user,
  };
}

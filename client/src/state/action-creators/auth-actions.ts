import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../interface';
import { User, AuthSetUserAction } from '../interface/auth-interface';

export const loginUser = (user: User) => (dispatch: Dispatch<Action>) => {
  localStorage.setItem(
    'user',
    JSON.stringify({
      data: user,
      expiration: Date.now() / 1000 + 60 * 60 * 2,
    })
  );

  dispatch(setUser(user));
};

export const logoutUser = (history?: any) => (dispatch: Dispatch<Action>) => {
  localStorage.removeItem('user');
  dispatch(setUser(null));

  if (history) history.push('/');
};

const setUser = (payload: User | null): AuthSetUserAction => {
  return {
    type: ActionType.AUTH_SET_USER,
    payload,
  };
};

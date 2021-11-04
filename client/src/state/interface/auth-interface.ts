import { ActionType } from '../action-types';

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface AuthSetUserAction {
  type: ActionType.AUTH_SET_USER;
  payload: User | null;
}

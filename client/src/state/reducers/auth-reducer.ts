import { ActionType } from '../action-types';
import { Action } from '../interface';
import { User } from '../interface/auth-interface';

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const reducer = (state = initialState, action: Action): AuthState => {
  switch (action.type) {
    case ActionType.AUTH_SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

import { produce } from 'immer';

import { LoginRequest, LoginSuccess, LoginError } from './login.actions';

const getInitialState = () => ({
  loading: false,
  user: {
    token: localStorage.getItem('token'),
  },
  error: null,
});

export const loginReducer = (state = getInitialState(), action) => {
  if (LoginRequest.is(action)) {
    return produce(state, draft => {
      draft.loading = true;
    });
  }

  if (LoginSuccess.is(action)) {
    return produce(state, draft => {
      draft.loading = false;
      draft.user = action.payload;
    });
  }

  if (LoginError.is(action)) {
    return produce(state, draft => {
      draft.loading = false;
      draft.error = action.error;
    });
  }

  return state;
};

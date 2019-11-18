import { createSelector } from 'reselect';
import { loginFeature } from './login.feature';
import { TokenService } from '../../services/TokenService';

export const selectLogin = state => state[loginFeature.name];
export const selectLoginLoading = createSelector(
  selectLogin,
  ({ loading }) => loading,
);

export const selectAuthState = createSelector(
  selectLogin,
  ({ user: { token } }) => {
    return token ? TokenService.isTokenValid(token) : false;
  },
);

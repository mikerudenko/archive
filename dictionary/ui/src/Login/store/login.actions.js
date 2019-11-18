import { loginFeature } from './login.feature';

const { ActionCreator } = loginFeature;

export const LoginRequest = ActionCreator('/login/request');
export const LoginSuccess = ActionCreator('/login/success');
export const LoginError = ActionCreator('/login/error');


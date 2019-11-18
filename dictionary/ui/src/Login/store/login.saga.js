import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { login } from '../../api';

import { LoginRequest, LoginSuccess, LoginError } from './login.actions';

export function* loginSaga(action) {
  try {
    const {data} = yield call(login, action.payload);
    localStorage.setItem('token', data.token);
    yield put(LoginSuccess(data));
    yield put(push('/dashboard'));
  } catch (error) {
    yield put(LoginError());
  }
}

export function* watchLoginSagas() {
  yield takeEvery(action => LoginRequest.is(action), loginSaga);
}

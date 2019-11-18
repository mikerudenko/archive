import { all } from 'redux-saga/effects';

import { watchLoginSagas } from '../Login/store';
import { watchDashboardSagas } from '../Dashboard/store';

export function* rootSaga() {
  yield all([watchLoginSagas(), watchDashboardSagas()]);
}

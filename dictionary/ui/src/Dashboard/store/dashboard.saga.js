import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getWords, deleteWord, updateWord, createWord } from '../../api';
import { filtersSelector } from './dashboard.selectors';

import {
  GetWordsRequest,
  UpdateWordRequest,
  CreateWordRequest,
  DeleteWordRequest,
  GetWordsSuccess,
  GetWordsError,
  UpdateWordSuccess,
  UpdateWordError,
  CreateWordSuccess,
  CreateWordError,
  DeleteWordError,
  DeleteWordSuccess,
  ToggleEditModal,
  ToggleDeleteModal,
} from './dashboard.actions';

export function* getWordSaga(action) {
  try {
    const { data } = yield call(getWords, action.payload);
    yield put(GetWordsSuccess(data));
  } catch (error) {
    yield put(GetWordsError());
  }
}

export function* updateWordSaga(action) {
  try {
    const { data } = yield call(updateWord, action.payload);
    yield put(UpdateWordSuccess(data));
    yield put(ToggleEditModal());
    const filters = yield select(filtersSelector);
    yield call(getWordSaga, GetWordsRequest(filters));
  } catch (error) {
    yield put(UpdateWordError());
  }
}

export function* createWordSaga(action) {
  try {
    const { data } = yield call(createWord, action.payload);
    yield put(CreateWordSuccess(data));
    const filters = yield select(filtersSelector);
    yield call(getWordSaga, GetWordsRequest(filters));
  } catch (error) {
    yield put(CreateWordError());
  }
}

export function* deleteWordSaga(action) {
  try {
    debugger
    const { data } = yield call(deleteWord, action.payload);
    yield put(DeleteWordSuccess(data));
    yield put(ToggleDeleteModal());
    const filters = yield select(filtersSelector);
    yield call(getWordSaga, GetWordsRequest(filters));
  } catch (error) {
    yield put(DeleteWordError());
  }
}

export function* watchDashboardSagas() {
  yield takeEvery(action => GetWordsRequest.is(action), getWordSaga);
  yield takeEvery(action => UpdateWordRequest.is(action), updateWordSaga);
  yield takeEvery(action => CreateWordRequest.is(action), createWordSaga);
  yield takeEvery(action => DeleteWordRequest.is(action), deleteWordSaga);
}

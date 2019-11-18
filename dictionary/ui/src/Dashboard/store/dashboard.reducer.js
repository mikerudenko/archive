import { produce } from 'immer';

import {
  GetWordsRequest,
  GetWordsSuccess,
  GetWordsError,
  UpdateWordRequest,
  UpdateWordSuccess,
  UpdateWordError,
  CreateWordRequest,
  CreateWordSuccess,
  CreateWordError,
  DeleteWordRequest,
  DeleteWordSuccess,
  DeleteWordError,
  FiltersChanged,
  SetWordId,
  ToggleDeleteModal,
  ToggleEditModal,
} from './dashboard.actions';

const getInitialState = () => ({
  loading: false,
  error: null,
  words: [],
  filters: {
    offset: 0,
    limit: 25,
  },
  editModalShown: false,
  deleteModalShown: false,
  wordId: null,
  count: 0,
});

export const dashboardReducer = (state = getInitialState(), action) => {
  if (
    GetWordsRequest.is(action) ||
    UpdateWordRequest.is(action) ||
    CreateWordRequest.is(action) ||
    DeleteWordRequest.is(action) ||
    DeleteWordError.is(action)
  ) {
    return produce(state, draft => {
      draft.loading = true;
    });
  }

  if (
    GetWordsError.is(action) ||
    UpdateWordError.is(action) ||
    CreateWordError.is(action)
  ) {
    return produce(state, draft => {
      draft.loading = false;
      draft.error = action.error;
    });
  }

  if (GetWordsSuccess.is(action)) {
    return produce(state, draft => {
      draft.loading = false;
      draft.words = action.payload.words;
      draft.count = action.payload.count;
    });
  }

  if (SetWordId.is(action)) {
    return produce(state, draft => {
      draft.wordId = action.payload.id;
    });
  }

  if (ToggleDeleteModal.is(action)) {
    return produce(state, draft => {
      draft.deleteModalShown = !state.deleteModalShown;
    });
  }

  if (ToggleEditModal.is(action)) {
    return produce(state, draft => {
      draft.editModalShown = !state.editModalShown;
    });
  }

  if (FiltersChanged.is(action)) {
    return produce(state, draft => {
      draft.filters = {
        ...state.filters,
        ...action.payload,
      };
    });
  }

  return state;
}

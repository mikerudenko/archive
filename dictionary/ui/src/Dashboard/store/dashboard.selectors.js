import { createSelector } from 'reselect';
import { dashboardFeature } from './dashboard.feature';

export const dashboardSelector = state => state[dashboardFeature.name];

export const countSelector = createSelector(
  dashboardSelector,
  ({ count }) => count,
);
export const wordSelector = createSelector(
  dashboardSelector,
  ({ words }) => words,
);

export const filtersSelector = createSelector(
  dashboardSelector,
  ({ filters }) => filters,
);
export const pageSelector = createSelector(
  dashboardSelector,
  ({ filters }) => {
    return filters.offset === 0
      ? 1
      : Math.floor(filters.offset / filters.limit) + 1;
  },
);


export const selectWordId = createSelector(
  dashboardSelector,
  ({ wordId }) => wordId
)

export const selectWord = createSelector(
  dashboardSelector,
  ({ wordId, words }) => words.find(({ id }) => id === wordId) || {},
);

export const selectLoading = createSelector(
  dashboardSelector,
  ({ loading }) => loading,
);

export const selectEditModalShown = createSelector(
  dashboardSelector,
  ({ editModalShown }) => editModalShown,
);

export const selectDeleteModalShown = createSelector(
  dashboardSelector,
  ({ deleteModalShown }) => deleteModalShown,
);

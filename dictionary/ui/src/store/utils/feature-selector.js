import { createSelector } from 'reselect';

export function createFeatureSelector(featureName) {
  return createSelector(
    state => state[featureName],
    result => result,
  );
}

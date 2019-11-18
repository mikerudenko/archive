import { ActionCreatorFactory } from './action-creator';

export function FeatureActionCreator(featureName) {
  return actionName => ActionCreatorFactory(`@${featureName}/${actionName}`);
}

export function createFeature(featureName) {
  return {
    name: featureName,
    ActionCreator: FeatureActionCreator(featureName),
  };
}

import { dashboardFeature } from './dashboard.feature';

const { ActionCreator } = dashboardFeature;

export const GetWordsRequest = ActionCreator('word/get/request');
export const GetWordsSuccess = ActionCreator('word/get/success');
export const GetWordsError = ActionCreator('word/get/error');

export const UpdateWordRequest = ActionCreator('word/update/request');
export const UpdateWordSuccess = ActionCreator('word/update/success');
export const UpdateWordError = ActionCreator('word/update/error');

export const CreateWordRequest = ActionCreator('word/create/request');
export const CreateWordSuccess = ActionCreator('word/create/success');
export const CreateWordError = ActionCreator('word/create/error');

export const DeleteWordRequest = ActionCreator('word/delete/request');
export const DeleteWordSuccess = ActionCreator('word/delete/success');
export const DeleteWordError = ActionCreator('word/delete/error');

export const FiltersChanged = ActionCreator('word/filters-changed');
export const SetWordId = ActionCreator('word/set-word-id');
export const ToggleDeleteModal = ActionCreator('word/toggle-delete-modal');
export const ToggleEditModal = ActionCreator('word/toggle-edit-modal');



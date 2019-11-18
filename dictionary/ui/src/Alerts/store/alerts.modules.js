export const SHOW_ALERT = 'SHOW_ALERT';
export const LOG_ALERT = 'LOG_ALERT';
export const CLEAR_ALERT = 'CLEAR_ALERT';

const initialState = {
  logger: [],
  active: {},
};

export function AlertsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        active: {
          ...action.data,
        },
      };
    case LOG_ALERT:
      return {
        ...state,
        logger: [...state.logger, action.data],
      };
    case CLEAR_ALERT:
      return {
        ...state,
        active: {},
      };
    default:
      return state;
  }
}

function showAlert({ text, timeout, type }) {
  return {
    type: SHOW_ALERT,
    data: {
      type,
      text,
      timeout,
    },
  };
}

export const showErrorAlert = (text, timeout) =>
  showAlert({ text, timeout, type: 'error' });
export const showWarningAlert = (text, timeout) =>
  showAlert({ text, timeout, type: 'warning' });
export const showSuccessAlert = (text, timeout) =>
  showAlert({ text, timeout, type: 'success' });
export const showInfoAlert = (text, timeout) =>
  showAlert({ text, timeout, type: 'info' });

export function clearAlertAction() {
  return {
    type: CLEAR_ALERT,
  };
}

export function logAlertAction(notify) {
  return {
    type: LOG_ALERT,
    data: notify,
  };
}

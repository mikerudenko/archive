export const SHOW_ALERT = 'SHOW_ALERT';
export const LOG_ALERT = 'LOG_ALERT';
export const CLEAR_ALERT = 'CLEAR_ALERT';

const initialState = {
    logger: [],
    active: {}
};

export function AlertsReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                active: {
                    ...action.data
                }
            };
        case LOG_ALERT:
            return {
                ...state,
                logger: [...state.logger, action.data]
            };
        case CLEAR_ALERT:
            return {
                ...state,
                active: {}
            };
        default:
            return state;
    }
}

export function showErrorAlert(text, timeout) {

    return {
        type: SHOW_ALERT,
        data: {
            type: 'error',
            text,
            timeout
        }
    }
}

export function showWarningAlert(text, timeout) {
    return {
        type: SHOW_ALERT,
        data: {
            type: 'warning',
            text,
            timeout
        }
    }
}

export function showSuccessAlert(text, timeout) {
    return {
        type: SHOW_ALERT,
        data: {
            type: 'success',
            text,
            timeout
        }
    }
}

export function showInfoAlert(text, timeout) {
    return {
        type: SHOW_ALERT,
        data: {
            type: 'info',
            text,
            timeout
        }
    }
}

export function clearAlertAction() {
    return {
        type: CLEAR_ALERT
    }
}

export function logAlertAction(notify) {
    return {
        type: LOG_ALERT,
        data: notify
    }
}

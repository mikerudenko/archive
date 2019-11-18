import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { loginFeature, loginReducer } from '../Login/store';
import { reducer as formReducer } from 'redux-form';
import { dashboardReducer, dashboardFeature } from '../Dashboard/store';

export const rootReducer = history => {
  return combineReducers({
    router: connectRouter(history),
    [loginFeature.name]: loginReducer,
    [dashboardFeature.name]: dashboardReducer,
    form: formReducer,
  });
};

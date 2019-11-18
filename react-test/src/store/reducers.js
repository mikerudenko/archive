import { combineReducers } from 'redux';
import { reducer as TestConfigurator } from '../scenes/TestConfigurator/modules/TestConfigurator.modules';
import { AlertsReducer as Alert } from '../scenes/Alerts/modules';

export const makeRootReducer = () => {
    const appReducer = combineReducers({
        TestConfigurator,
        Alert
    });

    const rootReducer = (state, action) => {
        return appReducer(state, action);
    };

    return rootReducer;
};

export default makeRootReducer;

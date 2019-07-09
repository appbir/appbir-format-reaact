import { combineReducers } from 'redux-immutable';
import immutableReducer from 'redux-immutable-reducer';
import layoutReducer from './layout';

const systemReducer = combineReducers({
	layout:immutableReducer(layoutReducer)
});

export default systemReducer;
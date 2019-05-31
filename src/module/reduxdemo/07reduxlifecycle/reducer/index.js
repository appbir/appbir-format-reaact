import { combineReducers } from 'redux-immutable';
import immutableReducer  from 'redux-immutable-reducer';
import left from './left';
import right from './right';
const reducer = combineReducers({
    left: immutableReducer(left),
    right:immutableReducer(right),
});

export default reducer;
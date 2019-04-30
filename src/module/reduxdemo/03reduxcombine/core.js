import React from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';

import demo1Reducer from './demo1/reducers'
import demo2Reducer from './demo2/reducers'
import DEMO1 from './demo1/index.js'
import DEMO2 from './demo2/index.js'

let middleware = [thunk];
middleware.push(createLogger());
applyMiddleware(...middleware)

// 默认reducer
var defaultReducer = {
    demo1:demo1Reducer,
    demo2:demo2Reducer,
}

let store = createStore(combineReducers(defaultReducer),applyMiddleware(...middleware))

// const rootReducer = (state = [], action) => {
//     switch (action.type) {
//       case 'ADD_TODO':
//         return [
//           ...state,
//           {
//             id: action.id,
//             text: action.text,
//             completed: false
//           }
//         ]
//       case 'TOGGLE_TODO':
//         return state.map(todo =>
//           todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
//         )
//       default:
//         return state
//     }
//   }

// let store = createStore(rootReducer)

// 组件例子展示
class AppbirExample extends React.Component {
    render(){
        // return (<div>aaaa</div>)
        return (<Provider store={store}>
            <div>
            <DEMO1/>
            <DEMO2/>
            </div>
        </Provider>)
    }
}

export default AppbirExample;


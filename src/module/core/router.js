import React, { Component } from 'react';
import { Route, Switch } from './route';

import {createStore,combineReducers,applyMiddleware} from 'redux';
import { routerReducer, ConnectedRouter, routerMiddleware} from 'react-router-redux';

import { createLogger } from 'redux-logger';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';



import demo1Reducer from '../reduxdemo/05reduxcombine/demo1/reducers'
import demo2Reducer from '../reduxdemo/05reduxcombine/demo2/reducers'
import demo3Reducer from '../reduxdemo/05reduxcombine/demo3/reducers'
let middleware = [thunk];
middleware.push(createLogger());

import createHistory from 'history/createHashHistory';
const history = createHistory();
middleware.push(routerMiddleware(history))
// 默认reducer
var defaultReducer = {
	routerReducer, // 系统路由
    demo1:demo1Reducer,
	demo2:demo2Reducer,
	demo3:demo3Reducer
}

let store = createStore(combineReducers(defaultReducer),applyMiddleware(...middleware))

window.store = {
    store:store,
    reducer:defaultReducer
}


const AppContainer = () => (
	<Switch>
		<Route exact path="/" component={() =>
            import(/* webpackChunkName: "m_module_index" */'../demo/index.jsx')} />
		<Route exact path="/index" component={() =>
			import(/* webpackChunkName: "m_index" */'../demo/index.jsx')} />
		<Route exact path="/demo5" component={() =>
			import(/* webpackChunkName: "m_reduxdemo5" */'../reduxdemo/05reduxcombine/index.jsx')} />
	</Switch>
)

const App = connect(state => ({ location: state.routerReducer.location }))(AppContainer)

class appRouter extends Component {
	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}><App /></ConnectedRouter>
			</Provider>
		)
	}
}

export default appRouter;

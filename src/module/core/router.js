import React, { Component } from 'react';
import { Route, Switch } from './route';

import {createStore,combineReducers as defailtReducer,applyMiddleware} from 'redux';
import {combineReducers} from 'redux-immutable';

import { routerReducer, ConnectedRouter, routerMiddleware} from 'react-router-redux';

import { createLogger } from 'redux-logger';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';



import demo1Reducer from '../reduxdemo/05reduxcombine/demo1/reducers'
import demo2Reducer from '../reduxdemo/05reduxcombine/demo2/reducers'
import demo3Reducer from '../reduxdemo/05reduxcombine/demo3/reducers'
// redux原生方式 reducer
import lifeCycleReducer from '../reduxdemo/07reduxlifecycle/reducer';

let middleware = [thunk];
// middleware.push(createLogger({stateTransformer :state=>state.toJS()}));

import createHistory from 'history/createHashHistory';
const history = createHistory();
middleware.push(routerMiddleware(history));

// 初始化设置redux原生方式
const module = combineReducers({lifeCycle:lifeCycleReducer});

// 默认reducer
var defaultReducer = {
	routerReducer, // 系统路由
	module:module, // redux原生方式测试state
 //    demo1:demo1Reducer,
	// demo2:demo2Reducer,
	// demo3:demo3Reducer

}

let store = createStore(combineReducers(defaultReducer),applyMiddleware(...middleware))


// 兼容新框架
window.frame = {
    store:store,
    reducer:defaultReducer
}



const AppContainer = () => (
	<Switch>
		<Route exact path="/" component={() =>
            import(/* webpackChunkName: "m_module_index" */'../demo/index.jsx')} />
		<Route exact path="/index" component={() =>
			import(/* webpackChunkName: "m_index" */'../demo/index.jsx')} />
		<Route exact path="/demo6" component={() =>
			import(/* webpackChunkName: "m_reduxdemo6" */'../reduxdemo/06lifecycle/index.jsx')} />
		<Route exact path="/demo7" component={() =>
			import(/* webpackChunkName: "m_reduxdemo6" */'../reduxdemo/07lifecycle/index.jsx')} />
		{/*不同页面间复用*/}
		<Route exact path="/demo10" component={() =>
			import(/* webpackChunkName: "m_reduxdemo10" */'../reduxdemo/10reusability/index.jsx')} />
		<Route exact path="/demo11" component={() =>
			import(/* webpackChunkName: "m_reduxdemo11" */'../reduxdemo/11reusability/index.jsx')} />
		<Route exact path="/demo12" component={() =>
			import(/* webpackChunkName: "m_reduxdemo12" */'../reduxdemo/12reusability/index.jsx')} />
		<Route exact path="/demo13" component={() =>
			import(/* webpackChunkName: "m_reduxdemo13" */'../reduxdemo/13reusability/index.jsx')} />
		{/*同一个页面复用多个组件*/}
		<Route exact path="/demo14" component={() =>
			import(/* webpackChunkName: "m_reduxdemo14" */'../reduxdemo/14reusability/index.jsx')} />
		{/*同一个页面复用多个组件*/}
		<Route exact path="/demo15" component={() =>
			import(/* webpackChunkName: "m_reduxdemo15" */'../reduxdemo/15reusability/index.jsx')} />
				{/*自定义类*/}
		<Route exact path="/demo17" component={() =>
			import(/* webpackChunkName: "m_reduxdemo15" */'../reduxdemo/17reusability/index.jsx')} />


		{/*不同页面复用--------------标准方式*/}
		<Route exact path="/demo20" component={() =>
			import(/* webpackChunkName: "m_reduxdemo20" */'../reduxdemo/20reusability/index.jsx')} />
				{/*自定义类*/}
		<Route exact path="/demo21" component={() =>
			import(/* webpackChunkName: "m_reduxdemo21" */'../reduxdemo/21reusability/index.jsx')} />

			{/*不同页面复用 -----------------非标准方式*/}
		<Route exact path="/demo30" component={() =>
			import(/* webpackChunkName: "m_reduxdemo30" */'../reduxdemo/30reusability/index.jsx')} />
				{/*自定义类*/}
		<Route exact path="/demo31" component={() =>
			import(/* webpackChunkName: "m_reduxdemo31" */'../reduxdemo/31reusability/index.jsx')} />
		<Route exact path="/demo32" component={() =>
			import(/* webpackChunkName: "m_reduxdemo32" */'../reduxdemo/32reusability/index.jsx')} />
		<Route exact path="/demo33" component={() =>
			import(/* webpackChunkName: "m_reduxdemo33" */'../reduxdemo/33reusability/index.jsx')} />


			<Route exact path="/demo40" component={() =>
			import(/* webpackChunkName: "m_reduxdemo40" */'../reduxdemo/40reusability/index.jsx')} />
				{/*自定义类*/}
		<Route exact path="/demo41" component={() =>
			import(/* webpackChunkName: "m_reduxdemo41" */'../reduxdemo/41reusability/index.jsx')} />


			<Route exact path="/demo50" component={() =>
			import(/* webpackChunkName: "m_reduxdemo50" */'../reduxdemo/50reusability/index.jsx')} />
				{/*自定义类*/}
		<Route exact path="/demo51" component={() =>
			import(/* webpackChunkName: "m_reduxdemo51" */'../reduxdemo/51reusability/index.jsx')} />

		<Route exact path="/demo100" component={() =>
			import(/* webpackChunkName: "m_reduxdemo51" */'../reduxdemo/100propsandstate/index.jsx')} />
			

	</Switch>
)

// const App = connect(state => ({ location: state.routerReducer.location }))(AppContainer)
const App = connect(state => ({ location: state.toJS().routerReducer.location }))(AppContainer)

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

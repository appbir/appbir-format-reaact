import React, { Component } from 'react';
import { Route, Switch } from 'route';
import Layout from './layout';
import { createStore, ConnectedRouter, createHistory, subscribeTheme,defReducer } from './frame';
import { connect, Provider } from 'react-redux';
import Theme from 'riil-theme'; 
import ModuleRoute from '../module/route'; 

const history = createHistory();

const store = createStore(history);

window.store = store;

window.frame={
	reducer:defReducer,
	store:store
}


const AppContainer = () => (
	<Switch>
		{/* <Route exact path="/" component={() =>
			import( webpackChunkName: "m_index" '../module/index/index')} />
		 */}
		<Route exact path="/" component={() =>
            import(/* webpackChunkName: "m_module_login" */'../module/login')} />
		<Route exact path="/login" component={() =>
            import(/* webpackChunkName: "m_module_login" */'../module/login')} />
		<Layout>
			<Switch>
				<Route exact path="/index" component={() =>
					import(/* webpackChunkName: "m_index" */'../module/index/index')} />
				<Route exact path="/index/portal" component={() =>
					import(/* webpackChunkName: "m_portal" */'../module/portal/portal')} />
				{ModuleRoute}
			</Switch>
		</Layout>
	</Switch>
)

const App = connect(state => ({ location: state.toJS().routerReducer.location }))(AppContainer)


class appRouter extends Component {
	render() {
		return (
			<Provider store={store}>
				<Theme>
					<ConnectedRouter history={history}><App /></ConnectedRouter>
				</Theme>
			</Provider>
		)
	}
}

export default appRouter;

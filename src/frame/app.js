/*********************************************************************************
 *                                 应用程序入库
 **********************************************************************************
 */

import React, { Component } from 'react';
import { Route, Switch } from './route';
import Layout from './layout';
import {ConnectedRouter } from './redux';
import { connect, Provider } from 'react-redux';

/**
 * 创建route节点
 ********************************************************************************************** 
 * routes:
 * [
 * { 
 *   exact:false, 	  boolean      // 是否精确匹配，默认是true
 *   path:'',     	  string       // url地址
 *   component:null , function     // 需要采用静态加载方式 动态不支持 ()=>{import('./sss/sss')}形式 
 *   layout:true,     boolean      // 是否在布局里渲染 默认true, 表示在布局里渲染
 * }
 * ...
 * ]
 **********************************************************************************************
 * eg：
 * 	routes = [{path:'/',component:()=>import('../module/demo2/index.jsx'),layout:false},
 *			  {path:'/demo3',component:()=>import('../module/demo3/index.jsx')},
 *            {component:()=>import('../module/404/index.jsx'),exact:false,}
 * ];
 **********************************************************************************************
 * 生成节点：
 *   <Route exact path="/" component={() =>{
 *   	return import('../module/demo2/index.jsx')
 *   }} />
 *   <Route exact path="/login" component={() =>
 *   	import('../module/demo3/index.jsx')} />
 *   <Layout config={layout.config} nodes = {layout.nodes}>
 *   	<Switch>
 *   		<Route exact path="/demo3" component={() =>
 *   			import('../module/demo3/index.jsx')} />,
 *   		<Route exact path="/demo4" component={() =>
 *   			import('../module/demo4/index.jsx')} />
 *   	</Switch>
 *   </Layout>
 * 
 */
const createRoute=(routes=[],layoutCfg={})=>{
	let allRoutes = [];
	let layoutRoutes = []
	routes.map((route,index)=>{
		if(!route) return ;
		let {layout, ...prop} = {layout:true, exact:true, ...route }
		let RouteComp = <Route key={index} {...prop} />
		layout === false ? allRoutes.push(RouteComp) : layoutRoutes.push(RouteComp) ;
	});
	if(layoutRoutes.length ){
		allRoutes.push(
			<Layout key={'layout_key'} config={layoutCfg.config} nodes = {layoutCfg.nodes}>
				<Switch>
					{layoutRoutes}
				</Switch>
			</Layout>)
	}
	return allRoutes;
}

// 路由动态生成
const RouteContainer = ({router={},layout={}}) => <Switch>{createRoute(router.routes,layout)}</Switch>

// 路由组件
const RouteComponent = connect(state => ({ location: state.toJS().routerReducer.location }))(RouteContainer)


// 应用程序入口
class Application extends Component {
	constructor(props){
		super(props);
	}
	render() {
		let {store,history,layout,router} = this.props;
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<RouteComponent layout={layout} router={router}/>
				</ConnectedRouter>
			</Provider>
		)
	}
}

export default Application;

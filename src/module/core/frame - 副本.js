/**
 * 平台统一规划处理
 */
import React, { Component, createElement } from 'react';
import {connect as reduxConnect} from 'react-redux';
import { bindActionCreators,combineReducers } from 'redux';
import qs from 'qs';

// 自定义获取变量命令空间
export let connect= (mapStateToProps, mapDispatchToProps, mergeProps) => {
	return function wrapWithConnect(WrappedComponent) {
		class FrameConnect extends Component {
			render() {
				// 动态替换reducer和命名空间
				let {moduleName,nameSpace,reducer} = this.props;
				if(reducer){
					// store.reducer[nameSpace] = reducer;
					let newReducer = {
						...store.reducer,
					};
					// 后续动态初始化nameSpace
					if(nameSpace){
						newReducer[nameSpace]=reducer;
						// 执行替换store
						let newStore = store.store.replaceReducer(combineReducers(newReducer))
						console.log('动态替换',newStore)
						console.log('window.store',window.store)
						console.log('this.props',this.props)
					}
				}
				let option = {
					moduleName,
					namespace:nameSpace,
				}
				// return <WrappedComponent/>
				return rconnect(mapStateToProps, mapDispatchToProps, mergeProps,option)(WrappedComponent);
			}
		}
		return FrameConnect;
	}
}


// 正对组件的高阶方法统一处理
// 处理state 默认获取地址为module模块下 第二个参数是整套系统的state
let rconnect= (mapStateToProps, mapDispatchToProps, mergeProps, option) => {

	const getMapStateToProps = (reduxMapState) => mapStateToProps ? 
		  mapStateToProps(reduxMapState, reduxMapState): {};
	// bindActionCreators 自动加入mapDispatchToProps
	const getMapDispatchToProps = mapDispatchToProps ? 
		(dispatch,getState) => {
			let configDispatchToProps = mapDispatchToProps(dispatch,getState);
			let newDispatchToProps={};
			for (let key in configDispatchToProps) {  
				newDispatchToProps[key] = key === 'dispatch' ? dispatch: bindActionCreators(configDispatchToProps[key],dispatch);
			}  
			return ()=>(newDispatchToProps);
		} : mapDispatchToProps;

	return  function wrapWithConnect(WrappedComponent) {
		class FrameConnect extends Component {
			render() {
				const {location, ...props} = this.props;
				// location不存在则参数为空处理
				let search = location && location.search;
				// 后续继续过滤URL参数处理 比如debugger等
				let param= qs.parse(search,{ ignoreQueryPrefix: true, plainObjects: true });
				return (<WrappedComponent param={param} location={location}  {...props} />);
			}
		}
		// return (<FrameConnect/>)
		return  reduxConnect(getMapStateToProps, getMapDispatchToProps, mergeProps)(FrameConnect);
	};
};


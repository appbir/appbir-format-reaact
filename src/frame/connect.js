/*********************************************************************************
 *                                 框架统一使用redux
 **********************************************************************************
 * 1. 统一扩展
 * 2. 统一URL参数和编码
 */
import qs from 'qs';
import React, { Component } from 'react';
import {connect as reduxConnect} from 'react-redux';
import { bindActionCreators } from 'redux';


// 正对组件的高阶方法统一处理
// 处理state 默认获取地址为module模块下 第二个参数是整套系统的state
export let connect= (mapStateToProps, mapDispatchToProps, mergeProps) => {
	// 针对模块的MapStateToProps处理进行处理 将module字段
	// 和redux-immutable处理过程透明化
	// TODO 目前简化为{} 后续深入redux 检测是否合理
	const getMapStateToProps = (reduxMapState) => mapStateToProps ? 
		  mapStateToProps(reduxMapState.get('module').toJS(), reduxMapState): {};
	// bindActionCreators 自动加入mapDispatchToProps
	const getMapDispatchToProps = mapDispatchToProps ? 
		(dispatch,getState) => {
			let configDispatchToProps = mapDispatchToProps(dispatch,getState);
			let newDispatchToProps={};
			for (let key in configDispatchToProps) {  
				newDispatchToProps[key] = key === 'dispatch' ? dispatch: 
				bindActionCreators(configDispatchToProps[key],dispatch);
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
				// TODO 后续采用 createElement 形式
				// TODO 后续便于调试 处理displayName
				return (<WrappedComponent query={param} location={location}  {...props} />);
			}
		}
		return  reduxConnect(getMapStateToProps, getMapDispatchToProps, mergeProps)(FrameConnect);
	};
};



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
const moduleName = 'module';

// 正对组件的高阶方法统一处理
export let connect= (mapStateToProps, mapDispatchToProps) => {
	const getMapStateToProps = (reduxMapState) => {
		return mapStateToProps ?  mapStateToProps(reduxMapState.toJS()[moduleName], reduxMapState.toJS(),reduxMapState): {};
	}
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
				let search = location && location.search;
				let param= qs.parse(search,{ ignoreQueryPrefix: true, plainObjects: true });
				return (<WrappedComponent query={param} location={location}  {...props} />);
			}
		}
		let mergeProps;
		return  reduxConnect(getMapStateToProps, getMapDispatchToProps, mergeProps)(FrameConnect);
	};
};



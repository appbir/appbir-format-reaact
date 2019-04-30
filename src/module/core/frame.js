/**
 * 平台统一规划处理
 */
import React, { Component, createElement } from 'react';
import { connect as reduxConnect } from 'react-redux';
import { bindActionCreators, combineReducers } from 'redux';
import qs from 'qs';


// 自定义获取变量命令空间 // reducer自动传入
/**
 * 
 * @param {*} moduleName  模块名称 若不指定 则为随即数 一次性 一般都指定名称
 * @param {*} mapStateToProps  // 特殊情况下状态设置 默认获取当前模块下的样式
 * @param {*} mapDispatchToProps  // 所有交互动作 后续再一次进行封装
 * @param {*} reducer  // 当前模块对应的reducer
 * @param {*} mergeProps // 
 */

// 定义存储格式为
// ｛
//  // __module{
// 	 		moduleName:{ // 模块名称 + 命名空间
// 				 __default: reducer, // 不指定名称的前提下是这样
// 				 namespace: reducer   // 复用情况
// 	 		}
//  } 
// ｝

// 定义模块属性名称
const MODULE_NAME_PROP = '__module';
// 未复用情况下的命名空间
const DEFAULT_NAMESPACE_NAME = '__default';
const ACTION_OPTION_NAME = '__option';
/**
 * 信道reducer
 * 组织不同命名空间下的reducer的生效范围
 * @param {*} reducers 
 * @param {*} moduleName 
 */
const channelReducer = (reducers, moduleName) => {
    let newReducers = {};
    Object.keys(reducers).forEach(function(namespace) {
        newReducers[namespace] = (previousStateForKey, action) => {
            if (namespace && action[ACTION_OPTION_NAME] && namespace != action[ACTION_OPTION_NAME].namespace) {
                // 不同信道下阻止操作
                return previousStateForKey;
            }
            return reducers[namespace](previousStateForKey, action);
        };
    });
    return combineReducers(newReducers);
}


// 合并模块reducer
const combineModuleReducer = (reducers) => {
    let modules = reducers[MODULE_NAME_PROP];
    if (!modules) return combineReducers(reducers);
    let moduleReducer = {};
    Object.keys(modules).forEach(function(moduleName) {
        moduleReducer[moduleName] = channelReducer(modules[moduleName], moduleName);
    });
    let newReducers = {...reducers };
    newReducers[MODULE_NAME_PROP] = combineReducers(moduleReducer);
    return combineReducers(newReducers);
}

export let connect = (_moduleName, _mapStateToProps, _mapDispatchToProps, _reducer, _mergeProps) => {
    let moduleName = typeof _moduleName != 'string' ? null : _moduleName;
    let mapStateToProps = _mapStateToProps,
        mapDispatchToProps = _mapDispatchToProps,
        reducer = _reducer,
        mergeProps = _mergeProps;
    if (!moduleName) {
        mergeProps = _reducer;
        reducer = _mapDispatchToProps;
        mapDispatchToProps = _mapStateToProps;
        mapStateToProps = _moduleName;
    }
    return function wrapWithConnect(WrappedComponent) {
        class FrameConnect extends Component {
            render() {
                let { namespace } = this.props;
                if (reducer) {
                    // 模块名称为指定情况下采用随机数
                    moduleName = moduleName || +new Date;
                    namespace = namespace || DEFAULT_NAMESPACE_NAME;
                    // store.reducer[namespace] = reducer;
                    let newReducer = {
                        ...store.reducer,
                    };
                    // 后续动态初始化namespace
                    // if(namespace){
                    let moduleReducers = newReducer[MODULE_NAME_PROP] || {};
                    let moduleReducer = moduleReducers[moduleName] || {};
                    moduleReducer[namespace] = reducer;
                    // 设置reducer
                    moduleReducers[moduleName] = moduleReducer;
                    newReducer[MODULE_NAME_PROP] = moduleReducers;
                    store.reducer = newReducer;
                    // 执行替换store
                    console.log('动态替换newReducer', newReducer, { moduleName, namespace });
                    store.store.replaceReducer(combineModuleReducer(newReducer));
                }
                // return <WrappedComponent/>
                let NewComponrnt = rconnect(mapStateToProps, mapDispatchToProps, mergeProps, { moduleName, namespace })(WrappedComponent);
                // 后续考虑属性传递
                return ( <NewComponrnt/ > )
            }
        }
        return FrameConnect;
    }
}


// 正对组件的高阶方法统一处理
// 处理state 默认获取地址为module模块下 第二个参数是整套系统的state
let rconnect = (mapStateToProps, mapDispatchToProps, mergeProps, option) => {
        let { moduleName, namespace } = option;
        const getMapStateToProps = (reduxMapState) => {
            // 加入imutable后统一处理
            console.log('moduleName namespace', moduleName, namespace);
            let _reduxMapState = moduleName ? ((reduxMapState[MODULE_NAME_PROP] && reduxMapState[MODULE_NAME_PROP][moduleName]) || {}) : reduxMapState;
            _reduxMapState = namespace ? _reduxMapState[namespace] : _reduxMapState;
            return mapStateToProps ? mapStateToProps(_reduxMapState, reduxMapState) : {};
        }
        // bindActionCreators 自动加入mapDispatchToProps
        const getMapDispatchToProps = mapDispatchToProps ?
            (_dispatch, getState) => {
                // dispatch 自定绑定类型包含
                let dispatch = (action) => {
                    // TODO 后续考虑中间件非对象形式
                    if (typeof action == 'object') {
                        let newAction = {
                            ...action
                        }
                        newAction[ACTION_OPTION_NAME] = {
                            namespace,
                            moduleName
                        }
                        return _dispatch(newAction);
                    }
                    return _dispatch(action);
                }
                let configDispatchToProps = mapDispatchToProps(dispatch, getState);
                let newDispatchToProps = {};
                for (let key in configDispatchToProps) {
                    // dispatch 可以进一步处理
                    newDispatchToProps[key] = key === 'dispatch' ? dispatch : bindActionCreators(configDispatchToProps[key], dispatch);
                }
                return () => (newDispatchToProps);
            } : mapDispatchToProps;

    return function wrapWithConnect(WrappedComponent) {
        class FrameConnect extends Component {
            render() {
                    const { location, ...props } = this.props;
                    // location不存在则参数为空处理
                    let search = location && location.search;
                    // 后续继续过滤URL参数处理 比如debugger等
                    let param = qs.parse(search, { ignoreQueryPrefix: true, plainObjects: true });
                    return ( <WrappedComponent param = { param }
                        location = { location } {...props }/>);
                    }
                }
                // return (<FrameConnect/>)
            return reduxConnect(getMapStateToProps, getMapDispatchToProps, mergeProps)(FrameConnect);
        };
};
/*********************************************************************************
 *                                 REDUX整合处理
 **********************************************************************************
 */
import { createStore as reduxCreateStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux-immutable';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createHashHistory';
// 系统集成动态创建单独store TODO后续提供系统级store 兼容多模块
const createStore = (history,reducer)=>{
    const middleware = [thunk, routerMiddleware(history)];
    // 暂时关闭redux日志 本地调试可自行打开
    // middleware.push(createLogger({stateTransformer :state=>state.toJS()}));
    // 消息中间件
    // middleware.push(message());
    return reduxCreateStore(combineReducers(reducer), applyMiddleware(...middleware));
};

export {createStore,createHistory,ConnectedRouter};
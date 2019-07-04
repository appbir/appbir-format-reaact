console.log('---------------------------import frame')
/*********************************************************************************
 *                                 系统框架整合
 **********************************************************************************
 *  一些操作需要有同步关系 所有导出的Frame是对象形式 
 *   故不能采用 单个引入的方式 即import {XXX} from ''
 * 
 */
import React from 'react';
import {render} from 'react-dom';
import App from  './app.js'
import { routerReducer} from 'react-router-redux';
import { createStore, createHistory } from './redux';

// import * as Config from './config';
// import * as Route from '../common/route/src/component'
// import * as Redux from './redux';

import * as Router from './router'

export { Storage as Storage } from './storage';

import * as Logger from './logger';

const Frame = {
    Storage,
    Logger,
    // Config, // 系统相关配置
    // Route,  // 路由元素相关
    // Redux,  // redux相关
 }

 /**
  * 提供设置Frame中的值 具有运行时的动态性
  * 在工具类中处理调用该接口，统一规范化处理。
  * @param {*} key 
  * @param {*} value 
  */
 Frame.set = (key,value)=>{
     // TODO 
 }


 // 框架默认配置
 const defaultOpt = {
     root:'appbir',
     reducer:null, 
     router:null, 
     logger:{
        /**
         * 日志级别
         * [LOG_LEVEL ] 日志级别 0:TRACE 1:'DEBUG',2:'INFO',3:'TIME',4:'WARN',8:'ERROR',99:'OFF'
         * @type {string}
         */
        LOG_LEVEL:'DEBUG',
        /**
         * [LOGGER_MODEL 日志打印模式 默认是控制台]
         * ALERT : 表示弹出式打印  false 表示控制台打印
         */
        LOGGER_MODEL:false,
        /**
         * [LOG_FRAME ] 框架日志
         * @type {Boolean} true false
         *       其中显示级别跟LOG_LEVEL保持一致
         */
        LOG_FRAME:true,
     }
 };




 const bindFunc=(obj,func)=>{
    let res = {};
    for(let key in obj){
        let value =  obj[key];
        res[key] = typeof value === "function" ? value.bind(this,func) : value;
    }
    return res;
 }
 
 /**
  * 框架初始化
  * 
  * @param {*} option 
  * {
  *  root: 框架加载的根节点
  *  reducer:模块的reducer
  *  router:路由配置
  * 
  * }
  */

 Frame.init =(option={}) =>{
    let {root,reducer,router,layout,logger} = {...defaultOpt, ...option};
    // init logger
    Logger.init(logger.LOG_LEVEL,logger.LOGGER_MODEL,logger.LOG_FRAME);
    Logger.frame('info','init frame');
    // init redux store 
    const history = createHistory();
    const store = createStore(history,{routerReducer,...reducer});
    Frame.history = history;
    Frame.store = store;
    // Router init
    Frame.Router = bindFunc(Router,store.dispatch);
    // 渲染节点
    render(<App 
            store={store}
            history={history} 
            router={router}
            layout={layout}/>,
            document.getElementById(root));
 }




 export default Frame;
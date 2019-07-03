/*********************************************************************************
 *                                 系统框架整合
 **********************************************************************************
 */
import React from 'react';
import {render} from 'react-dom';
import App from  './app.js'

// import * as Config from './config';
// import * as Route from '../common/route/src/component'
// import * as Redux from './redux';


 /**
  * 提供设置Frame中的值 具有运行时的动态性
  * 在工具类中处理调用该接口，统一规范化处理。
  * @param {*} key 
  * @param {*} value 
  */
 const set = (key,value)=>{
     // TODO 
 }


 // 框架默认配置
 const defaultOpt = {
     root:'appbir',
     reducer:'', 
     router:null, 
 };


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
 const init =(option={}) =>{
    let {root,reducer,router,layout} = {...defaultOpt, ...option};
    // 渲染节点
    render(<App 
            reducer={reducer} 
            router={router}
            layout={layout}/>,
            document.getElementById(root));
 }


 const Frame = {
    // Config, // 系统相关配置
    // Route,  // 路由元素相关
    // Redux,  // redux相关
    set,
    init,
 }


 


 export default Frame;
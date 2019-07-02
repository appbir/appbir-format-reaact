/*********************************************************************************
 *                                 系统框架整合
 **********************************************************************************
 */
 import * as Config from './config';
 import * as Route from '../common/route/src/component'
 import * as Redux from './redux';


 /**
  * 提供设置Frame中的值 具有运行时的动态性
  * 在工具类中处理调用该接口，统一规范化处理。
  * @param {*} key 
  * @param {*} value 
  */
 const set = (key,value)=>{
     // TODO 
 }



 const Frame = {
    Config, // 系统相关配置
    Route,  // 路由元素相关
    Redux,  // redux相关
    set,
 }


 


 export default Frame;
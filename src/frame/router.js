/*********************************************************************************
 *                                 单页应用路由
 **********************************************************************************
 *  该路由支持现有框架的移动端和PC端，同时统一路由接口。
 *  若三方系统集成需要采用三方路由(后续继续根据适用路由情况进行封装处理)
 *  本路由只正对react框架
 *  
 *  路由提供五大功能：
 *  1： redirect  重定向。  跳转后会在浏览器的堆栈中存在记录。
 *  2： replace   覆盖跳转。跳转后会覆盖上一次浏览记录。
 *  3： goBack    回退。    相当于浏览器的回退按钮动作。
 *  4： goForward 前进。    相当于浏览器的前进按钮动作。
 *  5： go        跳转。    整数表示向前跳转几步。
 *               负数表示回退跳转几步。
 */

import * as router from 'react-router-redux';
import qs from 'qs';
import {recordMenu} from 'riil-utils'; 
// 打断循环引用
import {isRouteAuth} from '../../../riil-route/src/component/index.js'

// 浅拷贝
let assign = (target, source)=> {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

let is=(source,type)=> typeof source === type;

// 格式化queryString 
export const formatUrl = (url,query) =>  {
  if(!url) return null;
  let splits = url.split('?');
  let qs1 = qs;
  // deal URL query 
  let urlQuery = qs.parse(splits[1],{ ignoreQueryPrefix: true, plainObjects: true });
  // 通用ID传递处理
  (is(query,'string') || is(query,'number')) && (urlQuery.id = query);
  // 键值对合并
  is(query,'object') && assign(urlQuery,query);
  
  let newQs = qs.stringify(urlQuery,{
    encodeValuesOnly:false, // 只编码值
    encode:true // 统一编码处理
  });
  let newUrl = newQs ? splits[0] + '?' + newQs : splits[0];
  return newUrl;
}


/**
* @param  [String]        url  : url地址
* @param  [String/Object]  query : 查询参数。
*                       String 表示id的值 即id=string形式 (简化最常用的方法)
*                                   Object 表示查询对象key和value键值对形式
* @param [boolean ]isRecord 是否记录菜单
* @return null
*/


let redirect = (url, query,isRecord) =>{
  isRecord && recordMenu(url); // 记录当前跳转菜单位置
  window.store.dispatch(router.push(formatUrl(url, query)));
}

let replace = (url, query) => window.store.dispatch(router.replace(formatUrl(url, query)));

// 回退
let goBack = () => window.store.dispatch(router.goBack())

// 前进
let goForward = () => {
  window.store.dispatch(router.goForward())
}



// 打开新的一页
let open = (url,query,isRecord,isSameOrigin = true) => {
  if(!url) return ;
  let recordUrl = null;
  if(isSameOrigin){
    recordUrl = url;
    if(!isRouteAuth(url)) return ;
    let origin = window.location.origin + window.location.pathname;
    url = origin + url;
  }
  isRecord && recordUrl && recordMenu(recordUrl); // 记录当前跳转菜单位置
  url = formatUrl(url,query);
  window.open(url);
}

// 跳转指定记录
let go = (step) => {
    window.store.dispatch(router.go(step))
}

export {
  redirect,
  replace,
  goBack,
  goForward,
  go,
  open
}


// 路由封装处理
import Promise from 'es6-promise';
import React, {Component} from 'react';
import {Route as ReactDOMRoute} from 'react-router-dom';
import {Route as ReactRoute,Switch as ReactSwitch} from 'react-router';
import {connect} from 'react-redux';
import Spin from 'antd/lib/spin';
import ModuleAuth  from 'riil-module-auth';
import {dealSystem} from 'riil-utils';
const Switch = connect(state=>({location: state.get('routerReducer').location}))(ReactSwitch);
const checkAuth = (path,data) =>{
  // 路由未配置路径 默认有权限
  if(!path) return true;
  path = path.startsWith('#') ? path : ('#'+ path);
  let isAuth = false;
  for(let index =0; index<data.length;index++){
    let item = data[index] || {};
    if(item.URL === path){
      isAuth = true;
      break;
    }
    // 处理子节点
    if(item.Children && item.Children.length){
      isAuth = checkAuth(path,item.Children);
      if(isAuth) break;
    }
  }
  return isAuth;
}

// 权限检查
const getAuth= prop =>{
  let config = store.getState().toJS().system.config;
  // 系统配置
  if(!config.isCheckAuth) return true;
  // 路由配置
  if(prop.auth===false) return true;
  // 特殊模块
  if(config.exceptPath.indexOf(prop.path)!=-1) return true;
  // 菜单权限
  let menu = store.getState().toJS().module.rmenu.rmenu.menuData || [];
  let path = prop.path
  return checkAuth(path,menu);
}

 /**
  * 校验模式是否有权限 主要用于跳转前进行权限检测
  * @param {*} url 
  * @return boolean true 表示有权限 false 表示无权限
  */
 const isRouteAuth = (url) =>{
	let auth = getAuth({path:url});
	// 无权限 显示无权限提示
	if(!auth){
    window.store.dispatch({type:'ROUTER_AUTH',param:{visible:true}});
  }
	return  auth;
}

class Bundle extends Component {
    constructor(props) {
      super(props);
      this.state = {
        mod: null
      }
    }
    componentWillMount() {
      this.load(this.props)
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.load !== this.props.load) {
        this.load(nextProps)
      }
    }
    load(props) {
      this.setState({
        mod: null
      })
      props.load().then(mod => {
        this.setState({
          mod: mod.default ? mod.default : mod
        })
      })
    }
  
    render() {
      return this.props.children(this.state.mod)
    }
  }

  class Auth extends Component {
    constructor(props) {
      super(props);
      this.state = {
        auth: null
      }
    }
    
    componentWillMount() {
      dealSystem(this.props.path);
      this.loadAuth(this.props)
    }
    loadAuth(props) {
      let _this = this;
      this.setState({
        auth: null,
        isAuth:false // 是否进行了权限获取
      })
     // 轮询判断是否进行后端交互权限处理 
      let isDone=(props) => {
        let config = store.getState().toJS().system.config;
        if(config.exceptPath.indexOf(props.path)!=-1) return true;
        return store.getState().toJS().module.rmenu.rmenu.isCheckAuth
      }
      if(isDone(props)){
          _this.setState({auth: getAuth(props),isAuth: true});
      }else{
        let iterval = setInterval(()=>{
          if(isDone(props)){
            _this.setState({auth: getAuth(props),isAuth: true});
            clearInterval(iterval);
          }
        }, 100);
      }
    }

    render() {
      return this.props.children(this.state)
    }
  }

const Route = (props) => {
    let {component, ...prop} = props;
    return (<ReactDOMRoute component={(pro)=>(
              <Auth {...prop}>
                {(state) => {
                    // 未权限获取 渲染空div
                    if(!state.isAuth) return (<div/>); 
                    // 判断是否有权限
                    return state.auth ?
                    (<Bundle load={component}>            
                      {(Container) =>(Container) ? (<Container  auth={state.auth} {...pro} /> ) : (<div className="riil-page-spin"><Spin size="large" /></div>)}
                    </Bundle>)
                    :(<ModuleAuth/>)
                  }
                }
              </Auth>
              )} {...prop}/>)
}

export  {Route,Switch,ReactRoute,ReactDOMRoute,ReactSwitch,isRouteAuth}

// export {MyRoute}
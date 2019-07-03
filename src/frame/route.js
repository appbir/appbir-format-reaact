
/*********************************************************************************
 *                                 路由+权限处理
 **********************************************************************************
 */
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Route as ReactDOMRoute} from 'react-router-dom';
import {Route as ReactRoute,Switch as ReactSwitch} from 'react-router';
const Switch = connect(state=>({location: state.get('routerReducer').location}))(ReactSwitch);

// 异步加载页面
class LoadComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {loadComponent: null};
    }

    componentWillMount = () => this.load(this.props);      

    componentWillReceiveProps(nextProps) {
      if (nextProps.load !== this.props.load) { // 防止重复加载
        this.load(nextProps)
      }
    }

    // 按需加载模块
    load(props) {
      props.load().then(component => {
        this.setState({loadComponent: component.default || component})
      })
    }
    // 加载页面loading
    render=()=> this.state.loadComponent ? this.props.children(this.state.loadComponent):
              <div className="loading-page">加载ing</div>;
  }


/**
 * 权限过滤控制
 */
class AuthFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否拥有权限  true 表示拥有权限  跳转到对应页面 false 表示无权限
      isPermit: true, 
      // 是否异步进行权限校验 false表示不进行异步获取权限  true表示异步进行权限校验
      isAsync: false , 
       // 是否加载完毕  
      isLoaded:false, 
    };
  }
  
  // 权限校验
  componentWillMount = () => this.validatePermit(this.props);

  //  根据业务进行异步权限处理
  validatePermit = () => true;
  
  // 根据权限进行渲染组件是无权限页面
  render=()=> this.state.isPermit ? <div>{this.props.children}</div> : <div>无权限</div>;
}

const Route = (props) => {
    let {component, ...prop} = props;
    return (<ReactDOMRoute component={(pro)=> (
              // 权限过滤
              <AuthFilter {...prop}>
                  {/* // 按需加载页面 */}
                  <LoadComponent load={component}>
                        {/* 初始化构建组件 */}
                        {(Container) =><Container  {...prop} {...pro}/>}
                  </LoadComponent>
              </AuthFilter>
              )} {...prop}/>)
}

export  {Route,Switch,ReactRoute,ReactDOMRoute,ReactSwitch}

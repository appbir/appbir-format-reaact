// 路由封装处理
import React,{Component} from 'react';
import {Route as ReactDOMRoute} from 'react-router-dom';
import {Route as ReactRoute,Switch as ReactSwitch} from 'react-router';
import {connect} from 'react-redux';

const Switch = connect(state=>({location: state.routerReducer.location}))(ReactSwitch);


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
        console.log('----------------------------加载的模块',mod)
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
        auth: true
      }
    }
    componentWillMount() {
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
                    // if(!state.isAuth) return (<div/>); 
                    // 判断是否有权限
                    return state.auth ?
                    (<Bundle load={component}>            
                      {(Container) =>{
                        console.log('Container--------------',Container)
                
                      let node =(Container) ? React.cloneElement(<Container appbir="paramappbir"/>): '';
                      console.log('cloneElement',node)
                      // 根据react节点来处理事情
                      
                      return (Container) ? node:(<div>加载中...</div>);
                        //  return (Container) ? (<Container  auth={state.auth} {...pro} /> ) :
                        //  (<div className="riil-page-spin"><Spin size="large" /></div>)
                      }
                      }
                    </Bundle>)
                    :(<div>无权限</div>)
                  }
                }
              </Auth>
              )} {...prop}/>)
}

export  {Route,Switch,ReactRoute,ReactDOMRoute,ReactSwitch}

// export {MyRoute}
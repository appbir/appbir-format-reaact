import React, { Component, createElement } from 'react';
import {connect as reduxConnect} from 'react-redux';
import Counter from './components/Counter';
// 采用bindActionCreators
// 将action都绑定getstate和dispatch
import { bindActionCreators,combineReducers } from 'redux';
import * as action from './action/index';


// 持续替换reducer
import demo3 from './reducers/index';

// store.store.replaceReducer({...store.reducer,demo3})

const  connect= (mapStateToProps, mapDispatchToProps, mergeProps) => {
  console.log('connect ----- window.store',window.store);
	// 针对模块的MapStateToProps处理进行处理 将module字段
	// 和redux-immutable处理过程透明化
	// TODO 目前简化为{} 后续深入redux 检测是否合理
	const getMapStateToProps = (reduxMapState) =>{
    console.log('getMapStateToProps ----- window.store',window.store); 
    store.store.replaceReducer(combineReducers({...store.reducer,demo3}));
    return mapStateToProps ?  mapStateToProps(reduxMapState, reduxMapState): {};
  } 
	// bindActionCreators 自动加入mapDispatchToProps
	const getMapDispatchToProps = mapDispatchToProps ? 
		(dispatch,getState) => {
			let configDispatchToProps = mapDispatchToProps(dispatch,getState);
			let newDispatchToProps={};
			for (let key in configDispatchToProps) {  
				newDispatchToProps[key] = key === 'dispatch' ? dispatch: bindActionCreators(configDispatchToProps[key],dispatch);
			}  
			return ()=>(newDispatchToProps);
		} : mapDispatchToProps;

	return  function wrapWithConnect(WrappedComponent) {
		class FrameConnect extends Component {
			render() {
        const {location, ...props} = this.props;
				return (<WrappedComponent  location={location}  {...props} />);
			}
		}
		return  reduxConnect(getMapStateToProps, getMapDispatchToProps, mergeProps)(FrameConnect);
	};
};



class Container1 extends React.Component {
  constructor(props){
    super(props)
    console.log('constructor------ demo3 window.store',window.store);
  }
  render = ()=> {
    console.log(this.props);
    return (<div>
      Container3
      <Counter {...this.props}/>
    </div>)
  }
}
         
const stateToProps = state =>{
  console.log('stateToProps demo3',state)
  return {value:state.demo3};
}


const dispatchToProps = (dispatch,getState) => {

  let actions = bindActionCreators(action,dispatch)
  console.log(action,actions);
  return {
    dispatch,
    ...actions
  }
};

export default connect(stateToProps, dispatchToProps)(Container1);


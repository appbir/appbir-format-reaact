import React, { Component, createElement } from 'react';
import {connect as reduxConnect} from 'react-redux';
import Counter from '../demo1/components/Counter';
// 采用bindActionCreators
// 将action都绑定getstate和dispatch
import { bindActionCreators,combineReducers } from 'redux';
import * as action from './action/index';


// 持续替换reducer
import demo3 from './reducers/index';
import {connect}  from 'frame';

import replacereducer from './reducers';


class Container3 extends React.Component {
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
         
const stateToProps = (state,allState) =>{
  console.log('stateToProps demo3',state,allState)
  return {value:state};
}


const dispatchToProps = (dispatch,getState) => {
  console.log('dispatchToProps demo3',dispatch,action);
  return {
    dispatch,
    ...action,
    onDecrement:action.onDecrement.bind(this,dispatch)
  }
};

export default connect('demo3',stateToProps, dispatchToProps,replacereducer)(Container3);


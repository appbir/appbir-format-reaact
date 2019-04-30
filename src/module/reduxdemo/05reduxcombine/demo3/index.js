import React from 'react'
import { connect } from 'frame';
import Counter from './components/Counter';
// 采用bindActionCreators
// 将action都绑定getstate和dispatch
import { bindActionCreators } from 'redux';
import * as action from './action/index';

import replacereducer from './reducers';


class Container3 extends React.Component {
  constructor(props){
    super(props)
    console.log('constructor demo1')
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
  return {value:state};
}


const dispatchToProps = (dispatch,getState) => {
  let actions = bindActionCreators(action,dispatch)
  console.log(action,actions);
  return {
    dispatch,
    ...actions
  }
};
 

export default connect(stateToProps, dispatchToProps,replacereducer)(Container3);


import React from 'react'
import { connect } from 'frame';
import Counter from '../demo1/components/Counter';
// 采用bindActionCreators
// 将action都绑定getstate和dispatch
import { bindActionCreators } from 'redux';
import * as action from './action/index';

class Container2 extends React.Component {
  constructor(props){
    super(props)
    console.log('constructor demo2')
  }
  render = ()=> {
    console.log(this.props);
    return (<div>
      Container2
      <Counter {...this.props}/>
    </div>)
  }
}

const stateToProps = state =>{
  return {value:state.demo2};
}


const dispatchToProps = (dispatch,getState) => {
  console.log(action,action);
  return {
    dispatch,
    ...action
  }
};

export default connect(stateToProps, dispatchToProps)(Container2);


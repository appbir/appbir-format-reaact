import React from 'react'
import { connect } from 'react-redux';
import Counter from './components/Counter';
// 原始编写方式

class Container1 extends React.Component {
  render = ()=> {
    console.log(this.props);
    return (<div>
      Container1
      <Counter {...this.props}/>
    </div>)
  }
}

const stateToProps = state =>{
  return {value:state.demo3};
}


const dispatchToProps = (dispatch,getState) => {

  return {
    dispatch,
    onIncrement:()=>dispatch({type:'INCREMENT'}),
    onDecrement:()=>dispatch({type:'DECREMENT'}),
    incrementIfOdd:()=>dispatch({type:'INCREMENT'}),
    incrementAsync:()=>dispatch({type:'DECREMENT'})
  }
};

export default connect(stateToProps, dispatchToProps)(Container1);


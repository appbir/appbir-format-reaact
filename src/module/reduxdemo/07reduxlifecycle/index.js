import React from 'react'
import {connect as reduxConnect} from 'react-redux';
import {Logger} from 'frame';
import LeftCounter from './components/LeftCounter.js'
import RightCounterContainer from './container/right.js'
import PageLayout from './components/PageLayout.js'

const onIncrementAction = () => {
  window.frame.store.dispatch({ type: 'INCREMENT' })
}

const onDecrementAction = () => {
  window.frame.store.dispatch({ type: 'DECREMENT' })
}

// 重新设置值递减方式
const refreshValue = (value)=>{
   let state =  frame.store.getState().toJS().module.lifeCycle.left;
   window.frame.store.dispatch({ type: 'REFRESH',param:state.value - value})
}


class LifeCycleContainer extends React.Component {
  constructor(props) {
      super(props);
      Logger.info('constructor LifeCycleContainer',props);
  }

  render(){
	let {onIncrement,onDecrement,value,refreshValue} = this.props;
    return(<PageLayout>
            <LeftCounter onIncrement = {onIncrement} onDecrement={onDecrement} value = {value}/>
            <RightCounterContainer refreshValue={refreshValue} reciveValue={value}/>
        </PageLayout>)
  }
}


const stateToProps = state => {
	return state.toJS().module.lifeCycle.left;
}

const dispatchToProps = dispatch => {
	return { dispatch, onDecrement:onDecrementAction,onIncrement:onIncrementAction,refreshValue:refreshValue};	
}


export default reduxConnect(stateToProps,dispatchToProps)(LifeCycleContainer);
import React from 'react';
import {connect as reduxConnect} from 'react-redux';
import { Logger} from 'frame'
import RightCounter from '../components/RightCounter.js'

class RightCounterContainer extends React.Component {
	constructor(props) {
        super(props);
        Logger.info('RightCounterContainer constructor props',props);
        let {reciveValue} = this.props;
        this.props.dispatch({type:'REFRESH_RIGHT',param:reciveValue});
    }
    refreshOtherComponentValue = () => {
        this.props.refreshValue && this.props.refreshValue(this.props.value);
    }

    shouldComponentUpdate(nextProps, nextState){
        if(_.isEqual(this.props, nextProps)){
            return false;
        }
        this.props.dispatch({type:'REFRESH_RIGHT',param:nextProps.reciveValue});
        Logger.info('RightCounterContainer shouldComponentUpdate nextProps, nextState',nextProps, nextState);
        return true;
    }
    componentWillUnmount(){
        Logger.info('RightCounterContainer componentWillUnmount');
    }
    
    render(){
        return (
            <div>
                <RightCounter refreshOtherComponentValue= {this.refreshOtherComponentValue}
                     {...this.props}/>
            </div>)
    }
}


const onIncrementAction = () => {
  window.frame.store.dispatch({ type: 'INCREMENT_RIGHT' })
}

const onDecrementAction = () => {
  window.frame.store.dispatch({ type: 'DECREMENT_RIGHT' })
}


const stateToProps = state => {
  return state.toJS().module.lifeCycle.right
}

const dispatchToProps = dispatch => {
    return { dispatch, onDecrement:onDecrementAction,onIncrement:onIncrementAction };  
}

export default reduxConnect(stateToProps,dispatchToProps)(RightCounterContainer);

